'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Property, PropertyAIMemory, MemoryType } from '@/types/property';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyCard } from '@/components/property-card';
import { PropertyAIMemoryAPI } from '@/lib/api/property-ai-memory';
import { PropertyAPI } from '@/lib/api/property-api';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star, 
  Eye, 
  Heart, 
  Share2, 
  Phone, 
  Mail,
  Calendar,
  DollarSign,
  Building,
  Car,
  Wifi,
  Shield,
  Users
} from 'lucide-react';
import Image from 'next/image';

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  APARTMENT: 'Квартира',
  HOUSE: 'Дом',
  CONDO: 'Кондо',
  TOWNHOUSE: 'Таунхаус',
  STUDIO: 'Студия',
  LOFT: 'Лофт',
  PENTHOUSE: 'Пентхаус',
  VILLA: 'Вилла',
  COMMERCIAL: 'Коммерческая',
  OFFICE: 'Офис',
  RETAIL: 'Торговая',
  WAREHOUSE: 'Склад',
  LAND: 'Земля',
  FARM: 'Ферма',
  OTHER: 'Другое'
};

const OPERATION_TYPE_LABELS: Record<string, string> = {
  RENT: 'Аренда',
  SALE: 'Продажа',
  BOTH: 'Аренда и продажа'
};

const MEMORY_TYPE_LABELS: Record<MemoryType, string> = {
  PREFERENCE: 'Предпочтения',
  INTERACTION: 'Взаимодействие',
  FEEDBACK: 'Обратная связь',
  ANALYSIS: 'Анализ'
};

export default function PropertyPage() {
  const params = useParams();
  const propertyId = params.id as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [aiMemories, setAiMemories] = useState<PropertyAIMemory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (propertyId) {
      loadProperty();
      loadAIMemories();
    }
  }, [propertyId]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      const propertyData = await PropertyAPI.getPropertyById(propertyId);
      if (propertyData) {
        setProperty(propertyData);
      } else {
        setError('Недвижимость не найдена');
      }
    } catch (err) {
      setError('Ошибка при загрузке недвижимости');
      console.error('Error loading property:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAIMemories = async () => {
    try {
      const memories = await PropertyAIMemoryAPI.getPropertyMemories(propertyId);
      setAiMemories(memories);
    } catch (err) {
      console.error('Error loading AI memories:', err);
    }
  };

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getAverageRating = () => {
    if (!property?.reviews || property.reviews.length === 0) return 0;
    const sum = property.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / property.reviews.length;
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality
  };

  const handleContact = () => {
    // TODO: Implement contact functionality
    console.log('Contact property owner');
  };

  const handleReservation = () => {
    // TODO: Implement reservation functionality
    console.log('Make reservation');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка недвижимости...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ошибка</h1>
          <p className="text-gray-600">{error || 'Недвижимость не найдена'}</p>
        </div>
      </div>
    );
  }

  const averageRating = getAverageRating();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основная информация */}
        <div className="lg:col-span-2 space-y-6">
          {/* Изображения */}
          <Card>
            <CardContent className="p-0">
              <div className="relative h-96 w-full">
                <Image
                  src={property.images?.[activeImageIndex] || '/placeholder.jpg'}
                  alt={property.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/80 hover:bg-white"
                    onClick={handleFavorite}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/80 hover:bg-white"
                  >
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
                {property.images && property.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Основная информация */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{property.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">
                      {property.address}, {property.city}, {property.state}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {property.operationType === 'RENT' && property.rentPrice && (
                    <div className="text-3xl font-bold text-green-600">
                      {formatPrice(property.rentPrice, property.currency)}/мес
                    </div>
                  )}
                  {property.operationType === 'SALE' && property.salePrice && (
                    <div className="text-3xl font-bold text-green-600">
                      {formatPrice(property.salePrice, property.currency)}
                    </div>
                  )}
                  {property.operationType === 'BOTH' && (
                    <div className="space-y-1">
                      {property.rentPrice && (
                        <div className="text-xl font-bold text-green-600">
                          {formatPrice(property.rentPrice, property.currency)}/мес
                        </div>
                      )}
                      {property.salePrice && (
                        <div className="text-xl font-bold text-green-600">
                          {formatPrice(property.salePrice, property.currency)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Основные характеристики */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.bedrooms && (
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-gray-600" />
                      <span>{property.bedrooms} спален</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-gray-600" />
                      <span>{property.bathrooms} ванных</span>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center gap-2">
                      <Square className="h-5 w-5 text-gray-600" />
                      <span>{property.area} м²</span>
                    </div>
                  )}
                  {property.floor && (
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-gray-600" />
                      <span>{property.floor} этаж</span>
                    </div>
                  )}
                </div>

                {/* Описание */}
                <div>
                  <h3 className="font-semibold mb-2">Описание</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{property.description}</p>
                </div>

                {/* Особенности и удобства */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.features && property.features.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Особенности</h3>
                      <div className="flex flex-wrap gap-2">
                        {property.features.map((feature, index) => (
                          <Badge key={index} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {property.amenities && property.amenities.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Удобства</h3>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Статистика */}
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{property.views} просмотров</span>
                  </div>
                  {averageRating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{averageRating.toFixed(1)} ({property.reviews?.length || 0} отзывов)</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Добавлено {new Date(property.createdAt).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Вкладки с дополнительной информацией */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Детали</TabsTrigger>
              <TabsTrigger value="ai-memories">Память ИИ</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Дополнительная информация</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Основные данные</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Тип недвижимости:</span>
                          <span>{PROPERTY_TYPE_LABELS[property.propertyType]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Операция:</span>
                          <span>{OPERATION_TYPE_LABELS[property.operationType]}</span>
                        </div>
                        {property.yearBuilt && (
                          <div className="flex justify-between">
                            <span>Год постройки:</span>
                            <span>{property.yearBuilt}</span>
                          </div>
                        )}
                        {property.totalFloors && (
                          <div className="flex justify-between">
                            <span>Этажей в здании:</span>
                            <span>{property.totalFloors}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Расположение</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Город:</span>
                          <span>{property.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Область:</span>
                          <span>{property.state}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Страна:</span>
                          <span>{property.country}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Индекс:</span>
                          <span>{property.postalCode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-memories" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Память ИИ агента</CardTitle>
                </CardHeader>
                <CardContent>
                  {aiMemories.length > 0 ? (
                    <div className="space-y-4">
                      {aiMemories.map((memory) => (
                        <div key={memory.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold">{memory.title}</h4>
                            <Badge variant="outline">
                              {MEMORY_TYPE_LABELS[memory.memoryType]}
                            </Badge>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{memory.content}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Важность: {memory.importance}/10</span>
                            <span>{new Date(memory.createdAt).toLocaleDateString('ru-RU')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">
                      Память ИИ агента пуста
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Отзывы</CardTitle>
                </CardHeader>
                <CardContent>
                  {property.reviews && property.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {property.reviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.title}</h4>
                              <p className="text-sm text-gray-600">{review.user?.name}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm">{review.comment}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                            <span>{new Date(review.createdAt).toLocaleDateString('ru-RU')}</span>
                            <span>{review.helpfulVotes} полезных</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">
                      Отзывов пока нет
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Действия */}
          <Card>
            <CardHeader>
              <CardTitle>Действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleReservation} className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Забронировать
              </Button>
              <Button variant="outline" onClick={handleContact} className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Связаться
              </Button>
              <Button variant="outline" onClick={handleFavorite} className="w-full">
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                {isFavorite ? 'В избранном' : 'В избранное'}
              </Button>
            </CardContent>
          </Card>

          {/* Информация о владельце */}
          {property.owner && (
            <Card>
              <CardHeader>
                <CardTitle>Владелец</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{property.owner.name}</h4>
                      <p className="text-sm text-gray-600">{property.owner.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Позвонить
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="h-4 w-4 mr-1" />
                      Написать
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Похожие объекты */}
          <Card>
            <CardHeader>
              <CardTitle>Похожие объекты</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Здесь будут показаны похожие объекты недвижимости
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
