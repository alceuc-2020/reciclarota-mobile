import React, { useState } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MOCK_POINTS } from '../mocks/routesData';

export default function CollectionScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();
	const [weight, setWeight] = useState(45);

	const handleIncrease = () => setWeight((prev) => prev + 5);
	const handleDecrease = () => setWeight((prev) => (prev > 5 ? prev - 5 : 0));

	const handleConfirm = () => {
		const index = MOCK_POINTS.findIndex(
			(point, i) => String(point.id ?? i) === String(id),
		);

		if (index !== -1) {
			const updatedPoint = {
				...MOCK_POINTS[index],
				status: 'COMPLETED',
				weightKg: weight,
			} as typeof MOCK_POINTS[number] & { weightKg: number };

			MOCK_POINTS[index] = updatedPoint;
		}

		Alert.alert(
			'Sucesso!',
			`Coleta do ponto ${id ? `#${id}` : ''} de ${weight} kg registrada offline.`,
		);
		router.back();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Registrar coleta</Text>
			<Text style={styles.label}>Informe o peso coletado</Text>

			<View style={styles.stepperContainer}>
				<TouchableOpacity
					style={styles.stepButton}
					onPress={handleDecrease}
					accessibilityLabel="Diminuir peso"
				>
					<Text style={styles.stepButtonText}>−</Text>
				</TouchableOpacity>

				<View style={styles.weightDisplay}>
					<TextInput
						style={styles.weightInput}
						value={String(weight)}
						onChangeText={(value) =>
							setWeight(Math.max(0, Number.parseInt(value, 10) || 0))
						}
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

			<View style={styles.presetsContainer}>
				{[5, 15, 30, 45].map((preset) => {
					const isActive = weight === preset;
					return (
						<TouchableOpacity
							key={preset}
							style={[styles.presetChip, isActive && styles.presetChipActive]}
							onPress={() => setWeight(preset)}
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
		marginBottom: 20,
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
		marginBottom: 20,
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
	presetsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 32,
	},
	presetChip: {
		borderWidth: 1,
		borderColor: '#d1d5db',
		borderRadius: 20,
		paddingVertical: 8,
		paddingHorizontal: 14,
		backgroundColor: '#f9fafb',
	},
	presetChipActive: {
		backgroundColor: '#16a34a',
		borderColor: '#16a34a',
	},
	presetText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#4b5563',
	},
	presetTextActive: {
		color: '#ffffff',
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
