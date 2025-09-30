import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	MapPin,
	Phone,
	Shield,
	Navigation,
	Sparkles,
	Star,
	Building,
	Home as HomeIcon,
	Store,
	Warehouse,
	TreePine,
	Loader2
} from 'lucide-react';
import { getPopularPropertyTypes, getPopularLocations, getCityStats } from './actions';
import HomepageContent from './components/HomepageContent';

interface PopularPropertyType {
	type: string;
	count: number;
}

interface PopularLocation {
	city: string | null;
	state: string | null;
	country: string | null;
	count: number;
}

interface CityStats {
	city: string;
	propertyCount: number;
	averageRentPrice: number;
	averageSalePrice: number;
}

export default async function Home() {
	// Загружаем данные напрямую из БД через серверные экшны
	const [popularTypes, popularLocations, cityStats] = await Promise.all([
		getPopularPropertyTypes(6),
		getPopularLocations(7),
		getCityStats()
	]);

	return (
		<HomepageContent
			popularTypes={popularTypes}
			popularLocations={popularLocations}
			cityStats={cityStats}
		/>
	);
}
