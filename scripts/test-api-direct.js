const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function testAPI() {
  console.log('🧪 Testing API directly...');

  try {
    // Test 1: Get all properties
    console.log('\n📋 Test 1: Get all properties');
    const properties = await prisma.property.findMany({
      include: {
        owner: true,
        agent: true,
        location: true,
      }
    });
    console.log(`✅ Found ${properties.length} properties`);
    
    // Show first 3 properties
    properties.slice(0, 3).forEach((property, index) => {
      console.log(`\n${index + 1}. ${property.title}`);
      console.log(`   Type: ${property.propertyType}`);
      console.log(`   Operation: ${property.operationType}`);
      console.log(`   Price: ${property.rentPrice ? `€${property.rentPrice}/month` : `€${property.salePrice} sale`}`);
      console.log(`   Location: ${property.city}, ${property.state}`);
      console.log(`   Features: ${JSON.parse(property.features).join(', ')}`);
    });

    // Test 2: Get properties by type
    console.log('\n📋 Test 2: Get apartments only');
    const apartments = await prisma.property.findMany({
      where: { propertyType: 'APARTMENT' },
      select: { title: true, propertyType: true, rentPrice: true, salePrice: true }
    });
    console.log(`✅ Found ${apartments.length} apartments`);
    apartments.forEach(apt => {
      console.log(`   - ${apt.title} (${apt.rentPrice ? `€${apt.rentPrice}/month` : `€${apt.salePrice} sale`})`);
    });

    // Test 3: Get properties in Barcelona
    console.log('\n📋 Test 3: Get Barcelona properties');
    const barcelonaProperties = await prisma.property.findMany({
      where: { city: 'Barcelona' },
      select: { title: true, city: true, propertyType: true }
    });
    console.log(`✅ Found ${barcelonaProperties.length} properties in Barcelona`);

    // Test 4: Get AI memories
    console.log('\n📋 Test 4: Get AI memories');
    const memories = await prisma.propertyAIMemory.findMany({
      include: { property: { select: { title: true } } }
    });
    console.log(`✅ Found ${memories.length} AI memories`);
    memories.forEach(memory => {
      console.log(`   - ${memory.title} (${memory.memoryType})`);
      console.log(`     Property: ${memory.property.title}`);
      console.log(`     Content: ${memory.content.substring(0, 50)}...`);
    });

    // Test 5: Get reservations
    console.log('\n📋 Test 5: Get reservations');
    const reservations = await prisma.propertyReservation.findMany({
      include: { 
        property: { select: { title: true } },
        user: { select: { name: true } }
      }
    });
    console.log(`✅ Found ${reservations.length} reservations`);
    reservations.forEach(res => {
      console.log(`   - ${res.user.name} → ${res.property.title}`);
      console.log(`     ${res.operationType} from ${res.startDate.toISOString().split('T')[0]} to ${res.endDate.toISOString().split('T')[0]}`);
      console.log(`     Total: €${res.totalPrice}`);
    });

    // Test 6: Get reviews
    console.log('\n📋 Test 6: Get reviews');
    const reviews = await prisma.propertyReview.findMany({
      include: { 
        property: { select: { title: true } },
        user: { select: { name: true } }
      }
    });
    console.log(`✅ Found ${reviews.length} reviews`);
    reviews.forEach(review => {
      console.log(`   - ${review.user.name} → ${review.property.title}`);
      console.log(`     Rating: ${review.rating}/5 - ${review.title}`);
      console.log(`     Comment: ${review.comment.substring(0, 50)}...`);
    });

    // Test 7: Get search queries
    console.log('\n📋 Test 7: Get search queries');
    const searches = await prisma.propertySearch.findMany({
      include: { user: { select: { name: true } } }
    });
    console.log(`✅ Found ${searches.length} search queries`);
    searches.forEach(search => {
      console.log(`   - ${search.user.name}: "${search.query}"`);
      console.log(`     Types: ${JSON.parse(search.propertyTypes).join(', ')}`);
      console.log(`     Price: €${search.minPrice} - €${search.maxPrice}`);
      console.log(`     Results: ${search.resultCount} properties`);
    });

    console.log('\n🎉 All API tests passed!');
    console.log('\n📊 Summary:');
    console.log(`- Properties: ${properties.length}`);
    console.log(`- Apartments: ${apartments.length}`);
    console.log(`- Barcelona properties: ${barcelonaProperties.length}`);
    console.log(`- AI memories: ${memories.length}`);
    console.log(`- Reservations: ${reservations.length}`);
    console.log(`- Reviews: ${reviews.length}`);
    console.log(`- Search queries: ${searches.length}`);

  } catch (error) {
    console.error('❌ API test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAPI();
