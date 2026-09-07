import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActiveRoute, CollectionPoint } from '../types/route';

interface RouteState {
  activeRoute: ActiveRoute | null;
  pendingSyncQueue: CollectionPoint[];
  setActiveRoute: (route: ActiveRoute) => void;
  updatePointStatus: (pointId: string, status: 'COMPLETED' | 'SKIPPED', weightKg?: number) => void;
  clearRoute: () => void;
}

export const useRouteStore = create<RouteState>()(
  persist(
    (set, get) => ({
      activeRoute: null,
      pendingSyncQueue: [],

      setActiveRoute: (route) => set({ activeRoute: route }),

      updatePointStatus: (pointId, status, weightKg) => {
        const route = get().activeRoute;
        if (!route) return;

        const updatedPoints = route.points.map((point) => {
          if (point.id === pointId) {
            const updatedPoint = { ...point, status, weightKg };

            // Enfileira na fila de sincronização offline
            set((state) => ({
              pendingSyncQueue: [...state.pendingSyncQueue, updatedPoint],
            }));

            return updatedPoint;
          }
          return point;
        });

        set({ activeRoute: { ...route, points: updatedPoints } });
      },

      clearRoute: () => set({ activeRoute: null, pendingSyncQueue: [] }),
    }),
    {
      name: 'reciclarota-storage',
      storage: createJSONStorage(() => AsyncStorage), // Define o adaptador do AsyncStorage do Expo
    }
  )
);