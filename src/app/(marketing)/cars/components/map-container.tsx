import dynamic from 'next/dynamic';
import { MapSkeleton } from '@/components/skeletons';
import { getLocations } from '@/db/queries';

const DynamicMap = dynamic(
  async () => {
    const { Map } = await import('./map');
    return { default: Map };
  },
  {
    loading: () => <MapSkeleton />,
    ssr: false,
  },
);

export async function MapContainer() {
  const locations = await getLocations();

  return (
    <div className="z-1 sticky top-[var(--header-gap)] basis-auto">
      <DynamicMap locations={locations} />
    </div>
  );
}
