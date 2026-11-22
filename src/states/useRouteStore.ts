import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CollectionPoint {
  id: string;
  status?: string;
  weightKg?: number;
  [key: string]: unknown;
}

interface ActiveRoute {
  points: CollectionPoint[];
  [key: string]: unknown;
}

interface DriverAccountData {
  activeRoute: ActiveRoute | null;
  pendingSyncQueue: CollectionPoint[];
}

interface RouteState {
  currentDriverCode: string | null;
  accountsData: Record<string, DriverAccountData>;
  activeRoute: ActiveRoute | null;
  pendingSyncQueue: CollectionPoint[];
  setCurrentDriver: (driverCode: string) => void;
  setActiveRoute: (route: ActiveRoute) => void;
  updatePointStatus: (
    pointId: string,
    status: 'COMPLETED' | 'SKIPPED',
    weightKg?: number
  ) => void;
  clearRoute: () => void;
  logout: () => void;
}

export const useRouteStore = create<RouteState>()(
  persist(
    (set, get) => ({
      currentDriverCode: null,
      accountsData: {},
      activeRoute: null,
      pendingSyncQueue: [],

      // Chamado no Login: carrega os dados exclusivos da conta ou inicia vazio
      setCurrentDriver: (driverCode) => {
        const savedAccount = get().accountsData[driverCode];

        set({
          currentDriverCode: driverCode,
          activeRoute: savedAccount ? savedAccount.activeRoute : null,
          pendingSyncQueue: savedAccount ? savedAccount.pendingSyncQueue : [],
        });
      },

      setActiveRoute: (route) => {
        const driverCode = get().currentDriverCode;
        // Clona os pontos para garantir que uma conta não compartilhe referência com outra
        const clonedRoute: ActiveRoute = {
          ...route,
          points: route.points.map((point) => ({ ...point })),
        };

        set((state) => ({
          activeRoute: clonedRoute,
          accountsData: driverCode
            ? {
                ...state.accountsData,
                [driverCode]: {
                  activeRoute: clonedRoute,
                  pendingSyncQueue:
                    state.accountsData[driverCode]?.pendingSyncQueue ?? [],
                },
              }
            : state.accountsData,
        }));
      },

      updatePointStatus: (pointId, status, weightKg) => {
        const { currentDriverCode, activeRoute, pendingSyncQueue, accountsData } =
          get();
        if (!activeRoute || !currentDriverCode) return;

        let updatedPointItem: CollectionPoint | null = null;

        const updatedPoints = activeRoute.points.map((point) => {
          if (point.id === pointId) {
            updatedPointItem = { ...point, status, weightKg };
            return updatedPointItem;
          }
          return point;
        });

        const updatedRoute: ActiveRoute = {
          ...activeRoute,
          points: updatedPoints,
        };

        const updatedQueue = updatedPointItem
          ? [...pendingSyncQueue, updatedPointItem]
          : pendingSyncQueue;

        set({
          activeRoute: updatedRoute,
          pendingSyncQueue: updatedQueue,
          accountsData: {
            ...accountsData,
            [currentDriverCode]: {
              activeRoute: updatedRoute,
              pendingSyncQueue: updatedQueue,
            },
          },
        });
      },

      // Limpa apenas a rota da conta atual
      clearRoute: () => {
        const { currentDriverCode, accountsData } = get();

        set({
          activeRoute: null,
          pendingSyncQueue: [],
          accountsData: currentDriverCode
            ? {
                ...accountsData,
                [currentDriverCode]: {
                  activeRoute: null,
                  pendingSyncQueue: [],
                },
              }
            : accountsData,
        });
      },

      // Sai da conta atual preservando os dados salvos de todos os motoristas
      logout: () =>
        set({
          currentDriverCode: null,
          activeRoute: null,
          pendingSyncQueue: [],
        }),
    }),
    {
      name: 'reciclarota-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
