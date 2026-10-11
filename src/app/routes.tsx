import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_POINTS } from '../mocks/routesData';
import { PointCard } from '../components/PointCard';

export default function RoutesScreen() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Pontos de coleta</Text>
			<FlatList
				data={MOCK_POINTS}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => (
					<PointCard
						item={item}
						onPress={() => router.push(`/routes/${item.id}`)}
					/>
				)}
				contentContainerStyle={styles.list}
				ListEmptyComponent={<Text style={styles.empty}>Nenhum ponto encontrado.</Text>}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 16,
	},
	list: {
		paddingBottom: 16,
	},
	empty: {
		color: '#666',
		textAlign: 'center',
		marginTop: 24,
	},
});
