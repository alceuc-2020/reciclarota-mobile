import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    maxWidth: 340,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937', // Cinza escuro para melhor legibilidade
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280', // Cinza médio
  },
});