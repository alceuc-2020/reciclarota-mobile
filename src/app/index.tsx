import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
	const router = useRouter();
	const [driverCode, setDriverCode] = useState('MOT-102');

	return (
		<View style={styles.container}>
			<Text style={styles.title}>ReciclaRota</Text>
			<Text style={styles.subtitle}>Entre com seu código de motorista</Text>
			<TextInput
				style={styles.input}
				value={driverCode}
				onChangeText={setDriverCode}
				placeholder="Código do motorista"
				autoCapitalize="characters"
				accessibilityLabel="Código do motorista"
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push('/home')}
				accessibilityRole="button"
			>
				<Text style={styles.buttonText}>Entrar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		backgroundColor: '#f9fafb',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#16a34a',
		marginBottom: 8,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 14,
		color: '#4b5563',
		marginBottom: 24,
		textAlign: 'center',
	},
	input: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#d1d5db',
		borderRadius: 8,
		padding: 14,
		marginBottom: 16,
	},
	button: {
		backgroundColor: '#16a34a',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
