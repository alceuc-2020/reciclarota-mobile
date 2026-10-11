import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBadge } from './src/components/atoms/StatusBadge';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReciclaRota - Preview de Átomos</Text>
      
      <View style={styles.badgeContainer}>
        <Text style={styles.label}>Ponto Pendente:</Text>
        <StatusBadge status="PENDING" />
      </View>

      <View style={styles.badgeContainer}>
        <Text style={styles.label}>Ponto Coletado:</Text>
        <StatusBadge status="COMPLETED" />
      </View>

      <View style={styles.badgeContainer}>
        <Text style={styles.label}>Ponto Ignorado:</Text>
        <StatusBadge status="SKIPPED" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 32,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 280,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
});