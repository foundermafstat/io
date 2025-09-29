const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up local test environment...');

try {
  // Create .env file for local testing
  const envContent = `# Local SQLite Database for testing
DATABASE_URL="file:./dev.db"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="test-secret-key"

# OpenAI
OPENAI_API_KEY="test-openai-key"

# Sensay API
SENSAY_API_KEY="test-sensay-key"
`;

  // Write .env file
  fs.writeFileSync('.env', envContent);
  console.log('✅ Created .env file for local testing');

  // Update Prisma schema for SQLite
  const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
  let schemaContent = fs.readFileSync(schemaPath, 'utf8');
  
  // Change to SQLite and update array fields to Json
  schemaContent = schemaContent.replace(
    /provider = "postgresql"/,
    'provider = "sqlite"'
  );
  schemaContent = schemaContent.replace(
    /url      = env\("DATABASE_URL"\)/,
    'url      = "file:./dev.db"'
  );
  
  // Update array fields to Json for SQLite compatibility
  schemaContent = schemaContent.replace(
    /features          String\[\]/g,
    'features          Json'
  );
  schemaContent = schemaContent.replace(
    /amenities         String\[\]/g,
    'amenities         Json'
  );
  schemaContent = schemaContent.replace(
    /images            String\[\]/g,
    'images            Json'
  );
  schemaContent = schemaContent.replace(
    /propertyTypes     PropertyType\[\]/g,
    'propertyTypes     Json'
  );
  schemaContent = schemaContent.replace(
    /languages         String\[\]/g,
    'languages         Json'
  );
  schemaContent = schemaContent.replace(
    /specialties       String\[\]/g,
    'specialties       Json'
  );

  // Write updated schema
  fs.writeFileSync(schemaPath, schemaContent);
  console.log('✅ Updated Prisma schema for SQLite');

  console.log('\n🚀 Next steps:');
  console.log('1. Generate Prisma client: npx prisma generate');
  console.log('2. Apply schema: npx prisma db push');
  console.log('3. Initialize data: node scripts/init-property-db.js');
  console.log('4. Start server: npm run dev');
  
  console.log('\n📋 This will create a local SQLite database with:');
  console.log('- 10 Barcelona properties');
  console.log('- 3 users (owner, agent, buyer)');
  console.log('- 2 locations (Barcelona, Madrid)');
  console.log('- 1 reservation with realistic data');
  console.log('- 1 review with 5-star rating');
  console.log('- 2 AI memories with context');
  console.log('- 1 search query saved');

} catch (error) {
  console.error('❌ Error setting up local test environment:', error);
  process.exit(1);
}
