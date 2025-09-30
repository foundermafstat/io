/**
 * Утилиты для работы с изображениями недвижимости
 */

// Список доступных изображений недвижимости
export const ESTATE_IMAGES = [
	'/estate/io-01.png',
	'/estate/io-02.png',
	'/estate/io-03.png',
	'/estate/io-04.png',
	'/estate/io-05.png',
	'/estate/io-06.png',
] as const;

/**
 * Получить случайное изображение из коллекции estate
 * @param seed - Семя для стабильного выбора (например, ID объекта)
 * @returns Путь к изображению
 */
export function getRandomEstateImage(seed?: string | number): string {
	if (seed !== undefined) {
		// Используем семя для стабильного выбора
		const seedValue =
			typeof seed === 'string'
				? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
				: seed;
		const index = seedValue % ESTATE_IMAGES.length;
		return ESTATE_IMAGES[index];
	}

	// Если семя не предоставлено, выбираем случайно
	const index = Math.floor(Math.random() * ESTATE_IMAGES.length);
	return ESTATE_IMAGES[index];
}

/**
 * Получить массив случайных изображений
 * @param count - Количество изображений
 * @param seed - Семя для стабильного выбора
 * @returns Массив путей к изображениям
 */
export function getRandomEstateImages(
	count: number,
	seed?: string | number
): string[] {
	const images: string[] = [];
	const baseSeed =
		seed !== undefined
			? typeof seed === 'string'
				? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
				: seed
			: Math.floor(Math.random() * 1000);

	for (let i = 0; i < count; i++) {
		const imageSeed = baseSeed + i;
		images.push(getRandomEstateImage(imageSeed));
	}

	return images;
}

/**
 * Получить все доступные изображения
 * @returns Массив всех путей к изображениям
 */
export function getAllEstateImages(): readonly string[] {
	return ESTATE_IMAGES;
}
