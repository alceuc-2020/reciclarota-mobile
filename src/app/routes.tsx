import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { PointCard } from '../components/PointCard';
import { MOCK_POINTS } from '../mocks/routesData';

export default function RoutesScreen() {
	const router = useRouter();
	const [points, setPoints] = useState(MOCK_POINTS);

	// Atualiza o estado criando um novo array sempre que a tela ganha foco
	useFocusEffect(
		useCallback(() => {
			setPoints([...MOCK_POINTS]);
		}, [])
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Pontos de coleta</Text>
			<FlatList
				data={points}
				keyExtractor={(point) => String(point.id)}
				renderItem={({ item }) => (
					<PointCard
						item={item}
						onPress={() =>
							router.push({
								pathname: '/collection',
								params: { id: String(item.id) },
							})
						}
					/>
				)}
				contentContainerStyle={points.length === 0 ? styles.emptyList : undefined}
				ListEmptyComponent={
					<Text style={styles.empty}>Nenhum ponto de coleta encontrado.</Text>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff',
	},
	title: {
		marginBottom: 16,
		fontSize: 24,
		fontWeight: 'bold',
	},
	emptyList: {
		flexGrow: 1,
		justifyContent: 'center',
	},
	empty: {
		color: '#666',
		textAlign: 'center',
	},
});
