'use client';

import React, { useState, useEffect } from 'react';
import { PropertySearch } from '@/components/property-search';
import { PropertyCard } from '@/components/property-card';
import { Property, PropertySearchFilters, PropertySearchResult } from '@/types/property';
import { PropertyAPI } from '@/lib/api/property-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Home, 
  Building, 
  MapPin, 
  Star,
  Users,
  DollarSign,
  Eye
} from 'lucide-react';

export default function RealEstatePage() {
  const [searchResults, setSearchResults] = useState<PropertySearchResult | null>(null);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [featured, recent, statsData] = await Promise.all([
        PropertyAPI.getFeaturedProperties(6),
        PropertyAPI.getRecentProperties(6),
        PropertyAPI.getPropertyStats(),
      ]);
      
      setFeaturedProperties(featured);
      setRecentProperties(recent);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters: PropertySearchFilters) => {
    try {
      setLoading(true);
      const results = await PropertyAPI.searchProperties(filters, 1, 20);
      setSearchResults(results);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!searchResults) return;
    
    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const results = await PropertyAPI.searchProperties(
        searchResults.filters,
        nextPage,
        20
      );
      
      setSearchResults({
        ...results,
        properties: [...searchResults.properties, ...results.properties],
      });
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async (latitude: number, longitude: number, radius: number) => {
    try {
      setLoading(true);
      const results = await PropertyAPI.searchByLocation(latitude, longitude, radius, 1, 20);
      setSearchResults(results);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching by location:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = (propertyId: string) => {
    // TODO: Implement favorite functionality
    console.log('Toggle favorite:', propertyId);
  };

  const handleContact = (propertyId: string) => {
    // TODO: Implement contact functionality
    console.log('Contact property:', propertyId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Найдите идеальную недвижимость
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Аренда и покупка недвижимости с поддержкой ИИ агента
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Home className="h-5 w-5 mr-2" />
                Квартиры и дома
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Building className="h-5 w-5 mr-2" />
                Коммерческая недвижимость
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <MapPin className="h-5 w-5 mr-2" />
                По всему миру
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.totalProperties.toLocaleString()}
                </div>
                <div className="text-gray-600">Объектов недвижимости</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.availableProperties.toLocaleString()}
                </div>
                <div className="text-gray-600">Доступно сейчас</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stats.totalReservations.toLocaleString()}
                </div>
                <div className="text-gray-600">Успешных сделок</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {stats.averageRating.toFixed(1)}
                </div>
                <div className="text-gray-600">Средний рейтинг</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <PropertySearch
          onSearch={handleSearch}
          onLocationSearch={handleLocationSearch}
          showResults={true}
          results={searchResults?.properties || []}
          loading={loading}
          totalCount={searchResults?.totalCount || 0}
          onLoadMore={handleLoadMore}
          hasMore={searchResults?.hasMore || false}
        />
      </div>

      {/* Featured Properties */}
      {!searchResults && (
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Рекомендуемые объекты</h2>
              <Button variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Показать все
              </Button>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                      <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    showActions={true}
                    onFavorite={handleFavorite}
                    onContact={handleContact}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Properties */}
      {!searchResults && (
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Новые объявления</h2>
              <Button variant="outline">
                Показать все
              </Button>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                      <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    showActions={true}
                    onFavorite={handleFavorite}
                    onContact={handleContact}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-gray-600">
              Современные технологии для поиска недвижимости
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>ИИ агент</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Персональный ИИ агент запоминает ваши предпочтения и помогает найти идеальную недвижимость
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Геолокация</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Поиск недвижимости рядом с вами с точностью до метра
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Проверенные объекты</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Все объекты проходят проверку на достоверность информации
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готовы найти свою идеальную недвижимость?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Начните поиск прямо сейчас с помощью нашего ИИ агента
          </p>
          <Button size="lg" variant="secondary">
            Начать поиск
          </Button>
        </div>
      </div>
    </div>
  );
}
