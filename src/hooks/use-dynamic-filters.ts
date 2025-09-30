import { useState, useEffect, useMemo } from 'react';
import { Property, PropertyType, OperationType } from '@/types/property';

interface DynamicFilters {
  propertyTypes: Array<{ id: string; label: string; icon: string; count: number }>;
  locations: Array<{ value: string; label: string; count: number }>;
  features: Array<{ id: string; label: string; icon: string; count: number }>;
  budgetRanges: Array<{ label: string; min: number; max: number; count: number }>;
  operationTypes: Array<{ value: OperationType; label: string; count: number }>;
}

const PROPERTY_TYPE_ICONS: Record<string, string> = {
  'APARTMENT': '🏢',
  'HOUSE': '🏠',
  'CONDO': '🏙️',
  'TOWNHOUSE': '🏘️',
  'STUDIO': '🏠',
  'LOFT': '🏭',
  'PENTHOUSE': '🏢',
  'VILLA': '🏡',
  'COMMERCIAL': '🏢',
  'OFFICE': '🏢',
  'RETAIL': '🏪',
  'WAREHOUSE': '🏭',
  'LAND': '🌍',
  'FARM': '🚜',
  'OTHER': '🏠'
};

const FEATURE_ICONS: Record<string, string> = {
  'balcony': '🌅',
  'parking': '🅿️',
  'garden': '🌳',
  'gym': '💪',
  'pool': '🏊',
  'security': '🔒',
  'pet_friendly': '🐕',
  'elevator': '⚡',
  'air_conditioning': '❄️',
  'heating': '🔥',
  'wifi': '📶',
  'dishwasher': '🍽️',
  'washing_machine': '🧺',
  'dryer': '🌪️',
  'fireplace': '🔥',
  'balcony': '🌅',
  'terrace': '🏞️',
  'rooftop': '🏙️',
  'basement': '🏠',
  'garage': '🚗'
};

export function useDynamicFilters(properties: Property[]) {
  const [loading, setLoading] = useState(false);

  const dynamicFilters = useMemo((): DynamicFilters => {
    if (!properties || properties.length === 0) {
      return {
        propertyTypes: [],
        locations: [],
        features: [],
        budgetRanges: [],
        operationTypes: []
      };
    }

    // Подсчет типов недвижимости
    const propertyTypeCounts = properties.reduce((acc, property) => {
      if (property.propertyType) {
        const type = property.propertyType;
        acc[type] = (acc[type] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const propertyTypes = Object.entries(propertyTypeCounts)
      .map(([type, count]) => ({
        id: type.toLowerCase(),
        label: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
        icon: PROPERTY_TYPE_ICONS[type] || '🏠',
        count
      }))
      .sort((a, b) => b.count - a.count);

    // Подсчет локаций
    const locationCounts = properties.reduce((acc, property) => {
      const city = property.city;
      if (city) {
        acc[city] = (acc[city] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const locations = Object.entries(locationCounts)
      .map(([city, count]) => ({
        value: city,
        label: city,
        count
      }))
      .sort((a, b) => b.count - a.count);

    // Подсчет особенностей
    const featureCounts = properties.reduce((acc, property) => {
      if (Array.isArray(property.features)) {
        property.features.forEach(feature => {
          acc[feature] = (acc[feature] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>);

    const features = Object.entries(featureCounts)
      .map(([feature, count]) => ({
        id: feature,
        label: feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        icon: FEATURE_ICONS[feature] || '✨',
        count
      }))
      .sort((a, b) => b.count - a.count);

    // Подсчет типов операций
    const operationTypeCounts = properties.reduce((acc, property) => {
      if (property.operationType) {
        const type = property.operationType;
        acc[type] = (acc[type] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const operationTypes = Object.entries(operationTypeCounts)
      .map(([type, count]) => ({
        value: type as OperationType,
        label: type === 'RENT' ? 'Rent' : type === 'SALE' ? 'Buy' : 'Both',
        count
      }))
      .sort((a, b) => b.count - a.count);

    // Подсчет ценовых диапазонов
    const rentPrices = properties
      .filter(p => p.rentPrice && typeof p.rentPrice === 'number' && p.rentPrice > 0)
      .map(p => p.rentPrice!)
      .sort((a, b) => a - b);

    const salePrices = properties
      .filter(p => p.salePrice && typeof p.salePrice === 'number' && p.salePrice > 0)
      .map(p => p.salePrice!)
      .sort((a, b) => a - b);

    const budgetRanges = [];

    if (rentPrices.length > 0) {
      const minRent = Math.floor(rentPrices[0] / 100) * 100;
      const maxRent = Math.ceil(rentPrices[rentPrices.length - 1] / 100) * 100;

      const rentRanges = [
        { label: '€500-€1,000', min: 500, max: 1000 },
        { label: '€1,000-€2,000', min: 1000, max: 2000 },
        { label: '€2,000-€3,500', min: 2000, max: 3500 },
        { label: '€3,500-€5,000', min: 3500, max: 5000 },
        { label: '€5,000+', min: 5000, max: 100000 }
      ].map(range => ({
        ...range,
        count: rentPrices.filter(price => price >= range.min && price <= range.max).length
      })).filter(range => range.count > 0);

      budgetRanges.push(...rentRanges);
    }

    if (salePrices.length > 0) {
      const minSale = Math.floor(salePrices[0] / 10000) * 10000;
      const maxSale = Math.ceil(salePrices[salePrices.length - 1] / 10000) * 10000;

      const saleRanges = [
        { label: '€50K-€100K', min: 50000, max: 100000 },
        { label: '€100K-€200K', min: 100000, max: 200000 },
        { label: '€200K-€500K', min: 200000, max: 500000 },
        { label: '€500K-€1M', min: 500000, max: 1000000 },
        { label: '€1M+', min: 1000000, max: 10000000 }
      ].map(range => ({
        ...range,
        count: salePrices.filter(price => price >= range.min && price <= range.max).length
      })).filter(range => range.count > 0);

      budgetRanges.push(...saleRanges);
    }

    return {
      propertyTypes,
      locations,
      features,
      budgetRanges: budgetRanges.sort((a, b) => b.count - a.count),
      operationTypes
    };
  }, [properties]);

  return {
    dynamicFilters,
    loading
  };
}
