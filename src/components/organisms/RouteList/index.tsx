import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ActiveRoute } from '../../../types/route';
import { PointCard } from '../../molecules/PointCard';
import { styles } from './styles';

interface RouteListProps {
  route: ActiveRoute;
  onSelectPoint: (pointId: string, pointName: string) => void;
}

export function RouteList({ route, onSelectPoint }: RouteListProps) {
  // Calcula o peso total estimado somando a carga de cada ponto ecológico
  const totalEstimatedWeight = route.points.reduce((acc, point) => {
    return acc + (point.weightKg || 0);
  }, 0);

  return (
    <View style={styles.container}>
      {/* Cabeçalho do Organismo: Painel de Resumo da Rota */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Carga Total Estimada da Rota</Text>
        <Text style={styles.headerValue}>{totalEstimatedWeight} kg</Text>
      </View>

      {/* Renderização eficiente das Moléculas PointCard */}
      <FlatList
        style={styles.list}
        contentContainerStyle={{ alignItems: 'center' }}
        data={route.points}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PointCard
            point={item}
            onPress={() => onSelectPoint(item.id, item.name)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma rota ativa pendente.</Text>
        }
        scrollEnabled={false} // O ScrollView geral do app cuidará da rolagem da tela
      />
    </View>
  );
}