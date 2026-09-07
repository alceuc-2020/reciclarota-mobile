import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CollectionPoint } from '../../../types/route';
import { StatusBadge } from '../../atoms/StatusBadge';
import { styles } from './styles';

// Definindo as propriedades do componente
interface PointCardProps {
  point: CollectionPoint;
  onPress: () => void;
}

export function PointCard({ point, onPress }: PointCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {point.name}
        </Text>
        {!!point.weightKg && (
          <Text style={styles.subtitle}>
            Carga estimada: {point.weightKg} kg
          </Text>
        )}
      </View>
      
      {/* Aqui fazemos a Composição inserindo o nosso Átomo */}
      <StatusBadge status={point.status} />
    </TouchableOpacity>
  );
}