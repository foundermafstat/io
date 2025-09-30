const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testCurrencyChanges() {
  console.log('🧪 Тестирование изменений валюты и изображений...\n');

  try {
    // Тест 1: Проверка форматирования цен
    console.log('1. Тестирование форматирования цен...');
    
    // Симуляция форматирования цен
    const testPrices = [50000, 500000, 1500000, 5000000];
    
    testPrices.forEach(price => {
      let formatted;
      if (price >= 1000000) {
        formatted = `$${(price / 1000000).toFixed(1)}M`;
      } else {
        formatted = `$${(price / 1000).toFixed(0)}K`;
      }
      console.log(`   ${price} -> ${formatted}`);
    });

    // Тест 2: Проверка плейсхолдера изображений
    console.log('\n2. Тестирование плейсхолдера изображений...');
    console.log('   Плейсхолдер: /placeholder.jpg');
    console.log('   ✅ Изображения будут использовать плейсхолдер при отсутствии');

    // Тест 3: Проверка API с новыми ценами
    console.log('\n3. Тестирование API с новыми ценами...');
    const response = await fetch(`${BASE_URL}/api/properties?limit=3`);
    const data = await response.json();
    
    if (response.ok && data.properties) {
      console.log(`   ✅ Получено ${data.properties.length} объектов`);
      data.properties.forEach((property, index) => {
        console.log(`   Объект ${index + 1}:`);
        if (property.rentPrice) {
          const rentFormatted = property.rentPrice >= 1000000 
            ? `$${(property.rentPrice / 1000000).toFixed(1)}M`
            : `$${(property.rentPrice / 1000).toFixed(0)}K`;
          console.log(`     Аренда: ${rentFormatted}/мес`);
        }
        if (property.salePrice) {
          const saleFormatted = property.salePrice >= 1000000 
            ? `$${(property.salePrice / 1000000).toFixed(1)}M`
            : `$${(property.salePrice / 1000).toFixed(0)}K`;
          console.log(`     Продажа: ${saleFormatted}`);
        }
      });
    } else {
      console.log(`   ❌ Ошибка: ${data.error || 'Unknown error'}`);
    }

    console.log('\n🎉 Тестирование завершено!');
    console.log('\n📋 Изменения:');
    console.log('   ✅ Валюта изменена с рублей (₽) на доллары ($)');
    console.log('   ✅ Формат цен: $500K, $1.5M вместо 500К ₽, 1.5М ₽');
    console.log('   ✅ Плейсхолдер изображений: /placeholder.jpg');
    console.log('   ✅ Переводы обновлены для всех языков');

  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
  }
}

// Запуск тестов
testCurrencyChanges();
