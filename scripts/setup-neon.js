const fs = require('fs');
const path = require('path');

console.log('🌩️ Настройка Neon.tech для системы недвижимости...');

try {
  // Проверяем наличие .env файла
  const envPath = path.join(__dirname, '..', '.env');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Создаем .env файл с примером для Neon
  const neonEnvContent = `# Neon.tech Database
# Замените на вашу реальную строку подключения из Neon Dashboard
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OpenAI
OPENAI_API_KEY="your-openai-api-key-here"

# Sensay API
SENSAY_API_KEY="your-sensay-api-key-here"
`;
  
  // Обновляем .env файл
  if (envContent.includes('file:./dev.db')) {
    // Заменяем SQLite на Neon
    const updatedEnv = envContent.replace(
      /DATABASE_URL="file:\.\/dev\.db"/,
      'DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"'
    );
    fs.writeFileSync(envPath, updatedEnv);
    console.log('✅ Обновлен .env файл для Neon.tech');
  } else if (!envContent.includes('neon.tech')) {
    // Добавляем Neon конфигурацию
    fs.writeFileSync(envPath, neonEnvContent);
    console.log('✅ Создан .env файл для Neon.tech');
  } else {
    console.log('✅ .env файл уже настроен для Neon.tech');
  }
  
  // Создаем .env.example для команды
  const exampleEnvPath = path.join(__dirname, '..', '.env.example');
  fs.writeFileSync(exampleEnvPath, neonEnvContent);
  console.log('✅ Создан .env.example файл');
  
  console.log('\n🚀 Следующие шаги:');
  console.log('1. Создайте проект на https://neon.tech');
  console.log('2. Скопируйте строку подключения из Neon Dashboard');
  console.log('3. Обновите DATABASE_URL в .env файле');
  console.log('4. Выполните команды:');
  console.log('   npx prisma generate');
  console.log('   npx prisma db push');
  console.log('   node scripts/init-property-db.js');
  
  console.log('\n📋 Строка подключения должна выглядеть так:');
  console.log('postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require');
  
  console.log('\n🔧 Преимущества Neon.tech:');
  console.log('✅ Облачная PostgreSQL база данных');
  console.log('✅ Автоматическое масштабирование');
  console.log('✅ Высокая доступность (99.9%)');
  console.log('✅ Автоматические бэкапы');
  console.log('✅ SSL/TLS шифрование');
  console.log('✅ Веб-консоль для управления');
  
} catch (error) {
  console.error('❌ Ошибка при настройке Neon.tech:', error);
  process.exit(1);
}
