import { useEffect } from 'react';
import {
	Alert,
	FlatList,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PointCard } from '../components/PointCard';
import { MOCK_POINTS } from '../mocks/routesData';
import { useRouteStore } from '../states/useRouteStore';

export default function RoutesScreen() {
	const router = useRouter();
	const currentDriverCode = useRouteStore((state) => state.currentDriverCode);
	const activeRoute = useRouteStore((state) => state.activeRoute);
	const setActiveRoute = useRouteStore((state) => state.setActiveRoute);
	const clearRoute = useRouteStore((state) => state.clearRoute);

	// Inicializa os pontos a partir do mock apenas se esta conta ainda não tiver rota salva
	useEffect(() => {
		if (currentDriverCode && !activeRoute) {
			setActiveRoute({
				points: MOCK_POINTS.map((point) => ({
					...point,
					id: String(point.id),
				})),
			});
		}
	}, [currentDriverCode, activeRoute, setActiveRoute]);

	const executeReset = () => {
		clearRoute();
		setActiveRoute({
			points: MOCK_POINTS.map((point) => ({
				...point,
				id: String(point.id),
				status: 'PENDING',
				weightKg: 0,
			})),
		});
	};

	const handleResetDay = () => {
		const titulo = 'Iniciar novo dia';
		const mensagem =
			'Deseja apagar as coletas anteriores desta conta e deixar todos os pontos em aberto?';

		if (Platform.OS === 'web') {
			if (window.confirm(`${titulo}\n\n${mensagem}`)) {
				executeReset();
			}
			return;
		}

		Alert.alert(titulo, mensagem, [
			{ text: 'Cancelar', style: 'cancel' },
			{ text: 'Resetar', style: 'destructive', onPress: executeReset },
		]);
	};

	const points = activeRoute?.points ?? [];

	return (
		<View style={styles.container}>
			<View style={styles.headerRow}>
				<View>
					<Text style={styles.title}>Pontos de coleta</Text>
					{currentDriverCode ? (
						<Text style={styles.driverLabel}>Motorista: {currentDriverCode}</Text>
					) : null}
				</View>

				<TouchableOpacity style={styles.resetButton} onPress={handleResetDay}>
					<Text style={styles.resetButtonText}>Novo Dia</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={points}
				extraData={points}
				keyExtractor={(point) => String(point.id)}
				renderItem={({ item }) => (
					<PointCard
						item={item as any}
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
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	title: {
		marginBottom: 4,
		fontSize: 24,
		fontWeight: 'bold',
	},
	driverLabel: {
		fontSize: 14,
		color: '#16a34a',
		fontWeight: '600',
	},
	resetButton: {
		backgroundColor: '#fee2e2',
		borderWidth: 1,
		borderColor: '#dc2626',
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 8,
	},
	resetButtonText: {
		color: '#dc2626',
		fontSize: 13,
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
