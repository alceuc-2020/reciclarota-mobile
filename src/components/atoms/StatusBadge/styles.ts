import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pending: {
    backgroundColor: '#F59E0B', // Amarelo/Laranja para Pendente
  },
  completed: {
    backgroundColor: '#10B981', // Verde para Coletado
  },
  skipped: {
    backgroundColor: '#EF4444', // Vermelho para Pulado
  },
});
