'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Home,
  Building,
  Castle,
  Euro,
  Calendar,
  Filter,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  operationType: string;
  city: string;
  state: string;
  country: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  rentPrice?: number;
  salePrice?: number;
  currency: string;
  images: string[];
  isFeatured: boolean;
  isVerified: boolean;
}

export default function PropertyResults() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Получаем параметры поиска
  const city = searchParams.get('city');
  const operationType = searchParams.get('operationType');
  const budget = searchParams.get('budget');
  const propertyType = searchParams.get('propertyType');
  const specialRequirements = searchParams.get('specialRequirements');
  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        // Строим параметры запроса
        const params = new URLSearchParams();
        if (city) params.append('city', city);
        if (operationType) params.append('operationType', operationType);
        if (budget) {
          if (operationType === 'RENT') {
            params.append('maxPrice', budget);
          } else {
            params.append('maxPrice', budget);
          }
        }
        if (propertyType) params.append('propertyTypes', propertyType);

        const response = await fetch(`/api/properties?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }

        const data = await response.json();
        setProperties(data.properties || []);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Ошибка при загрузке недвижимости');
      } finally {
        setLoading(false);
      }
    };

    if (city || operationType || budget) {
      fetchProperties();
    } else {
      setLoading(false);
    }
  }, [city, operationType, budget, propertyType]);

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'APARTMENT':
        return <Building className="w-4 h-4" />;
      case 'HOUSE':
        return <Home className="w-4 h-4" />;
      case 'VILLA':
        return <Castle className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Ошибка</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/real-estate/search">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к поиску
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/real-estate/search">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к поиску
            </Button>
          </Link>

          <h1 className="text-3xl font-bold mb-2">
            Результаты поиска недвижимости
          </h1>

          {/* Фильтры */}
          <div className="flex flex-wrap gap-2 mb-4">
            {city && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {city}
              </Badge>
            )}
            {operationType && (
              <Badge variant="secondary">
                {operationType === 'RENT' ? 'Аренда' : 'Покупка'}
              </Badge>
            )}
            {budget && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Euro className="w-3 h-3" />
                До {budget}€
              </Badge>
            )}
            {propertyType && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {getPropertyTypeIcon(propertyType)}
                {propertyType}
              </Badge>
            )}
          </div>

          {specialRequirements && (
            <p className="text-sm text-gray-600 mb-4">
              <strong>Особые требования:</strong> {specialRequirements}
            </p>
          )}

          {(checkInDate || checkOutDate) && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                {checkInDate && `Заезд: ${checkInDate}`}
                {checkInDate && checkOutDate && ' - '}
                {checkOutDate && `Выезд: ${checkOutDate}`}
              </span>
            </div>
          )}

          <p className="text-gray-600">
            Найдено {properties.length} объектов
          </p>
        </div>

        {/* Результаты */}
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-gray-600 mb-6">
              Попробуйте изменить критерии поиска или свяжитесь с нашим специалистом
            </p>
            <Link href="/real-estate/search">
              <Button>Изменить поиск</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                      {property.images?.[0] ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      ) : (
                        <Home className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    {property.isFeatured && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500">
                        Избранное
                      </Badge>
                    )}
                    {property.isVerified && (
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        Проверено
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      {getPropertyTypeIcon(property.propertyType)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    {property.city}, {property.country}
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  {/* Характеристики */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    {property.bedrooms && (
                      <span>{property.bedrooms} спален</span>
                    )}
                    {property.bathrooms && (
                      <span>{property.bathrooms} ванн</span>
                    )}
                    {property.area && (
                      <span>{property.area} м²</span>
                    )}
                  </div>

                  {/* Цена */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Euro className="w-4 h-4" />
                      <span className="font-semibold">
                        {operationType === 'RENT' && property.rentPrice
                          ? `${property.rentPrice}/мес`
                          : property.salePrice
                            ? property.salePrice.toLocaleString()
                            : 'Цена по запросу'
                        }
                      </span>
                    </div>
                    <Button size="sm">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
