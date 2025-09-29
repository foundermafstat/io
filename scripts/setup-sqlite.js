const fs = require('fs');
const path = require('path');

console.log('🔧 Настройка SQLite для тестирования...');

try {
  // Копируем SQLite схему как основную
  const sqliteSchemaPath = path.join(__dirname, '..', 'prisma', 'schema-sqlite.prisma');
  const mainSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
  const backupSchemaPath = path.join(__dirname, '..', 'prisma', 'schema-postgresql.prisma');
  
  // Создаем бэкап PostgreSQL схемы
  if (fs.existsSync(mainSchemaPath)) {
    fs.copyFileSync(mainSchemaPath, backupSchemaPath);
    console.log('✅ Создан бэкап PostgreSQL схемы');
  }
  
  // Копируем SQLite схему как основную
  fs.copyFileSync(sqliteSchemaPath, mainSchemaPath);
  console.log('✅ Установлена SQLite схема');
  
  // Создаем .env файл для SQLite
  const envContent = `# Database (SQLite)
DATABASE_URL="file:./dev.db"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OpenAI
OPENAI_API_KEY="your-openai-api-key-here"

# Sensay API
SENSAY_API_KEY="your-sensay-api-key-here"
`;
  
  const envPath = path.join(__dirname, '..', '.env');
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Создан .env файл для SQLite');
  
  console.log('\n🚀 Теперь выполните:');
  console.log('npx prisma generate');
  console.log('npx prisma db push');
  console.log('node scripts/init-property-db.js');
  
  console.log('\n📝 Для возврата к PostgreSQL:');
  console.log('mv prisma/schema-postgresql.prisma prisma/schema.prisma');
  console.log('И обновите .env с правильным DATABASE_URL');
  
} catch (error) {
  console.error('❌ Ошибка при настройке SQLite:', error);
  process.exit(1);
}
