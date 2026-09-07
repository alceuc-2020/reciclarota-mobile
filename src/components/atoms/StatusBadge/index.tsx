import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

// Propriedades do componente usando a convenção de nomenclatura "NomeComponenteProps"
interface StatusBadgeProps {
  status: 'PENDING' | 'COMPLETED' | 'SKIPPED';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  // Função para retornar o estilo de cor baseado no status
  const getBadgeStyle = () => {
    switch (status) {
      case 'COMPLETED':
        return styles.completed;
      case 'SKIPPED':
        return styles.skipped;
      default:
        return styles.pending;
    }
  };

  // Função para traduzir o status técnico para texto legível em português
  const getLabel = () => {
    switch (status) {
      case 'COMPLETED':
        return 'Coletado';
      case 'SKIPPED':
        return 'Pulado';
      default:
        return 'Pendente';
    }
  };

  return (
    <View style={[styles.container, getBadgeStyle()]}>
      <Text style={styles.text}>{getLabel()}</Text>
    </View>
  );
}