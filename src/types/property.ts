// Типы для работы с недвижимостью

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  CONDO = 'CONDO',
  TOWNHOUSE = 'TOWNHOUSE',
  STUDIO = 'STUDIO',
  LOFT = 'LOFT',
  PENTHOUSE = 'PENTHOUSE',
  VILLA = 'VILLA',
  COMMERCIAL = 'COMMERCIAL',
  OFFICE = 'OFFICE',
  RETAIL = 'RETAIL',
  WAREHOUSE = 'WAREHOUSE',
  LAND = 'LAND',
  FARM = 'FARM',
  OTHER = 'OTHER'
}

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  SOLD = 'SOLD',
  PENDING = 'PENDING',
  MAINTENANCE = 'MAINTENANCE',
  UNAVAILABLE = 'UNAVAILABLE'
}

export enum OperationType {
  RENT = 'RENT',
  SALE = 'SALE',
  BOTH = 'BOTH'
}

export enum MemoryType {
  PREFERENCE = 'PREFERENCE',
  INTERACTION = 'INTERACTION',
  FEEDBACK = 'FEEDBACK',
  ANALYSIS = 'ANALYSIS'
}

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

// Основные интерфейсы
export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  operationType: OperationType;
  status: PropertyStatus;
  
  // Адрес и местоположение
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  
  // Основные характеристики
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  
  // Цены
  rentPrice?: number;
  salePrice?: number;
  currency: string;
  
  // Дополнительные характеристики
  features: string[];
  amenities: string[];
  images: string[];
  
  // Метаданные
  isFeatured: boolean;
  isVerified: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Связи
  ownerId: string;
  agentId?: string;
  locationId?: string;
  
  // Связанные объекты
  owner?: User;
  agent?: User;
  location?: Location;
  reservations?: PropertyReservation[];
  aiMemories?: PropertyAIMemory[];
  reviews?: PropertyReview[];
}

export interface PropertyReservation {
  id: string;
  propertyId: string;
  userId: string;
  operationType: OperationType;
  
  // Даты
  startDate: Date;
  endDate?: Date;
  moveInDate?: Date;
  moveOutDate?: Date;
  
  // Цены и условия
  totalPrice: number;
  monthlyRent?: number;
  deposit?: number;
  currency: string;
  
  // Статус резервации
  status: ReservationStatus;
  notes?: string;
  
  // Метаданные
  createdAt: Date;
  updatedAt: Date;
  
  // Связанные объекты
  property?: Property;
  user?: User;
}

export interface PropertyAIMemory {
  id: string;
  propertyId: string;
  replicaId?: string;
  
  // Тип памяти
  memoryType: MemoryType;
  title: string;
  content: string;
  context?: Record<string, any>;
  
  // Метаданные
  importance: number;
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Связанные объекты
  property?: Property;
}

export interface PropertyReview {
  id: string;
  propertyId: string;
  userId: string;
  
  // Оценка
  rating: number;
  title: string;
  comment: string;
  
  // Категории оценки
  cleanliness?: number;
  location?: number;
  value?: number;
  communication?: number;
  
  // Метаданные
  isVerified: boolean;
  helpfulVotes: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Связанные объекты
  property?: Property;
  user?: User;
}

export interface PropertyFavorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: Date;
  
  // Связанные объекты
  user?: User;
  property?: Property;
}

export interface PropertySearch {
  id: string;
  userId: string;
  
  // Параметры поиска
  query?: string;
  propertyTypes: PropertyType[];
  operationType?: OperationType;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  state?: string;
  country?: string;
  
  // Результаты поиска
  resultCount: number;
  isSaved: boolean;
  
  // Метаданные
  createdAt: Date;
  lastUsedAt: Date;
  
  // Связанные объекты
  user?: User;
}

// Расширенные интерфейсы для User и Location
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Новые поля для недвижимости
  phone?: string;
  avatar?: string;
  isAgent: boolean;
  isVerified: boolean;
  bio?: string;
  languages: string[];
  specialties: string[];
  
  // Связи с недвижимостью
  ownedProperties?: Property[];
  agentProperties?: Property[];
  propertyReservations?: PropertyReservation[];
  propertyReviews?: PropertyReview[];
  propertyFavorites?: PropertyFavorite[];
  propertySearches?: PropertySearch[];
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  featured: boolean;
  imageUrl?: string;
  
  // Новые поля
  city?: string;
  state?: string;
  country?: string;
  description?: string;
  
  // Связи
  properties?: Property[];
}

// DTO для создания и обновления
export interface CreatePropertyDto {
  title: string;
  description: string;
  propertyType: PropertyType;
  operationType: OperationType;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  rentPrice?: number;
  salePrice?: number;
  currency?: string;
  features?: string[];
  amenities?: string[];
  images?: string[];
  isFeatured?: boolean;
  isVerified?: boolean;
  ownerId: string;
  agentId?: string;
  locationId?: string;
}

export interface UpdatePropertyDto extends Partial<CreatePropertyDto> {
  id: string;
}

export interface CreateReservationDto {
  propertyId: string;
  userId: string;
  operationType: OperationType;
  startDate: Date;
  endDate?: Date;
  moveInDate?: Date;
  moveOutDate?: Date;
  totalPrice: number;
  monthlyRent?: number;
  deposit?: number;
  currency?: string;
  notes?: string;
}

export interface CreateAIMemoryDto {
  propertyId: string;
  replicaId?: string;
  memoryType: MemoryType;
  title: string;
  content: string;
  context?: Record<string, any>;
  importance?: number;
  expiresAt?: Date;
}

export interface CreateReviewDto {
  propertyId: string;
  userId: string;
  rating: number;
  title: string;
  comment: string;
  cleanliness?: number;
  location?: number;
  value?: number;
  communication?: number;
}

export interface PropertySearchFilters {
  query?: string;
  propertyTypes?: PropertyType[];
  operationType?: OperationType;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  state?: string;
  country?: string;
  isFeatured?: boolean;
  isVerified?: boolean;
  latitude?: number;
  longitude?: number;
  radius?: number; // в километрах
}

export interface PropertySearchResult {
  properties: Property[];
  totalCount: number;
  page: number;
  limit: number;
  hasMore: boolean;
  filters: PropertySearchFilters;
}

// Статистика и аналитика
export interface PropertyStats {
  totalProperties: number;
  availableProperties: number;
  rentedProperties: number;
  soldProperties: number;
  averageRentPrice: number;
  averageSalePrice: number;
  totalViews: number;
  totalReservations: number;
  totalReviews: number;
  averageRating: number;
}

export interface UserPropertyStats {
  ownedProperties: number;
  agentProperties: number;
  totalReservations: number;
  totalReviews: number;
  averageRating: number;
  totalViews: number;
}

// Константы для UI
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
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

export const OPERATION_TYPE_LABELS: Record<OperationType, string> = {
  [OperationType.RENT]: 'Аренда',
  [OperationType.SALE]: 'Продажа',
  [OperationType.BOTH]: 'Аренда и продажа'
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  [PropertyStatus.AVAILABLE]: 'Доступно',
  [PropertyStatus.RENTED]: 'Сдано в аренду',
  [PropertyStatus.SOLD]: 'Продано',
  [PropertyStatus.PENDING]: 'В ожидании',
  [PropertyStatus.MAINTENANCE]: 'На обслуживании',
  [PropertyStatus.UNAVAILABLE]: 'Недоступно'
};

export const MEMORY_TYPE_LABELS: Record<MemoryType, string> = {
  [MemoryType.PREFERENCE]: 'Предпочтения',
  [MemoryType.INTERACTION]: 'Взаимодействие',
  [MemoryType.FEEDBACK]: 'Обратная связь',
  [MemoryType.ANALYSIS]: 'Анализ'
};
