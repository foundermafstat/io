"use client"

import dynamic from 'next/dynamic';
import { MapSkeleton } from '@/components/skeletons';
import { getLocations } from '@/db/queries';
import { useEffect, useState } from 'react';

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

export function MapContainer() {
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    getLocations().then(setLocations);
  }, []);

  return (
    <div className="z-1 sticky top-[var(--header-gap)] basis-auto">
      <DynamicMap locations={locations} />
    </div>
  );
}
