'use server';

import { PrismaClient } from '../../generated/prisma';
import { PropertyStatus } from '@/types/property';

const prisma = new PrismaClient();

// Популярные типы недвижимости
export async function getPopularPropertyTypes(limit: number = 10) {
  const typeCounts = await prisma.property.groupBy({
    by: ['propertyType'],
    where: {
      status: PropertyStatus.AVAILABLE,
    },
    _count: {
      propertyType: true,
    },
    orderBy: {
      _count: {
        propertyType: 'desc',
      },
    },
    take: limit,
  });

  return typeCounts.map(item => ({
    type: item.propertyType,
    count: item._count.propertyType,
  }));
}

// Популярные локации
export async function getPopularLocations(limit: number = 10) {
  const locationCounts = await prisma.property.groupBy({
    by: ['city', 'state', 'country'],
    where: {
      status: PropertyStatus.AVAILABLE,
    },
    _count: {
      city: true,
    },
    orderBy: {
      _count: {
        city: 'desc',
      },
    },
    take: limit,
  });

  return locationCounts
    .filter(item => item.city) // Фильтруем записи с заполненным городом
    .map(item => ({
      city: item.city!,
      state: item.state,
      country: item.country,
      count: (item._count as any)?.city || 0,
    }));
}

// Статистика по городам
export async function getCityStats() {
  const cityStats = await prisma.property.groupBy({
    by: ['city'],
    where: {
      status: PropertyStatus.AVAILABLE,
    },
    _count: {
      city: true,
    },
    _avg: {
      rentPrice: true,
      salePrice: true,
    },
    orderBy: {
      _count: {
        city: 'desc',
      },
    },
    take: 8,
  });

  return cityStats
    .filter(item => item.city) // Фильтруем записи с заполненным городом
    .map(item => ({
      city: item.city!,
      propertyCount: (item._count as any)?.city || 0,
      averageRentPrice: (item._avg as any)?.rentPrice || 0,
      averageSalePrice: (item._avg as any)?.salePrice || 0,
    }));
}
