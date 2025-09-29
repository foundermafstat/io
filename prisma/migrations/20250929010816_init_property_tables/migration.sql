-- CreateTable
CREATE TABLE "Validation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "replicaSubmissionId" TEXT NOT NULL,
    "testCases" JSONB NOT NULL,
    "sensayValidation" JSONB NOT NULL,
    "openaiValidation" JSONB NOT NULL,
    "averageScores" JSONB NOT NULL,
    "finalVerdict" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Validation_replicaSubmissionId_fkey" FOREIGN KEY ("replicaSubmissionId") REFERENCES "replica_submissions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "replica_submissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "replicaApiEndpoint" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "api_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "replicaUuid" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "chat_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "apiSettingsId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "chat_sessions_apiSettingsId_fkey" FOREIGN KEY ("apiSettingsId") REFERENCES "api_settings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "chat_messages_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "chat_sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "replicas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "apiSettingsId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "replicas_apiSettingsId_fkey" FOREIGN KEY ("apiSettingsId") REFERENCES "api_settings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "operationType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "bedrooms" INTEGER,
    "bathrooms" REAL,
    "area" REAL,
    "floor" INTEGER,
    "totalFloors" INTEGER,
    "yearBuilt" INTEGER,
    "rentPrice" REAL,
    "salePrice" REAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "features" JSONB NOT NULL,
    "amenities" JSONB NOT NULL,
    "images" JSONB NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ownerId" TEXT NOT NULL,
    "agentId" TEXT,
    "locationId" TEXT,
    CONSTRAINT "properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "properties_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "properties_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "property_reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "operationType" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "moveInDate" DATETIME,
    "moveOutDate" DATETIME,
    "totalPrice" REAL NOT NULL,
    "monthlyRent" REAL,
    "deposit" REAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "property_reservations_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "property_reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "property_ai_memories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT NOT NULL,
    "replicaId" TEXT,
    "memoryType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "context" JSONB,
    "importance" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "property_ai_memories_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "property_reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "cleanliness" INTEGER,
    "location" INTEGER,
    "value" INTEGER,
    "communication" INTEGER,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "helpfulVotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "property_reviews_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "property_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "property_favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "property_favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "property_favorites_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "property_searches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "query" TEXT,
    "propertyTypes" JSONB NOT NULL,
    "operationType" TEXT,
    "minPrice" REAL,
    "maxPrice" REAL,
    "minArea" REAL,
    "maxArea" REAL,
    "bedrooms" INTEGER,
    "bathrooms" REAL,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "resultCount" INTEGER NOT NULL DEFAULT 0,
    "isSaved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "property_searches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "phone" TEXT,
    "avatar" TEXT,
    "isAgent" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "bio" TEXT,
    "languages" JSONB NOT NULL,
    "specialties" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "description" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Validation_replicaSubmissionId_key" ON "Validation"("replicaSubmissionId");

-- CreateIndex
CREATE UNIQUE INDEX "api_settings_name_key" ON "api_settings"("name");

-- CreateIndex
CREATE UNIQUE INDEX "property_favorites_userId_propertyId_key" ON "property_favorites"("userId", "propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "locations_slug_key" ON "locations"("slug");
