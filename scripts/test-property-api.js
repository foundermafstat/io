const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testPropertyAPI() {
  console.log('🧪 Тестирование API объектов недвижимости...\n');

  try {
    // Тест 1: Получение списка объектов
    console.log('1. Тестирование получения списка объектов...');
    const propertiesResponse = await fetch(`${BASE_URL}/api/properties?limit=5`);
    const propertiesData = await propertiesResponse.json();
    
    if (propertiesResponse.ok) {
      console.log(`✅ Получено ${propertiesData.properties?.length || 0} объектов`);
      console.log(`   Всего объектов: ${propertiesData.totalCount || 0}`);
    } else {
      console.log(`❌ Ошибка: ${propertiesData.error}`);
    }

    // Тест 2: Получение списка городов
    console.log('\n2. Тестирование получения списка городов...');
    const citiesResponse = await fetch(`${BASE_URL}/api/properties/cities`);
    const citiesData = await citiesResponse.json();
    
    if (citiesResponse.ok) {
      console.log(`✅ Получено ${citiesData.cities?.length || 0} городов`);
      console.log(`   Города: ${citiesData.cities?.slice(0, 5).join(', ')}...`);
    } else {
      console.log(`❌ Ошибка: ${citiesData.error}`);
    }

    // Тест 3: Поиск с фильтрами
    console.log('\n3. Тестирование поиска с фильтрами...');
    const searchResponse = await fetch(`${BASE_URL}/api/properties?operationType=RENT&city=Москва&limit=3`);
    const searchData = await searchResponse.json();
    
    if (searchResponse.ok) {
      console.log(`✅ Найдено ${searchData.properties?.length || 0} объектов в аренду в Москве`);
    } else {
      console.log(`❌ Ошибка: ${searchData.error}`);
    }

    // Тест 4: Получение конкретного объекта (если есть)
    if (propertiesData.properties && propertiesData.properties.length > 0) {
      const firstProperty = propertiesData.properties[0];
      console.log(`\n4. Тестирование получения объекта ${firstProperty.id}...`);
      
      const propertyResponse = await fetch(`${BASE_URL}/api/properties/${firstProperty.id}`);
      const propertyData = await propertyResponse.json();
      
      if (propertyResponse.ok) {
        console.log(`✅ Объект получен: ${propertyData.title}`);
        console.log(`   Просмотры: ${propertyData.views}`);
      } else {
        console.log(`❌ Ошибка: ${propertyData.error}`);
      }
    }

    console.log('\n🎉 Тестирование завершено!');

  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
  }
}

// Запуск тестов
testPropertyAPI();
