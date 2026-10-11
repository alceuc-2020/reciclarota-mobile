import React, { useState } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function CollectionScreen() {
	const router = useRouter();
	const [weight, setWeight] = useState('45');

	const handleConfirm = () => {
		Alert.alert('Sucesso!', `Coleta de ${weight} kg registrada offline.`);
		router.back();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Registrar coleta</Text>
			<Text style={styles.label}>Peso da coleta (kg)</Text>
			<TextInput
				style={styles.input}
				value={weight}
				onChangeText={setWeight}
				keyboardType="decimal-pad"
				placeholder="Informe o peso"
			/>
			<TouchableOpacity style={styles.button} onPress={handleConfirm}>
				<Text style={styles.buttonText}>Confirmar coleta</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 24, backgroundColor: '#ffffff' },
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#16a34a',
		marginBottom: 16,
	},
	label: { fontSize: 14, color: '#374151', marginBottom: 8 },
	input: {
		borderWidth: 1,
		borderColor: '#d1d5db',
		borderRadius: 8,
		padding: 14,
		fontSize: 18,
		marginBottom: 24,
	},
	button: {
		backgroundColor: '#16a34a',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});
