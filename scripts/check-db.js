const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔍 Checking database content...');
    
    // Проверяем количество записей в каждой таблице
    const userCount = await prisma.user.count();
    const locationCount = await prisma.location.count();
    const propertyCount = await prisma.property.count();
    const reservationCount = await prisma.propertyReservation.count();
    const reviewCount = await prisma.propertyReview.count();
    const memoryCount = await prisma.propertyAIMemory.count();
    const searchCount = await prisma.propertySearch.count();
    const favoriteCount = await prisma.propertyFavorite.count();
    
    console.log('\n📊 Database Statistics:');
    console.log(`- Users: ${userCount}`);
    console.log(`- Locations: ${locationCount}`);
    console.log(`- Properties: ${propertyCount}`);
    console.log(`- Reservations: ${reservationCount}`);
    console.log(`- Reviews: ${reviewCount}`);
    console.log(`- AI Memories: ${memoryCount}`);
    console.log(`- Search Queries: ${searchCount}`);
    console.log(`- Favorites: ${favoriteCount}`);
    
    if (propertyCount > 0) {
      console.log('\n🏠 Sample Properties:');
      const sampleProperties = await prisma.property.findMany({
        take: 5,
        select: {
          id: true,
          title: true,
          city: true,
          propertyType: true,
          operationType: true,
          rentPrice: true,
          salePrice: true,
          currency: true
        }
      });
      
      sampleProperties.forEach((prop, index) => {
        console.log(`${index + 1}. ${prop.title}`);
        console.log(`   City: ${prop.city} | Type: ${prop.propertyType} | Operation: ${prop.operationType}`);
        if (prop.rentPrice) console.log(`   Rent: ${prop.rentPrice} ${prop.currency}/month`);
        if (prop.salePrice) console.log(`   Sale: ${prop.salePrice} ${prop.currency}`);
        console.log('');
      });
    }
    
    if (userCount > 0) {
      console.log('\n👥 Sample Users:');
      const sampleUsers = await prisma.user.findMany({
        take: 3,
        select: {
          id: true,
          name: true,
          email: true,
          isAgent: true,
          isVerified: true
        }
      });
      
      sampleUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email})`);
        console.log(`   Agent: ${user.isAgent} | Verified: ${user.isVerified}`);
      });
    }
    
    console.log('\n✅ Database check completed!');
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
