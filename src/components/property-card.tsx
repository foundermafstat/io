'use client';

import React from 'react';
import { Property, PropertyType, OperationType, PropertyStatus } from '@/types/property';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Bed, Bath, Square, Star, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PropertyCardProps {
  property: Property;
  showActions?: boolean;
  onFavorite?: (propertyId: string) => void;
  onContact?: (propertyId: string) => void;
  isFavorite?: boolean;
}

const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  [PropertyType.APARTMENT]: 'Квартира',
  [PropertyType.HOUSE]: 'Дом',
  [PropertyType.CONDO]: 'Кондо',
  [PropertyType.TOWNHOUSE]: 'Таунхаус',
  [PropertyType.STUDIO]: 'Студия',
  [PropertyType.LOFT]: 'Лофт',
  [PropertyType.PENTHOUSE]: 'Пентхаус',
  [PropertyType.VILLA]: 'Вилла',
  [PropertyType.COMMERCIAL]: 'Коммерческая',
  [PropertyType.OFFICE]: 'Офис',
  [PropertyType.RETAIL]: 'Торговая',
  [PropertyType.WAREHOUSE]: 'Склад',
  [PropertyType.LAND]: 'Земля',
  [PropertyType.FARM]: 'Ферма',
  [PropertyType.OTHER]: 'Другое'
};

const OPERATION_TYPE_LABELS: Record<OperationType, string> = {
  [OperationType.RENT]: 'Аренда',
  [OperationType.SALE]: 'Продажа',
  [OperationType.BOTH]: 'Аренда и продажа'
};

const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  [PropertyStatus.AVAILABLE]: 'Доступно',
  [PropertyStatus.RENTED]: 'Сдано в аренду',
  [PropertyStatus.SOLD]: 'Продано',
  [PropertyStatus.PENDING]: 'В ожидании',
  [PropertyStatus.MAINTENANCE]: 'На обслуживании',
  [PropertyStatus.UNAVAILABLE]: 'Недоступно'
};

const getStatusColor = (status: PropertyStatus) => {
  switch (status) {
    case PropertyStatus.AVAILABLE:
      return 'bg-green-100 text-green-800';
    case PropertyStatus.RENTED:
      return 'bg-blue-100 text-blue-800';
    case PropertyStatus.SOLD:
      return 'bg-purple-100 text-purple-800';
    case PropertyStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    case PropertyStatus.MAINTENANCE:
      return 'bg-orange-100 text-orange-800';
    case PropertyStatus.UNAVAILABLE:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function PropertyCard({ 
  property, 
  showActions = true, 
  onFavorite, 
  onContact, 
  isFavorite = false 
}: PropertyCardProps) {
  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getMainImage = () => {
    return property.images?.[0] || '/placeholder.jpg';
  };

  const getAverageRating = () => {
    if (!property.reviews || property.reviews.length === 0) return 0;
    const sum = property.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / property.reviews.length;
  };

  const averageRating = getAverageRating();

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 w-full">
          <Image
            src={getMainImage()}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className={getStatusColor(property.status)}>
              {PROPERTY_STATUS_LABELS[property.status]}
            </Badge>
            {property.isFeatured && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Рекомендуемое
              </Badge>
            )}
            {property.isVerified && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Проверено
              </Badge>
            )}
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            {showActions && onFavorite && (
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                onClick={() => onFavorite(property.id)}
              >
                <Heart 
                  className={`h-4 w-4 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`} 
                />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
              {property.title}
            </h3>
            <div className="text-right">
              {property.operationType === OperationType.RENT && property.rentPrice && (
                <div className="text-lg font-bold text-green-600">
                  {formatPrice(property.rentPrice, property.currency)}/мес
                </div>
              )}
              {property.operationType === OperationType.SALE && property.salePrice && (
                <div className="text-lg font-bold text-green-600">
                  {formatPrice(property.salePrice, property.currency)}
                </div>
              )}
              {property.operationType === OperationType.BOTH && (
                <div className="text-sm">
                  {property.rentPrice && (
                    <div className="text-green-600 font-semibold">
                      {formatPrice(property.rentPrice, property.currency)}/мес
                    </div>
                  )}
                  {property.salePrice && (
                    <div className="text-green-600 font-semibold">
                      {formatPrice(property.salePrice, property.currency)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">
              {property.city}, {property.state}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{property.area} м²</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {PROPERTY_TYPE_LABELS[property.propertyType]}
              </Badge>
              <Badge variant="outline">
                {OPERATION_TYPE_LABELS[property.operationType]}
              </Badge>
            </div>
            
            {averageRating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">
                  ({property.reviews?.length || 0})
                </span>
              </div>
            )}
          </div>

          {property.features && property.features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {property.features.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{property.features.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{property.views} просмотров</span>
            </div>
            <span>{new Date(property.createdAt).toLocaleDateString('ru-RU')}</span>
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/properties/${property.id}`}>
              Подробнее
            </Link>
          </Button>
          {onContact && (
            <Button 
              variant="outline" 
              onClick={() => onContact(property.id)}
            >
              Связаться
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
