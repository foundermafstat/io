-- SQL скрипт для создания таблиц недвижимости
-- Выполнить после создания основных таблиц

-- Создание enum типов
CREATE TYPE property_type AS ENUM (
  'APARTMENT', 'HOUSE', 'CONDO', 'TOWNHOUSE', 'STUDIO', 
  'LOFT', 'PENTHOUSE', 'VILLA', 'COMMERCIAL', 'OFFICE', 
  'RETAIL', 'WAREHOUSE', 'LAND', 'FARM', 'OTHER'
);

CREATE TYPE property_status AS ENUM (
  'AVAILABLE', 'RENTED', 'SOLD', 'PENDING', 'MAINTENANCE', 'UNAVAILABLE'
);

CREATE TYPE operation_type AS ENUM (
  'RENT', 'SALE', 'BOTH'
);

-- Таблица недвижимости
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  property_type property_type NOT NULL,
  operation_type operation_type NOT NULL,
  status property_status DEFAULT 'AVAILABLE',
  
  -- Адрес и местоположение
  address VARCHAR(500) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Основные характеристики
  bedrooms INTEGER,
  bathrooms DECIMAL(3, 1),
  area DECIMAL(10, 2),
  floor INTEGER,
  total_floors INTEGER,
  year_built INTEGER,
  
  -- Цены
  rent_price DECIMAL(12, 2),
  sale_price DECIMAL(15, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Дополнительные характеристики
  features TEXT[],
  amenities TEXT[],
  images TEXT[],
  
  -- Метаданные
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Связи
  owner_id UUID NOT NULL REFERENCES users(id),
  agent_id UUID REFERENCES users(id),
  location_id UUID REFERENCES locations(id)
);

-- Таблица резерваций недвижимости
CREATE TABLE property_reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id),
  user_id UUID NOT NULL REFERENCES users(id),
  operation_type operation_type NOT NULL,
  
  -- Даты
  start_date DATE NOT NULL,
  end_date DATE,
  move_in_date DATE,
  move_out_date DATE,
  
  -- Цены и условия
  total_price DECIMAL(15, 2) NOT NULL,
  monthly_rent DECIMAL(12, 2),
  deposit DECIMAL(12, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Статус резервации
  status VARCHAR(20) DEFAULT 'PENDING',
  notes TEXT,
  
  -- Метаданные
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица памяти ИИ агента о недвижимости
CREATE TABLE property_ai_memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id),
  replica_id VARCHAR(255),
  
  -- Тип памяти
  memory_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  context JSONB,
  
  -- Метаданные
  importance INTEGER DEFAULT 1 CHECK (importance >= 1 AND importance <= 10),
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица отзывов о недвижимости
CREATE TABLE property_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id),
  user_id UUID NOT NULL REFERENCES users(id),
  
  -- Оценка
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255) NOT NULL,
  comment TEXT NOT NULL,
  
  -- Категории оценки
  cleanliness INTEGER CHECK (cleanliness >= 1 AND cleanliness <= 5),
  location_rating INTEGER CHECK (location_rating >= 1 AND location_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  communication INTEGER CHECK (communication >= 1 AND communication <= 5),
  
  -- Метаданные
  is_verified BOOLEAN DEFAULT false,
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица избранного
CREATE TABLE property_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  property_id UUID NOT NULL REFERENCES properties(id),
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, property_id)
);

-- Таблица поисковых запросов
CREATE TABLE property_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  
  -- Параметры поиска
  query TEXT,
  property_types property_type[],
  operation_type operation_type,
  min_price DECIMAL(15, 2),
  max_price DECIMAL(15, 2),
  min_area DECIMAL(10, 2),
  max_area DECIMAL(10, 2),
  bedrooms INTEGER,
  bathrooms DECIMAL(3, 1),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  
  -- Результаты поиска
  result_count INTEGER DEFAULT 0,
  is_saved BOOLEAN DEFAULT false,
  
  -- Метаданные
  created_at TIMESTAMP DEFAULT NOW(),
  last_used_at TIMESTAMP DEFAULT NOW()
);

-- Обновление таблицы users для недвижимости
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_agent BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS languages TEXT[];
ALTER TABLE users ADD COLUMN IF NOT EXISTS specialties TEXT[];

-- Обновление таблицы locations для недвижимости
ALTER TABLE locations ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE locations ADD COLUMN IF NOT EXISTS state VARCHAR(100);
ALTER TABLE locations ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE locations ADD COLUMN IF NOT EXISTS description TEXT;

-- Создание индексов для оптимизации запросов
CREATE INDEX idx_properties_type ON properties(property_type);
CREATE INDEX idx_properties_operation_type ON properties(operation_type);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_state ON properties(state);
CREATE INDEX idx_properties_country ON properties(country);
CREATE INDEX idx_properties_owner_id ON properties(owner_id);
CREATE INDEX idx_properties_agent_id ON properties(agent_id);
CREATE INDEX idx_properties_price_range ON properties(rent_price, sale_price);
CREATE INDEX idx_properties_area ON properties(area);
CREATE INDEX idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX idx_properties_created_at ON properties(created_at);

CREATE INDEX idx_property_reservations_property_id ON property_reservations(property_id);
CREATE INDEX idx_property_reservations_user_id ON property_reservations(user_id);
CREATE INDEX idx_property_reservations_status ON property_reservations(status);
CREATE INDEX idx_property_reservations_dates ON property_reservations(start_date, end_date);

CREATE INDEX idx_property_ai_memories_property_id ON property_ai_memories(property_id);
CREATE INDEX idx_property_ai_memories_replica_id ON property_ai_memories(replica_id);
CREATE INDEX idx_property_ai_memories_type ON property_ai_memories(memory_type);
CREATE INDEX idx_property_ai_memories_active ON property_ai_memories(is_active);

CREATE INDEX idx_property_reviews_property_id ON property_reviews(property_id);
CREATE INDEX idx_property_reviews_user_id ON property_reviews(user_id);
CREATE INDEX idx_property_reviews_rating ON property_reviews(rating);

CREATE INDEX idx_property_favorites_user_id ON property_favorites(user_id);
CREATE INDEX idx_property_favorites_property_id ON property_favorites(property_id);

CREATE INDEX idx_property_searches_user_id ON property_searches(user_id);
CREATE INDEX idx_property_searches_saved ON property_searches(is_saved);

-- Создание триггеров для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_reservations_updated_at BEFORE UPDATE ON property_reservations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_ai_memories_updated_at BEFORE UPDATE ON property_ai_memories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_reviews_updated_at BEFORE UPDATE ON property_reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Создание полнотекстового поиска для недвижимости
CREATE INDEX idx_properties_search ON properties USING gin(
  to_tsvector('english', title || ' ' || description || ' ' || address)
);

-- Создание индекса для геолокационного поиска
CREATE INDEX idx_properties_location ON properties USING gist(
  ll_to_earth(latitude, longitude)
);
