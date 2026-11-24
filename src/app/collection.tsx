import React, { useEffect, useState } from 'react';
import {
	Alert,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRouteStore } from '../states/useRouteStore';

export default function CollectionScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();

	const activeRoute = useRouteStore((state) => state.activeRoute);
	const currentDriverCode = useRouteStore((state) => state.currentDriverCode);
	const updatePointStatus = useRouteStore((state) => state.updatePointStatus);

	const point = activeRoute?.points.find((p) => String(p.id) === String(id));

	const [weight, setWeight] = useState<number>(
		typeof point?.weightKg === 'number' && point.weightKg > 0 ? point.weightKg : 45
	);
	const [error, setError] = useState('');

	useEffect(() => {
		if (typeof point?.weightKg === 'number' && point.weightKg > 0) {
			setWeight(point.weightKg);
		}
	}, [point?.weightKg]);

	const showAlert = (title: string, mensagem: string) => {
		if (Platform.OS === 'web') {
			window.alert(`${title}\n\n${mensagem}`);
		} else {
			Alert.alert(title, mensagem);
		}
	};

	const handleIncrease = () => {
		setError('');
		setWeight((prev) => prev + 5);
	};

	const handleDecrease = () => {
		setError('');
		setWeight((prev) => (prev > 5 ? prev - 5 : 0));
	};

	const handleConfirm = () => {
		if (!id || !point) {
			const mensagem = 'Ponto de coleta não encontrado na rota ativa.';
			setError(mensagem);
			showAlert('Erro', mensagem);
			return;
		}

		if (!Number.isFinite(weight) || weight <= 0) {
			const mensagem = 'Informe um peso válido maior que 0 kg para concluir a coleta.';
			setError(mensagem);
			showAlert('Atenção', mensagem);
			return;
		}

		setError('');
		updatePointStatus(String(point.id), 'COMPLETED', weight);

		showAlert(
			'Sucesso!',
			`Coleta do ponto #${point.id} (${weight} kg) registrada offline para ${currentDriverCode ?? 'o motorista'}.`,
		);
		router.back();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Registrar coleta</Text>
			{point?.name ? (
				<Text style={styles.pointName}>{String(point.name)}</Text>
			) : null}
			<Text style={styles.label}>Informe o peso coletado</Text>

			<View style={styles.stepperContainer}>
				<TouchableOpacity
					style={styles.stepButton}
					onPress={handleDecrease}
					accessibilityLabel="Diminuir peso"
				>
					<Text style={styles.stepButtonText}>−</Text>
				</TouchableOpacity>

				<View style={[styles.weightDisplay, error ? styles.weightDisplayError : null]}>
					<TextInput
						style={styles.weightInput}
						value={String(weight)}
						onChangeText={(value) => {
							setError('');
							const parsed = Number.parseInt(value.replace(/[^0-9]/g, ''), 10);
							setWeight(Number.isNaN(parsed) ? 0 : Math.max(0, parsed));
						}}
						keyboardType="numeric"
						accessibilityLabel="Peso em quilogramas"
					/>
					<Text style={styles.unitText}>kg</Text>
				</View>

				<TouchableOpacity
					style={styles.stepButton}
					onPress={handleIncrease}
					accessibilityLabel="Aumentar peso"
				>
					<Text style={styles.stepButtonText}>+</Text>
				</TouchableOpacity>
			</View>

			{error ? <Text style={styles.errorText}>{error}</Text> : null}

			<View style={styles.presetsContainer}>
				{[5, 15, 30, 45].map((preset) => {
					const isActive = weight === preset;
					return (
						<TouchableOpacity
							key={preset}
							style={[styles.presetChip, isActive && styles.presetChipActive]}
							onPress={() => {
								setError('');
								setWeight(preset);
							}}
						>
							<Text
								style={[styles.presetText, isActive && styles.presetTextActive]}
							>
								{preset} kg
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>

			<TouchableOpacity style={styles.button} onPress={handleConfirm}>
				<Text style={styles.buttonText}>Confirmar coleta</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#16a34a',
		marginBottom: 8,
		textAlign: 'center',
	},
	pointName: {
		fontSize: 15,
		fontWeight: '600',
		color: '#1f2937',
		marginBottom: 16,
		textAlign: 'center',
	},
	label: {
		fontSize: 14,
		fontWeight: '600',
		color: '#374151',
		marginBottom: 12,
		textAlign: 'center',
	},
	stepperContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	stepButton: {
		backgroundColor: '#e5e7eb',
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	stepButtonText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#1f2937',
	},
	weightDisplay: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#16a34a',
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: '#f0fdf4',
	},
	weightDisplayError: {
		borderColor: '#dc2626',
		backgroundColor: '#fef2f2',
	},
	weightInput: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#15803d',
		textAlign: 'center',
		minWidth: 60,
	},
	unitText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#15803d',
		marginLeft: 4,
	},
	errorText: {
		color: '#dc2626',
		fontSize: 13,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 12,
	},
	presetsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 8,
		marginBottom: 24,
	},
	presetChip: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#d1d5db',
		backgroundColor: '#f9fafb',
		alignItems: 'center',
	},
	presetChipActive: {
		borderColor: '#16a34a',
		backgroundColor: '#dcfce7',
	},
	presetText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#374151',
	},
	presetTextActive: {
		color: '#15803d',
		fontWeight: 'bold',
	},
	button: {
		backgroundColor: '#16a34a',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
