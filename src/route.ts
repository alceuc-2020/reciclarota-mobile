export interface CollectionPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'PENDING' | 'COMPLETED' | 'SKIPPED';
  weightKg?: number;
  categories?: string[];
}

export interface ActiveRoute {
  id: string;
  date: string;
  vehiclePlate: string;
  points: CollectionPoint[];
}