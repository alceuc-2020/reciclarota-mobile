import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { RouteList } from './src/components/organisms/RouteList';
import { useRouteStore } from './src/states/useRouteStore';
import { ActiveRoute } from './src/types/route';

export default function App() {
  // Consome as informações e ações diretamente do Zustand global
  const { activeRoute, setActiveRoute, updatePointStatus } = useRouteStore();

  // Simula a carga inicial vinda do servidor Laravel no primeiro carregamento
  useEffect(() => {
    if (!activeRoute) {
      const mockApiRoute: ActiveRoute = {
        id: 'rota-seletiva-centro-102',
        date: '2026-09-07',
        vehiclePlate: 'ABC-1234',
        points: [
          {
            id: '1',
            name: 'Ecoponto Rápido - Praça Central',
            latitude: -25.39,
            longitude: -51.46,
            status: 'PENDING',
            weightKg: 45,
          },
          {
            id: '2',
            name: 'Condomínio Residencial Green',
            latitude: -25.40,
            longitude: -51.47,
            status: 'PENDING',
            weightKg: 120,
          },
          {
            id: '3',
            name: 'Ponto Comercial - Supermercado Sul',
            latitude: -25.41,
            longitude: -51.48,
            status: 'PENDING',
            weightKg: 15,
          },
        ],
      };
      setActiveRoute(mockApiRoute);
    }
  }, [activeRoute, setActiveRoute]);

  // Manipulador nativo de seleção e simulação de pesagem física
  const handleSelectPoint = (pointId: string, pointName: string) => {
    Alert.alert(
      'Coleta Seletiva',
      `O que deseja registrar para o ponto:\n${pointName}?`,
      [
        {
          text: 'Confirmar Coleta (Sucesso)',
          onPress: () => {
            // Gera um peso de coleta simulado entre 10kg e 60kg
            const randomWeight = Math.floor(Math.random() * 50) + 10;
            updatePointStatus(pointId, 'COMPLETED', randomWeight);
          },
        },
        {
          text: 'Pular Ponto (Desvio)',
          style: 'destructive',
          onPress: () => {
            updatePointStatus(pointId, 'SKIPPED', 0);
          },
        },
        {
          text: 'Voltar',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.headerTitle}>ReciclaRota Mobile</Text>
          <Text style={styles.headerSubtitle}>
            Veículo Associado: {activeRoute?.vehiclePlate || 'Carregando...'}
          </Text>
          
          {activeRoute ? (
            <RouteList 
              route={activeRoute} 
              onSelectPoint={handleSelectPoint} 
            />
          ) : (
            <Text style={styles.loadingText}>Carregando dados da rota...</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#10B981', // Verde do ReciclaRota
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 40,
  },
});