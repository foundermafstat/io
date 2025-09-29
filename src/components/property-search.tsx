'use client';

import React, { useState, useEffect } from 'react';
import { PropertySearchFilters, PropertyType, OperationType } from '@/types/property';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Search, Filter, MapPin } from 'lucide-react';
import { PropertyCard } from './property-card';
import { Property } from '@/types/property';

interface PropertySearchProps {
  onSearch?: (filters: PropertySearchFilters) => void;
  onLocationSearch?: (latitude: number, longitude: number, radius: number) => void;
  initialFilters?: PropertySearchFilters;
  showResults?: boolean;
  results?: Property[];
  loading?: boolean;
  totalCount?: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const PROPERTY_TYPE_OPTIONS = [
  { value: PropertyType.APARTMENT, label: 'Квартира' },
  { value: PropertyType.HOUSE, label: 'Дом' },
  { value: PropertyType.CONDO, label: 'Кондо' },
  { value: PropertyType.TOWNHOUSE, label: 'Таунхаус' },
  { value: PropertyType.STUDIO, label: 'Студия' },
  { value: PropertyType.LOFT, label: 'Лофт' },
  { value: PropertyType.PENTHOUSE, label: 'Пентхаус' },
  { value: PropertyType.VILLA, label: 'Вилла' },
  { value: PropertyType.COMMERCIAL, label: 'Коммерческая' },
  { value: PropertyType.OFFICE, label: 'Офис' },
  { value: PropertyType.RETAIL, label: 'Торговая' },
  { value: PropertyType.WAREHOUSE, label: 'Склад' },
  { value: PropertyType.LAND, label: 'Земля' },
  { value: PropertyType.FARM, label: 'Ферма' },
  { value: PropertyType.OTHER, label: 'Другое' },
];

const OPERATION_TYPE_OPTIONS = [
  { value: OperationType.RENT, label: 'Аренда' },
  { value: OperationType.SALE, label: 'Продажа' },
  { value: OperationType.BOTH, label: 'Аренда и продажа' },
];

export function PropertySearch({
  onSearch,
  onLocationSearch,
  initialFilters = {},
  showResults = true,
  results = [],
  loading = false,
  totalCount = 0,
  onLoadMore,
  hasMore = false,
}: PropertySearchProps) {
  const [filters, setFilters] = useState<PropertySearchFilters>({
    query: '',
    propertyTypes: [],
    operationType: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minArea: undefined,
    maxArea: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
    city: '',
    state: '',
    country: '',
    isFeatured: false,
    isVerified: false,
    ...initialFilters,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // Проверяем поддержку геолокации
    if (navigator.geolocation) {
      setLocationPermission(true);
    }
  }, []);

  const handleFilterChange = (key: keyof PropertySearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters);
    }
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation && onLocationSearch) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationSearch(latitude, longitude, 10); // 10 км радиус
        },
        (error) => {
          console.error('Ошибка получения местоположения:', error);
        }
      );
    }
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      propertyTypes: [],
      operationType: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minArea: undefined,
      maxArea: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      city: '',
      state: '',
      country: '',
      isFeatured: false,
      isVerified: false,
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== false && 
    (Array.isArray(value) ? value.length > 0 : true)
  );

  return (
    <div className="space-y-6">
      {/* Поисковая форма */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Поиск недвижимости
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Основной поиск */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="query">Поиск по названию или описанию</Label>
              <Input
                id="query"
                placeholder="Введите ключевые слова..."
                value={filters.query || ''}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSearch} className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Найти
              </Button>
              {locationPermission && (
                <Button 
                  variant="outline" 
                  onClick={handleLocationSearch}
                  title="Поиск рядом со мной"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Быстрые фильтры */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="operationType">Тип операции</Label>
              <Select
                value={filters.operationType || ''}
                onValueChange={(value) => handleFilterChange('operationType', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Все типы" />
                </SelectTrigger>
                <SelectContent>
                  {OPERATION_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="city">Город</Label>
              <Input
                id="city"
                placeholder="Город"
                value={filters.city || ''}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="bedrooms">Спальни</Label>
              <Select
                value={filters.bedrooms?.toString() || ''}
                onValueChange={(value) => handleFilterChange('bedrooms', value ? parseInt(value) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Любое" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Любое</SelectItem>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}+
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bathrooms">Ванные</Label>
              <Select
                value={filters.bathrooms?.toString() || ''}
                onValueChange={(value) => handleFilterChange('bathrooms', value ? parseFloat(value) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Любое" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Любое</SelectItem>
                  {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}+
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Расширенные фильтры */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {showAdvanced ? 'Скрыть' : 'Показать'} расширенные фильтры
              </Button>
              
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Очистить
                </Button>
              )}
            </div>

            {showAdvanced && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-gray-50">
                {/* Типы недвижимости */}
                <div>
                  <Label>Типы недвижимости</Label>
                  <div className="space-y-2 mt-2">
                    {PROPERTY_TYPE_OPTIONS.map((option) => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.propertyTypes?.includes(option.value) || false}
                          onChange={(e) => {
                            const newTypes = filters.propertyTypes || [];
                            if (e.target.checked) {
                              handleFilterChange('propertyTypes', [...newTypes, option.value]);
                            } else {
                              handleFilterChange('propertyTypes', newTypes.filter(t => t !== option.value));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ценовой диапазон */}
                <div>
                  <Label>Ценовой диапазон</Label>
                  <div className="space-y-2 mt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="От"
                        value={filters.minPrice || ''}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                      <Input
                        type="number"
                        placeholder="До"
                        value={filters.maxPrice || ''}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </div>
                  </div>
                </div>

                {/* Площадь */}
                <div>
                  <Label>Площадь (м²)</Label>
                  <div className="space-y-2 mt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="От"
                        value={filters.minArea || ''}
                        onChange={(e) => handleFilterChange('minArea', e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                      <Input
                        type="number"
                        placeholder="До"
                        value={filters.maxArea || ''}
                        onChange={(e) => handleFilterChange('maxArea', e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </div>
                  </div>
                </div>

                {/* Дополнительные опции */}
                <div className="md:col-span-2 lg:col-span-3">
                  <Label>Дополнительные опции</Label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.isFeatured || false}
                        onChange={(e) => handleFilterChange('isFeatured', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Только рекомендуемые</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.isVerified || false}
                        onChange={(e) => handleFilterChange('isVerified', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Только проверенные</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Активные фильтры */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Активные фильтры:</span>
              {filters.query && (
                <Badge variant="secondary">
                  Поиск: {filters.query}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('query', '')}
                  />
                </Badge>
              )}
              {filters.propertyTypes && filters.propertyTypes.length > 0 && (
                <Badge variant="secondary">
                  Типы: {filters.propertyTypes.length}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('propertyTypes', [])}
                  />
                </Badge>
              )}
              {filters.operationType && (
                <Badge variant="secondary">
                  {OPERATION_TYPE_OPTIONS.find(o => o.value === filters.operationType)?.label}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('operationType', undefined)}
                  />
                </Badge>
              )}
              {filters.city && (
                <Badge variant="secondary">
                  Город: {filters.city}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('city', '')}
                  />
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Результаты поиска */}
      {showResults && (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Поиск недвижимости...</p>
            </div>
          ) : (
            <>
              {totalCount > 0 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Найдено {totalCount} объектов недвижимости
                  </p>
                </div>
              )}

              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      showActions={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Недвижимость не найдена</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Попробуйте изменить параметры поиска
                  </p>
                </div>
              )}

              {hasMore && onLoadMore && (
                <div className="text-center">
                  <Button onClick={onLoadMore} variant="outline">
                    Загрузить еще
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
