const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Initializing real estate database...');

  try {
    // Создание тестовых пользователей
    console.log('👥 Creating test users...');
    
    const owner1 = await prisma.user.upsert({
      where: { email: 'owner1@example.com' },
      update: {},
      create: {
        name: 'Carlos Rodriguez',
        email: 'owner1@example.com',
        password: 'password123',
        phone: '+34 666 123 456',
        isAgent: false,
        isVerified: true,
        bio: 'Real estate owner with 10 years of experience in Barcelona',
        languages: JSON.stringify(['en', 'es', 'ca']),
        specialties: [],
      },
    });

    const agent1 = await prisma.user.upsert({
      where: { email: 'agent1@example.com' },
      update: {},
      create: {
        name: 'Maria Garcia',
        email: 'agent1@example.com',
        password: 'password123',
        phone: '+34 666 234 567',
        isAgent: true,
        isVerified: true,
        bio: 'Professional real estate agent specializing in Barcelona properties',
        languages: JSON.stringify(['en', 'es', 'ca', 'fr']),
        specialties: JSON.stringify(['apartments', 'houses', 'commercial', 'luxury']),
      },
    });

    const buyer1 = await prisma.user.upsert({
      where: { email: 'buyer1@example.com' },
      update: {},
      create: {
        name: 'James Wilson',
        email: 'buyer1@example.com',
        password: 'password123',
        phone: '+34 666 345 678',
        isAgent: false,
        isVerified: false,
        bio: 'Looking for a family apartment in Barcelona',
        languages: JSON.stringify(['en', 'es']),
        specialties: [],
      },
    });

    console.log('✅ Users created');

    // Создание локаций
    console.log('📍 Creating locations...');
    
    const barcelona = await prisma.location.upsert({
      where: { slug: 'barcelona' },
      update: {},
      create: {
        name: 'Barcelona',
        slug: 'barcelona',
        latitude: 41.3851,
        longitude: 2.1734,
        featured: true,
        imageUrl: '/images/barcelona.jpg',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        description: 'Vibrant Mediterranean city with rich culture, architecture, and modern lifestyle',
      },
    });

    const madrid = await prisma.location.upsert({
      where: { slug: 'madrid' },
      update: {},
      create: {
        name: 'Madrid',
        slug: 'madrid',
        latitude: 40.4168,
        longitude: -3.7038,
        featured: true,
        imageUrl: '/images/madrid.jpg',
        city: 'Madrid',
        state: 'Community of Madrid',
        country: 'Spain',
        description: 'Capital of Spain, cultural and business center',
      },
    });

    console.log('✅ Locations created');

    // Создание объектов недвижимости
    console.log('🏠 Creating properties...');
    
    const properties = [
      // Luxury Apartment in Eixample
      {
        title: 'Luxury Apartment in Eixample with Sagrada Familia View',
        description: 'Stunning 3-bedroom apartment in the heart of Eixample district with breathtaking views of Sagrada Familia. Recently renovated with high-end finishes and modern amenities.',
        propertyType: 'APARTMENT',
        operationType: 'BOTH',
        status: 'AVAILABLE',
        address: 'Passeig de Gràcia, 123, 4º 2ª, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08008',
        latitude: 41.3954,
        longitude: 2.1612,
        bedrooms: 3,
        bathrooms: 2,
        area: 120.0,
        floor: 4,
        totalFloors: 6,
        yearBuilt: 1920,
        rentPrice: 2800,
        salePrice: 850000,
        currency: 'EUR',
        features: JSON.stringify(['Balcony', 'Air Conditioning', 'Hardwood Floors', 'High Ceilings', 'Original Features']),
        amenities: JSON.stringify(['Elevator', 'Concierge', 'Security', 'Gym', 'Rooftop Terrace']),
        images: JSON.stringify(['/images/barcelona-luxury-apt-1.jpg', '/images/barcelona-luxury-apt-2.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      // Modern Studio in Gothic Quarter
      {
        title: 'Modern Studio in Gothic Quarter - Perfect for Digital Nomads',
        description: 'Contemporary studio apartment in the historic Gothic Quarter, fully furnished and equipped for remote work. Walking distance to all major attractions.',
        propertyType: 'STUDIO',
        operationType: 'RENT',
        status: 'AVAILABLE',
        address: 'Carrer de la Boqueria, 15, 2º, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08002',
        latitude: 41.3818,
        longitude: 2.1751,
        bedrooms: 0,
        bathrooms: 1,
        area: 28.0,
        floor: 2,
        totalFloors: 4,
        yearBuilt: 2019,
        rentPrice: 1200,
        salePrice: 320000,
        currency: 'EUR',
        features: JSON.stringify(['Furnished', 'Air Conditioning', 'WiFi', 'Modern Kitchen', 'Soundproof Windows']),
        amenities: JSON.stringify(['Elevator', 'Security', 'Laundry Room', 'Bike Storage']),
        images: JSON.stringify(['/images/barcelona-studio-1.jpg']),
        isFeatured: false,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      // Penthouse in Poblenou
      {
        title: 'Stunning Penthouse with Sea Views in Poblenou',
        description: 'Exclusive penthouse with panoramic sea views and private terrace. Located in the trendy Poblenou district, close to the beach and tech companies.',
        propertyType: 'PENTHOUSE',
        operationType: 'SALE',
        status: 'AVAILABLE',
        address: 'Carrer de Pallars, 201, 8º, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08005',
        latitude: 41.3984,
        longitude: 2.1974,
        bedrooms: 4,
        bathrooms: 3,
        area: 180.0,
        floor: 8,
        totalFloors: 8,
        yearBuilt: 2022,
        rentPrice: null,
        salePrice: 1200000,
        currency: 'EUR',
        features: JSON.stringify(['Private Terrace', 'Sea Views', 'Air Conditioning', 'Smart Home', 'Parking Space']),
        amenities: JSON.stringify(['Elevator', 'Concierge', 'Security', 'Gym', 'Pool', 'Rooftop Garden']),
        images: JSON.stringify(['/images/barcelona-penthouse-1.jpg', '/images/barcelona-penthouse-2.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      // Family House in Sarrià-Sant Gervasi
      {
        title: 'Spacious Family House with Garden in Sarrià-Sant Gervasi',
        description: 'Beautiful 4-bedroom family house with private garden and garage. Quiet residential area with excellent schools and public transport connections.',
        propertyType: 'HOUSE',
        operationType: 'BOTH',
        status: 'AVAILABLE',
        address: 'Carrer de Sant Gervasi de Cassoles, 45, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08022',
        latitude: 41.4014,
        longitude: 2.1394,
        bedrooms: 4,
        bathrooms: 3,
        area: 200.0,
        floor: 2,
        totalFloors: 2,
        yearBuilt: 2015,
        rentPrice: 3500,
        salePrice: 950000,
        currency: 'EUR',
        features: JSON.stringify(['Private Garden', 'Garage', 'Fireplace', 'Air Conditioning', 'Storage Room']),
        amenities: JSON.stringify(['Security', 'Parking', 'Garden', 'Near Schools', 'Public Transport']),
        images: JSON.stringify(['/images/barcelona-house-1.jpg', '/images/barcelona-house-2.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      // Commercial Office in 22@ District
      {
        title: 'Modern Office Space in 22@ Innovation District',
        description: 'Contemporary office space in Barcelona\'s innovation district, perfect for startups and tech companies. Open plan with meeting rooms and breakout areas.',
        propertyType: 'OFFICE',
        operationType: 'RENT',
        status: 'AVAILABLE',
        address: 'Carrer de Roc Boronat, 117, 3º, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08018',
        latitude: 41.3984,
        longitude: 2.1974,
        bedrooms: 0,
        bathrooms: 2,
        area: 150.0,
        floor: 3,
        totalFloors: 6,
        yearBuilt: 2020,
        rentPrice: 4500,
        salePrice: 650000,
        currency: 'EUR',
        features: JSON.stringify(['Open Plan', 'Meeting Rooms', 'Air Conditioning', 'High-Speed Internet', 'Kitchenette']),
        amenities: JSON.stringify(['Elevator', 'Security', 'Parking', 'Cafeteria', 'Gym', 'Conference Room']),
        images: JSON.stringify(['/images/barcelona-office-1.jpg']),
        isFeatured: false,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      // Loft in El Born
      {
        title: 'Industrial Loft in El Born - Creative Space',
        description: 'Converted industrial loft in the trendy El Born district. High ceilings, exposed brick walls, and modern amenities. Perfect for artists and creative professionals.',
        propertyType: 'LOFT',
        operationType: 'RENT',
        status: 'AVAILABLE',
        address: 'Carrer de la Princesa, 28, 1º, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08003',
        latitude: 41.3848,
        longitude: 2.1814,
        bedrooms: 1,
        bathrooms: 1,
        area: 65.0,
        floor: 1,
        totalFloors: 3,
        yearBuilt: 2018,
        rentPrice: 1800,
        salePrice: 480000,
        currency: 'EUR',
        features: JSON.stringify(['High Ceilings', 'Exposed Brick', 'Industrial Style', 'Air Conditioning', 'Modern Kitchen']),
        amenities: JSON.stringify(['Elevator', 'Security', 'Storage', 'Near Metro', 'Cultural District']),
        images: JSON.stringify(['/images/barcelona-loft-1.jpg']),
        isFeatured: false,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      // Villa in Pedralbes
      {
        title: 'Luxury Villa in Pedralbes with Pool',
        description: 'Exclusive villa in the prestigious Pedralbes neighborhood. Private pool, garden, and panoramic city views. Perfect for luxury living.',
        propertyType: 'VILLA',
        operationType: 'SALE',
        status: 'AVAILABLE',
        address: 'Avinguda de Pedralbes, 45, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08034',
        latitude: 41.3902,
        longitude: 2.1139,
        bedrooms: 5,
        bathrooms: 4,
        area: 350.0,
        floor: 2,
        totalFloors: 2,
        yearBuilt: 2018,
        rentPrice: null,
        salePrice: 2500000,
        currency: 'EUR',
        features: JSON.stringify(['Private Pool', 'Garden', 'City Views', 'Air Conditioning', 'Wine Cellar', 'Home Theater']),
        amenities: JSON.stringify(['Security', 'Parking', 'Pool', 'Garden', 'Near University', 'Quiet Area']),
        images: JSON.stringify(['/images/barcelona-villa-1.jpg', '/images/barcelona-villa-2.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      // Retail Space in Gràcia
      {
        title: 'Prime Retail Space in Gràcia - High Foot Traffic',
        description: 'Excellent retail space in the vibrant Gràcia neighborhood. High foot traffic, perfect for restaurants, cafes, or retail businesses.',
        propertyType: 'RETAIL',
        operationType: 'RENT',
        status: 'AVAILABLE',
        address: 'Carrer de Verdi, 12, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08012',
        latitude: 41.4014,
        longitude: 2.1554,
        bedrooms: 0,
        bathrooms: 1,
        area: 80.0,
        floor: 0,
        totalFloors: 3,
        yearBuilt: 1950,
        rentPrice: 2200,
        salePrice: 420000,
        currency: 'EUR',
        features: JSON.stringify(['Street Level', 'High Ceilings', 'Large Windows', 'Storage Room', 'Air Conditioning']),
        amenities: JSON.stringify(['Security', 'Near Metro', 'High Foot Traffic', 'Restaurant District']),
        images: JSON.stringify(['/images/barcelona-retail-1.jpg']),
        isFeatured: false,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      // Apartment in Barceloneta
      {
        title: 'Beachfront Apartment in Barceloneta - Steps from the Beach',
        description: 'Charming 2-bedroom apartment just steps from Barceloneta beach. Perfect for vacation rentals or beach lovers. Recently renovated.',
        propertyType: 'APARTMENT',
        operationType: 'BOTH',
        status: 'AVAILABLE',
        address: 'Passeig de Joan de Borbó, 45, 2º, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08003',
        latitude: 41.3781,
        longitude: 2.1894,
        bedrooms: 2,
        bathrooms: 1,
        area: 75.0,
        floor: 2,
        totalFloors: 4,
        yearBuilt: 2017,
        rentPrice: 2000,
        salePrice: 580000,
        currency: 'EUR',
        features: JSON.stringify(['Beach Views', 'Balcony', 'Air Conditioning', 'Modern Kitchen', 'Furnished']),
        amenities: JSON.stringify(['Elevator', 'Security', 'Near Beach', 'Restaurants', 'Public Transport']),
        images: JSON.stringify(['/images/barcelona-beach-apt-1.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      // Condo in Les Corts
      {
        title: 'Modern Condo in Les Corts - Near Camp Nou',
        description: 'Contemporary 3-bedroom condo in Les Corts district, walking distance to Camp Nou stadium. Modern building with excellent amenities.',
        propertyType: 'CONDO',
        operationType: 'RENT',
        status: 'AVAILABLE',
        address: 'Carrer de Numància, 78, 5º, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08029',
        latitude: 41.3809,
        longitude: 2.1228,
        bedrooms: 3,
        bathrooms: 2,
        area: 95.0,
        floor: 5,
        totalFloors: 8,
        yearBuilt: 2021,
        rentPrice: 2400,
        salePrice: 720000,
        currency: 'EUR',
        features: JSON.stringify(['Modern Design', 'Air Conditioning', 'Balcony', 'Parking Space', 'Storage']),
        amenities: JSON.stringify(['Elevator', 'Concierge', 'Security', 'Gym', 'Pool', 'Near Stadium']),
        images: JSON.stringify(['/images/barcelona-condo-1.jpg']),
        isFeatured: false,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      }
    ];

    for (const propertyData of properties) {
      await prisma.property.create({
        data: propertyData,
      });
    }

    console.log('✅ Properties created');

    // Создание резерваций
    console.log('📅 Creating reservations...');
    
    const apartment = await prisma.property.findFirst({
      where: { title: 'Luxury Apartment in Eixample with Sagrada Familia View' },
    });

    if (apartment) {
      await prisma.propertyReservation.create({
        data: {
          propertyId: apartment.id,
          userId: buyer1.id,
          operationType: 'RENT',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-08-01'),
          moveInDate: new Date('2024-02-01'),
          moveOutDate: new Date('2024-08-01'),
          totalPrice: 16800,
          monthlyRent: 2800,
          deposit: 5600,
          currency: 'EUR',
          status: 'CONFIRMED',
          notes: 'Long-term rental for 6 months',
        },
      });
    }

    console.log('✅ Reservations created');

    // Создание отзывов
    console.log('⭐ Creating reviews...');
    
    if (apartment) {
      await prisma.propertyReview.create({
        data: {
          propertyId: apartment.id,
          userId: buyer1.id,
          rating: 5,
          title: 'Amazing apartment with incredible views!',
          comment: 'Absolutely love this place! The apartment matches the description perfectly, everything works great. The view of Sagrada Familia is breathtaking.',
          cleanliness: 5,
          location: 5,
          value: 4,
          communication: 5,
          isVerified: true,
          helpfulVotes: 3,
        },
      });
    }

    console.log('✅ Reviews created');

    // Создание памяти ИИ агента
    console.log('🧠 Creating AI agent memories...');
    
    if (apartment) {
      await prisma.propertyAIMemory.create({
        data: {
          propertyId: apartment.id,
          replicaId: 'test-replica-1',
          memoryType: 'PREFERENCE',
          title: 'Client Preferences',
          content: 'Client prefers apartments in the city center with good public transport connections and modern amenities',
          context: {
            budget: 3000,
            preferredAreas: ['Eixample', 'Gothic Quarter', 'Gràcia'],
            requirements: ['metro nearby', 'parking', 'air conditioning'],
          },
          importance: 8,
          isActive: true,
        },
      });

      await prisma.propertyAIMemory.create({
        data: {
          propertyId: apartment.id,
          replicaId: 'test-replica-1',
          memoryType: 'INTERACTION',
          title: 'Client Interaction',
          content: 'Client was interested in rental extension possibilities and pet policies',
          context: {
            questions: ['rental extension', 'pet policy'],
            response: 'Discussed extension terms and pet-friendly options',
          },
          importance: 6,
          isActive: true,
        },
      });
    }

    console.log('✅ AI agent memories created');

    // Создание поисковых запросов
    console.log('🔍 Creating search queries...');
    
    await prisma.propertySearch.create({
      data: {
        userId: buyer1.id,
        query: 'apartment center barcelona',
        propertyTypes: JSON.stringify(['APARTMENT']),
        operationType: 'RENT',
        minPrice: 1500,
        maxPrice: 3000,
        minArea: 60,
        maxArea: 120,
        bedrooms: 2,
        city: 'Barcelona',
        resultCount: 8,
        isSaved: true,
      },
    });

    console.log('✅ Search queries created');

    console.log('🎉 Database successfully initialized!');
    console.log('\n📊 Created:');
    console.log(`- ${await prisma.user.count()} users`);
    console.log(`- ${await prisma.location.count()} locations`);
    console.log(`- ${await prisma.property.count()} properties`);
    console.log(`- ${await prisma.propertyReservation.count()} reservations`);
    console.log(`- ${await prisma.propertyReview.count()} reviews`);
    console.log(`- ${await prisma.propertyAIMemory.count()} AI memories`);
    console.log(`- ${await prisma.propertySearch.count()} search queries`);

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
