const { PrismaClient } = require('@prisma/client');

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

    const buyer2 = await prisma.user.upsert({
      where: { email: 'buyer2@example.com' },
      update: {},
      create: {
        name: 'Sarah Johnson',
        email: 'buyer2@example.com',
        password: 'password123',
        phone: '+34 666 456 789',
        isAgent: false,
        isVerified: true,
        bio: 'Digital nomad looking for modern apartments with good internet',
        languages: JSON.stringify(['en', 'fr']),
        specialties: [],
      },
    });

    const buyer3 = await prisma.user.upsert({
      where: { email: 'buyer3@example.com' },
      update: {},
      create: {
        name: 'Michael Brown',
        email: 'buyer3@example.com',
        password: 'password123',
        phone: '+34 666 567 890',
        isAgent: false,
        isVerified: true,
        bio: 'Investor looking for rental properties in prime locations',
        languages: JSON.stringify(['en', 'es', 'ca']),
        specialties: [],
      },
    });

    const agent2 = await prisma.user.upsert({
      where: { email: 'agent2@example.com' },
      update: {},
      create: {
        name: 'David Martinez',
        email: 'agent2@example.com',
        password: 'password123',
        phone: '+34 666 678 901',
        isAgent: true,
        isVerified: true,
        bio: 'Luxury real estate specialist with 15 years of experience',
        languages: JSON.stringify(['en', 'es', 'ca', 'fr', 'it']),
        specialties: JSON.stringify(['luxury', 'villas', 'penthouses', 'commercial']),
      },
    });

    const agent3 = await prisma.user.upsert({
      where: { email: 'agent3@example.com' },
      update: {},
      create: {
        name: 'Anna Rodriguez',
        email: 'agent3@example.com',
        password: 'password123',
        phone: '+34 666 789 012',
        isAgent: true,
        isVerified: true,
        bio: 'Commercial real estate expert specializing in office spaces',
        languages: JSON.stringify(['en', 'es', 'ca']),
        specialties: JSON.stringify(['commercial', 'office', 'retail', 'industrial']),
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

    const valencia = await prisma.location.upsert({
      where: { slug: 'valencia' },
      update: {},
      create: {
        name: 'Valencia',
        slug: 'valencia',
        latitude: 39.4699,
        longitude: -0.3763,
        featured: true,
        imageUrl: '/images/valencia.jpg',
        city: 'Valencia',
        state: 'Valencian Community',
        country: 'Spain',
        description: 'Beautiful coastal city with modern architecture and rich culture',
      },
    });

    const seville = await prisma.location.upsert({
      where: { slug: 'seville' },
      update: {},
      create: {
        name: 'Seville',
        slug: 'seville',
        latitude: 37.3891,
        longitude: -5.9845,
        featured: false,
        imageUrl: '/images/seville.jpg',
        city: 'Seville',
        state: 'Andalusia',
        country: 'Spain',
        description: 'Historic city with stunning architecture and vibrant culture',
      },
    });

    const bilbao = await prisma.location.upsert({
      where: { slug: 'bilbao' },
      update: {},
      create: {
        name: 'Bilbao',
        slug: 'bilbao',
        latitude: 43.2627,
        longitude: -2.9253,
        featured: false,
        imageUrl: '/images/bilbao.jpg',
        city: 'Bilbao',
        state: 'Basque Country',
        country: 'Spain',
        description: 'Industrial city transformed into a cultural and business hub',
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
      },
      // Additional Barcelona Houses
      {
        title: 'Charming Townhouse in Gràcia with Private Patio',
        description: 'Beautiful 3-story townhouse in the heart of Gràcia district. Features a private patio, modern kitchen, and original architectural details. Perfect for families.',
        propertyType: 'HOUSE',
        operationType: 'BOTH',
        status: 'AVAILABLE',
        address: 'Carrer de Torrent de l\'Olla, 45, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08012',
        latitude: 41.4014,
        longitude: 2.1554,
        bedrooms: 4,
        bathrooms: 3,
        area: 180.0,
        floor: 1,
        totalFloors: 3,
        yearBuilt: 1925,
        rentPrice: 3200,
        salePrice: 980000,
        currency: 'EUR',
        features: JSON.stringify(['Private Patio', 'Original Features', 'Modern Kitchen', 'High Ceilings', 'Storage']),
        amenities: JSON.stringify(['Near Metro', 'Restaurants', 'Parks', 'Schools', 'Cultural District']),
        images: JSON.stringify(['/images/barcelona-townhouse-1.jpg', '/images/barcelona-townhouse-2.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      {
        title: 'Modern Duplex in Poblenou with Rooftop Terrace',
        description: 'Contemporary duplex apartment with private rooftop terrace and sea views. Located in the trendy Poblenou district, close to the beach and tech companies.',
        propertyType: 'APARTMENT',
        operationType: 'SALE',
        status: 'AVAILABLE',
        address: 'Carrer de Pallars, 145, 4º-5º, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08018',
        latitude: 41.3984,
        longitude: 2.1974,
        bedrooms: 3,
        bathrooms: 2,
        area: 140.0,
        floor: 4,
        totalFloors: 6,
        yearBuilt: 2020,
        rentPrice: null,
        salePrice: 890000,
        currency: 'EUR',
        features: JSON.stringify(['Rooftop Terrace', 'Sea Views', 'Duplex', 'Modern Design', 'Air Conditioning']),
        amenities: JSON.stringify(['Elevator', 'Security', 'Near Beach', 'Tech District', 'Public Transport']),
        images: JSON.stringify(['/images/barcelona-duplex-1.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      {
        title: 'Historic Mansion in Eixample with Garden',
        description: 'Magnificent historic mansion in the Eixample district. Features original modernist elements, private garden, and multiple living spaces. Perfect for luxury living.',
        propertyType: 'VILLA',
        operationType: 'SALE',
        status: 'AVAILABLE',
        address: 'Passeig de Gràcia, 89, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08008',
        latitude: 41.3954,
        longitude: 2.1612,
        bedrooms: 6,
        bathrooms: 5,
        area: 400.0,
        floor: 1,
        totalFloors: 3,
        yearBuilt: 1905,
        rentPrice: null,
        salePrice: 3500000,
        currency: 'EUR',
        features: JSON.stringify(['Private Garden', 'Historic Features', 'High Ceilings', 'Original Details', 'Multiple Living Spaces']),
        amenities: JSON.stringify(['Security', 'Parking', 'Garden', 'Near Metro', 'Luxury District']),
        images: JSON.stringify(['/images/barcelona-mansion-1.jpg', '/images/barcelona-mansion-2.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      {
        title: 'Cozy Cottage in Horta-Guinardó with Mountain Views',
        description: 'Charming cottage in the peaceful Horta-Guinardó district. Features mountain views, private garden, and traditional Catalan architecture. Ideal for nature lovers.',
        propertyType: 'HOUSE',
        operationType: 'BOTH',
        status: 'AVAILABLE',
        address: 'Carrer de Sant Genís dels Agudells, 12, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08041',
        latitude: 41.4200,
        longitude: 2.1500,
        bedrooms: 2,
        bathrooms: 1,
        area: 90.0,
        floor: 1,
        totalFloors: 1,
        yearBuilt: 1960,
        rentPrice: 1800,
        salePrice: 450000,
        currency: 'EUR',
        features: JSON.stringify(['Mountain Views', 'Private Garden', 'Traditional Style', 'Fireplace', 'Storage']),
        amenities: JSON.stringify(['Parking', 'Garden', 'Near Parks', 'Quiet Area', 'Nature']),
        images: JSON.stringify(['/images/barcelona-cottage-1.jpg']),
        isFeatured: false,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      {
        title: 'Luxury Penthouse in Diagonal Mar with Pool Access',
        description: 'Exclusive penthouse in Diagonal Mar with access to building pool and gym. Features panoramic city and sea views, modern finishes, and premium location.',
        propertyType: 'PENTHOUSE',
        operationType: 'RENT',
        status: 'AVAILABLE',
        address: 'Avinguda Diagonal, 205, 15º, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08018',
        latitude: 41.3984,
        longitude: 2.1974,
        bedrooms: 4,
        bathrooms: 3,
        area: 200.0,
        floor: 15,
        totalFloors: 15,
        yearBuilt: 2019,
        rentPrice: 4500,
        salePrice: 1500000,
        currency: 'EUR',
        features: JSON.stringify(['City Views', 'Sea Views', 'Modern Finishes', 'Air Conditioning', 'Balcony']),
        amenities: JSON.stringify(['Pool', 'Gym', 'Concierge', 'Security', 'Near Beach', 'Shopping Center']),
        images: JSON.stringify(['/images/barcelona-penthouse-diagonal-1.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      {
        title: 'Traditional Farmhouse in Sarrià-Sant Gervasi',
        description: 'Beautiful traditional farmhouse converted into a modern family home. Features large garden, original stone walls, and contemporary amenities. Perfect for families.',
        propertyType: 'HOUSE',
        operationType: 'SALE',
        status: 'AVAILABLE',
        address: 'Carrer de Sant Gervasi de Cassoles, 89, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08022',
        latitude: 41.4014,
        longitude: 2.1394,
        bedrooms: 5,
        bathrooms: 4,
        area: 280.0,
        floor: 1,
        totalFloors: 2,
        yearBuilt: 1890,
        rentPrice: null,
        salePrice: 1200000,
        currency: 'EUR',
        features: JSON.stringify(['Large Garden', 'Stone Walls', 'Original Features', 'Modern Kitchen', 'Multiple Living Spaces']),
        amenities: JSON.stringify(['Garden', 'Parking', 'Near Schools', 'Quiet Area', 'Nature']),
        images: JSON.stringify(['/images/barcelona-farmhouse-1.jpg', '/images/barcelona-farmhouse-2.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      {
        title: 'Contemporary House in Sant Andreu with Solar Panels',
        description: 'Modern eco-friendly house in Sant Andreu district. Features solar panels, energy-efficient design, and sustainable materials. Perfect for environmentally conscious buyers.',
        propertyType: 'HOUSE',
        operationType: 'BOTH',
        status: 'AVAILABLE',
        address: 'Carrer de Sant Adrià, 45, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08030',
        latitude: 41.4300,
        longitude: 2.1900,
        bedrooms: 3,
        bathrooms: 2,
        area: 150.0,
        floor: 1,
        totalFloors: 2,
        yearBuilt: 2021,
        rentPrice: 2500,
        salePrice: 680000,
        currency: 'EUR',
        features: JSON.stringify(['Solar Panels', 'Eco-Friendly', 'Modern Design', 'Air Conditioning', 'Insulation']),
        amenities: JSON.stringify(['Parking', 'Garden', 'Near Metro', 'Sustainable', 'Modern']),
        images: JSON.stringify(['/images/barcelona-eco-house-1.jpg']),
        isFeatured: false,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      {
        title: 'Art Deco Apartment in L\'Eixample with Original Details',
        description: 'Stunning Art Deco apartment in L\'Eixample with original architectural details. Features high ceilings, original tiles, and period furniture. Perfect for design enthusiasts.',
        propertyType: 'APARTMENT',
        operationType: 'RENT',
        status: 'AVAILABLE',
        address: 'Carrer de València, 156, 3º, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08011',
        latitude: 41.3954,
        longitude: 2.1612,
        bedrooms: 2,
        bathrooms: 1,
        area: 85.0,
        floor: 3,
        totalFloors: 5,
        yearBuilt: 1930,
        rentPrice: 2200,
        salePrice: 650000,
        currency: 'EUR',
        features: JSON.stringify(['Art Deco Style', 'Original Details', 'High Ceilings', 'Period Features', 'Original Tiles']),
        amenities: JSON.stringify(['Elevator', 'Near Metro', 'Cultural District', 'Design District', 'Historic']),
        images: JSON.stringify(['/images/barcelona-artdeco-1.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      {
        title: 'Modern Townhouse in Sants with Private Garage',
        description: 'Contemporary townhouse in Sants district with private garage and small garden. Features modern design, open-plan living, and excellent transport connections.',
        propertyType: 'HOUSE',
        operationType: 'SALE',
        status: 'AVAILABLE',
        address: 'Carrer de Sants, 89, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08014',
        latitude: 41.3750,
        longitude: 2.1300,
        bedrooms: 3,
        bathrooms: 2,
        area: 120.0,
        floor: 1,
        totalFloors: 3,
        yearBuilt: 2018,
        rentPrice: null,
        salePrice: 750000,
        currency: 'EUR',
        features: JSON.stringify(['Private Garage', 'Small Garden', 'Modern Design', 'Open Plan', 'Air Conditioning']),
        amenities: JSON.stringify(['Garage', 'Garden', 'Near Metro', 'Transport Hub', 'Modern']),
        images: JSON.stringify(['/images/barcelona-townhouse-sants-1.jpg']),
        isFeatured: false,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      },
      {
        title: 'Luxury Villa in Pedralbes with Tennis Court',
        description: 'Exclusive villa in Pedralbes with private tennis court and swimming pool. Features panoramic city views, multiple terraces, and luxury finishes throughout.',
        propertyType: 'VILLA',
        operationType: 'SALE',
        status: 'AVAILABLE',
        address: 'Avinguda de Pedralbes, 78, Barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        postalCode: '08034',
        latitude: 41.3902,
        longitude: 2.1139,
        bedrooms: 6,
        bathrooms: 5,
        area: 450.0,
        floor: 1,
        totalFloors: 2,
        yearBuilt: 2020,
        rentPrice: null,
        salePrice: 3200000,
        currency: 'EUR',
        features: JSON.stringify(['Tennis Court', 'Swimming Pool', 'City Views', 'Multiple Terraces', 'Luxury Finishes']),
        amenities: JSON.stringify(['Tennis Court', 'Pool', 'Garden', 'Security', 'Parking', 'Luxury']),
        images: JSON.stringify(['/images/barcelona-villa-tennis-1.jpg', '/images/barcelona-villa-tennis-2.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: barcelona.id,
      }
    ];

    // Madrid Properties
    const madridProperties = [
      {
        title: 'Luxury Apartment in Salamanca District',
        description: 'Elegant 4-bedroom apartment in the prestigious Salamanca district. Features high ceilings, original details, and modern amenities. Perfect for luxury living.',
        propertyType: 'APARTMENT',
        operationType: 'BOTH',
        status: 'AVAILABLE',
        address: 'Calle de Serrano, 45, 3º, Madrid',
        city: 'Madrid',
        state: 'Community of Madrid',
        country: 'Spain',
        postalCode: '28001',
        latitude: 40.4300,
        longitude: -3.6800,
        bedrooms: 4,
        bathrooms: 3,
        area: 150.0,
        floor: 3,
        totalFloors: 6,
        yearBuilt: 1920,
        rentPrice: 3500,
        salePrice: 1200000,
        currency: 'EUR',
        features: JSON.stringify(['High Ceilings', 'Original Details', 'Air Conditioning', 'Hardwood Floors', 'Balcony']),
        amenities: JSON.stringify(['Elevator', 'Concierge', 'Security', 'Near Metro', 'Shopping District']),
        images: JSON.stringify(['/images/madrid-salamanca-1.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent2.id,
        locationId: madrid.id,
      },
      {
        title: 'Modern Office Space in Gran Vía',
        description: 'Contemporary office space in the heart of Gran Vía. Features open plan layout, meeting rooms, and excellent transport connections. Perfect for businesses.',
        propertyType: 'OFFICE',
        operationType: 'RENT',
        status: 'AVAILABLE',
        address: 'Gran Vía, 28, 5º, Madrid',
        city: 'Madrid',
        state: 'Community of Madrid',
        country: 'Spain',
        postalCode: '28013',
        latitude: 40.4200,
        longitude: -3.7000,
        bedrooms: 0,
        bathrooms: 2,
        area: 200.0,
        floor: 5,
        totalFloors: 8,
        yearBuilt: 2018,
        rentPrice: 5500,
        salePrice: 800000,
        currency: 'EUR',
        features: JSON.stringify(['Open Plan', 'Meeting Rooms', 'Air Conditioning', 'High-Speed Internet', 'Kitchenette']),
        amenities: JSON.stringify(['Elevator', 'Security', 'Near Metro', 'Business District', 'Parking']),
        images: JSON.stringify(['/images/madrid-office-1.jpg']),
        isFeatured: false,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent3.id,
        locationId: madrid.id,
      },
      {
        title: 'Historic House in Malasaña',
        description: 'Charming historic house in the trendy Malasaña district. Features original architectural details, private patio, and modern amenities. Perfect for creative professionals.',
        propertyType: 'HOUSE',
        operationType: 'BOTH',
        status: 'AVAILABLE',
        address: 'Calle de San Andrés, 12, Madrid',
        city: 'Madrid',
        state: 'Community of Madrid',
        country: 'Spain',
        postalCode: '28004',
        latitude: 40.4300,
        longitude: -3.7000,
        bedrooms: 3,
        bathrooms: 2,
        area: 120.0,
        floor: 1,
        totalFloors: 3,
        yearBuilt: 1880,
        rentPrice: 2800,
        salePrice: 750000,
        currency: 'EUR',
        features: JSON.stringify(['Historic Details', 'Private Patio', 'Original Features', 'High Ceilings', 'Modern Kitchen']),
        amenities: JSON.stringify(['Near Metro', 'Cultural District', 'Restaurants', 'Bars', 'Creative Hub']),
        images: JSON.stringify(['/images/madrid-malasana-1.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: madrid.id,
      }
    ];

    // Valencia Properties
    const valenciaProperties = [
      {
        title: 'Beachfront Apartment in Valencia with Sea Views',
        description: 'Stunning 3-bedroom apartment with panoramic sea views. Located just steps from the beach in Valencia\'s most desirable area.',
        propertyType: 'APARTMENT',
        operationType: 'BOTH',
        status: 'AVAILABLE',
        address: 'Paseo de Neptuno, 45, 8º, Valencia',
        city: 'Valencia',
        state: 'Valencian Community',
        country: 'Spain',
        postalCode: '46011',
        latitude: 39.4600,
        longitude: -0.3200,
        bedrooms: 3,
        bathrooms: 2,
        area: 110.0,
        floor: 8,
        totalFloors: 10,
        yearBuilt: 2019,
        rentPrice: 2200,
        salePrice: 650000,
        currency: 'EUR',
        features: JSON.stringify(['Sea Views', 'Balcony', 'Air Conditioning', 'Modern Kitchen', 'Furnished']),
        amenities: JSON.stringify(['Elevator', 'Security', 'Near Beach', 'Restaurants', 'Public Transport']),
        images: JSON.stringify(['/images/valencia-beach-1.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: valencia.id,
      },
      {
        title: 'Modern House in Ruzafa District',
        description: 'Contemporary house in the trendy Ruzafa district. Features modern design, private garden, and excellent location near the city center.',
        propertyType: 'HOUSE',
        operationType: 'SALE',
        status: 'AVAILABLE',
        address: 'Calle de Cuba, 23, Valencia',
        city: 'Valencia',
        state: 'Valencian Community',
        country: 'Spain',
        postalCode: '46006',
        latitude: 39.4700,
        longitude: -0.3700,
        bedrooms: 4,
        bathrooms: 3,
        area: 180.0,
        floor: 1,
        totalFloors: 2,
        yearBuilt: 2020,
        rentPrice: null,
        salePrice: 850000,
        currency: 'EUR',
        features: JSON.stringify(['Private Garden', 'Modern Design', 'Air Conditioning', 'Open Plan', 'Storage']),
        amenities: JSON.stringify(['Garden', 'Parking', 'Near Metro', 'Restaurants', 'Cultural District']),
        images: JSON.stringify(['/images/valencia-ruzafa-1.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: valencia.id,
      }
    ];

    // Seville Properties
    const sevilleProperties = [
      {
        title: 'Historic Apartment in Santa Cruz Quarter',
        description: 'Beautiful historic apartment in the heart of Santa Cruz quarter. Features original Andalusian architecture, courtyard, and traditional details.',
        propertyType: 'APARTMENT',
        operationType: 'RENT',
        status: 'AVAILABLE',
        address: 'Calle de Santa María la Blanca, 8, 2º, Seville',
        city: 'Seville',
        state: 'Andalusia',
        country: 'Spain',
        postalCode: '41004',
        latitude: 37.3900,
        longitude: -5.9900,
        bedrooms: 2,
        bathrooms: 1,
        area: 75.0,
        floor: 2,
        totalFloors: 3,
        yearBuilt: 1850,
        rentPrice: 1500,
        salePrice: 450000,
        currency: 'EUR',
        features: JSON.stringify(['Historic Architecture', 'Courtyard', 'Original Details', 'High Ceilings', 'Traditional Style']),
        amenities: JSON.stringify(['Near Cathedral', 'Historic District', 'Restaurants', 'Cultural Sites', 'Tourist Area']),
        images: JSON.stringify(['/images/seville-santa-cruz-1.jpg']),
        isFeatured: true,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: seville.id,
      }
    ];

    // Bilbao Properties
    const bilbaoProperties = [
      {
        title: 'Modern Apartment in Abando District',
        description: 'Contemporary apartment in Bilbao\'s business district. Features modern design, excellent amenities, and close to the Guggenheim Museum.',
        propertyType: 'APARTMENT',
        operationType: 'BOTH',
        status: 'AVAILABLE',
        address: 'Calle de Iparraguirre, 45, 6º, Bilbao',
        city: 'Bilbao',
        state: 'Basque Country',
        country: 'Spain',
        postalCode: '48009',
        latitude: 43.2600,
        longitude: -2.9200,
        bedrooms: 3,
        bathrooms: 2,
        area: 95.0,
        floor: 6,
        totalFloors: 8,
        yearBuilt: 2017,
        rentPrice: 1800,
        salePrice: 520000,
        currency: 'EUR',
        features: JSON.stringify(['Modern Design', 'Air Conditioning', 'Balcony', 'Parking Space', 'Storage']),
        amenities: JSON.stringify(['Elevator', 'Security', 'Near Guggenheim', 'Business District', 'Public Transport']),
        images: JSON.stringify(['/images/bilbao-abando-1.jpg']),
        isFeatured: false,
        isVerified: true,
        ownerId: owner1.id,
        agentId: agent1.id,
        locationId: bilbao.id,
      }
    ];

    // Combine all properties
    const allProperties = [...properties, ...madridProperties, ...valenciaProperties, ...sevilleProperties, ...bilbaoProperties];

    for (const propertyData of allProperties) {
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

    const madridApartment = await prisma.property.findFirst({
      where: { title: 'Luxury Apartment in Salamanca District' },
    });

    const valenciaApartment = await prisma.property.findFirst({
      where: { title: 'Beachfront Apartment in Valencia with Sea Views' },
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

      await prisma.propertyReservation.create({
        data: {
          propertyId: apartment.id,
          userId: buyer2.id,
          operationType: 'RENT',
          startDate: new Date('2024-09-01'),
          endDate: new Date('2024-12-01'),
          moveInDate: new Date('2024-09-01'),
          moveOutDate: new Date('2024-12-01'),
          totalPrice: 8400,
          monthlyRent: 2800,
          deposit: 2800,
          currency: 'EUR',
          status: 'PENDING',
          notes: 'Short-term rental for 3 months',
        },
      });
    }

    if (madridApartment) {
      await prisma.propertyReservation.create({
        data: {
          propertyId: madridApartment.id,
          userId: buyer3.id,
          operationType: 'RENT',
          startDate: new Date('2024-03-01'),
          endDate: new Date('2024-09-01'),
          moveInDate: new Date('2024-03-01'),
          moveOutDate: new Date('2024-09-01'),
          totalPrice: 21000,
          monthlyRent: 3500,
          deposit: 7000,
          currency: 'EUR',
          status: 'CONFIRMED',
          notes: 'Luxury apartment rental in Madrid',
        },
      });
    }

    if (valenciaApartment) {
      await prisma.propertyReservation.create({
        data: {
          propertyId: valenciaApartment.id,
          userId: buyer2.id,
          operationType: 'RENT',
          startDate: new Date('2024-06-01'),
          endDate: new Date('2024-08-01'),
          moveInDate: new Date('2024-06-01'),
          moveOutDate: new Date('2024-08-01'),
          totalPrice: 4400,
          monthlyRent: 2200,
          deposit: 2200,
          currency: 'EUR',
          status: 'CONFIRMED',
          notes: 'Summer rental by the beach',
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

      await prisma.propertyReview.create({
        data: {
          propertyId: apartment.id,
          userId: buyer2.id,
          rating: 4,
          title: 'Great location and modern amenities',
          comment: 'Perfect for digital nomads. Fast internet, modern kitchen, and excellent location. The building is well maintained and secure.',
          cleanliness: 5,
          location: 5,
          value: 4,
          communication: 4,
          isVerified: true,
          helpfulVotes: 1,
        },
      });
    }

    if (madridApartment) {
      await prisma.propertyReview.create({
        data: {
          propertyId: madridApartment.id,
          userId: buyer3.id,
          rating: 5,
          title: 'Luxury living in the heart of Madrid',
          comment: 'Exceptional apartment in Salamanca district. High ceilings, original details, and modern amenities. Perfect for business professionals.',
          cleanliness: 5,
          location: 5,
          value: 5,
          communication: 5,
          isVerified: true,
          helpfulVotes: 2,
        },
      });
    }

    if (valenciaApartment) {
      await prisma.propertyReview.create({
        data: {
          propertyId: valenciaApartment.id,
          userId: buyer2.id,
          rating: 5,
          title: 'Perfect beachfront location',
          comment: 'Stunning sea views and just steps from the beach. Modern apartment with all amenities. Great for summer stays.',
          cleanliness: 5,
          location: 5,
          value: 4,
          communication: 5,
          isVerified: true,
          helpfulVotes: 4,
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

      await prisma.propertyAIMemory.create({
        data: {
          propertyId: apartment.id,
          replicaId: 'test-replica-2',
          memoryType: 'PREFERENCE',
          title: 'Digital Nomad Requirements',
          content: 'Client needs reliable internet, quiet workspace, and proximity to cafes and co-working spaces',
          context: {
            budget: 2500,
            workRequirements: ['fast internet', 'quiet space', 'near cafes'],
            lifestyle: 'digital nomad',
          },
          importance: 7,
          isActive: true,
        },
      });
    }

    if (madridApartment) {
      await prisma.propertyAIMemory.create({
        data: {
          propertyId: madridApartment.id,
          replicaId: 'test-replica-3',
          memoryType: 'PREFERENCE',
          title: 'Luxury Client Profile',
          content: 'High-end client looking for luxury properties in prestigious districts with premium amenities',
          context: {
            budget: 5000,
            preferredAreas: ['Salamanca', 'Chamberí', 'Retiro'],
            requirements: ['luxury finishes', 'concierge', 'parking', 'security'],
          },
          importance: 9,
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

    await prisma.propertySearch.create({
      data: {
        userId: buyer2.id,
        query: 'modern apartment madrid digital nomad',
        propertyTypes: JSON.stringify(['APARTMENT', 'STUDIO']),
        operationType: 'RENT',
        minPrice: 1000,
        maxPrice: 2500,
        minArea: 40,
        maxArea: 80,
        bedrooms: 1,
        city: 'Madrid',
        resultCount: 5,
        isSaved: true,
      },
    });

    await prisma.propertySearch.create({
      data: {
        userId: buyer3.id,
        query: 'luxury villa barcelona sale',
        propertyTypes: JSON.stringify(['VILLA', 'MANSION']),
        operationType: 'SALE',
        minPrice: 2000000,
        maxPrice: 5000000,
        minArea: 300,
        maxArea: 600,
        bedrooms: 5,
        city: 'Barcelona',
        resultCount: 3,
        isSaved: true,
      },
    });

    await prisma.propertySearch.create({
      data: {
        userId: buyer2.id,
        query: 'beachfront valencia apartment',
        propertyTypes: JSON.stringify(['APARTMENT']),
        operationType: 'BOTH',
        minPrice: 1500,
        maxPrice: 3000,
        minArea: 80,
        maxArea: 150,
        bedrooms: 2,
        city: 'Valencia',
        resultCount: 4,
        isSaved: false,
      },
    });

    await prisma.propertySearch.create({
      data: {
        userId: buyer1.id,
        query: 'office space madrid business',
        propertyTypes: JSON.stringify(['OFFICE']),
        operationType: 'RENT',
        minPrice: 2000,
        maxPrice: 8000,
        minArea: 100,
        maxArea: 300,
        bedrooms: 0,
        city: 'Madrid',
        resultCount: 2,
        isSaved: true,
      },
    });

    console.log('✅ Search queries created');

    // Создание избранного
    console.log('❤️ Creating favorites...');
    
    const luxuryApartment = await prisma.property.findFirst({
      where: { title: 'Luxury Apartment in Eixample with Sagrada Familia View' },
    });

    const penthouse = await prisma.property.findFirst({
      where: { title: 'Stunning Penthouse with Sea Views in Poblenou' },
    });

    const villa = await prisma.property.findFirst({
      where: { title: 'Luxury Villa in Pedralbes with Pool' },
    });

    if (luxuryApartment) {
      await prisma.propertyFavorite.create({
        data: {
          userId: buyer1.id,
          propertyId: luxuryApartment.id,
        },
      });

      await prisma.propertyFavorite.create({
        data: {
          userId: buyer2.id,
          propertyId: luxuryApartment.id,
        },
      });
    }

    if (penthouse) {
      await prisma.propertyFavorite.create({
        data: {
          userId: buyer3.id,
          propertyId: penthouse.id,
        },
      });
    }

    if (villa) {
      await prisma.propertyFavorite.create({
        data: {
          userId: buyer3.id,
          propertyId: villa.id,
        },
      });
    }

    console.log('✅ Favorites created');

    console.log('🎉 Database successfully initialized!');
    console.log('\n📊 Created:');
    console.log(`- ${await prisma.user.count()} users`);
    console.log(`- ${await prisma.location.count()} locations`);
    console.log(`- ${await prisma.property.count()} properties`);
    console.log(`- ${await prisma.propertyReservation.count()} reservations`);
    console.log(`- ${await prisma.propertyReview.count()} reviews`);
    console.log(`- ${await prisma.propertyAIMemory.count()} AI memories`);
    console.log(`- ${await prisma.propertySearch.count()} search queries`);
    console.log(`- ${await prisma.propertyFavorite.count()} favorites`);

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
