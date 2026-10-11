import React, { useState } from 'react';
import {
	Alert,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
	const router = useRouter();
	const [driverCode, setDriverCode] = useState('');
	const [error, setError] = useState('');

	const handleLogin = () => {
		if (!driverCode.trim()) {
			const mensagem = 'Por favor, informe o código do motorista!';
			setError(mensagem);

			if (Platform.OS === 'web') {
				window.alert(mensagem);
			} else {
				Alert.alert('Atenção', mensagem);
			}
			return;
		}

		setError('');
		router.push('/routes');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>ReciclaRota</Text>
			<Text style={styles.subtitle}>Informe seu código de motorista para continuar.</Text>
			<TextInput
				style={[styles.input, error ? styles.inputError : null]}
				value={driverCode}
				onChangeText={(value) => {
					setDriverCode(value);
					if (error) setError('');
				}}
				placeholder="Código do motorista"
				autoCapitalize="none"
				accessibilityLabel="Código do motorista"
			/>
			{error ? <Text style={styles.errorText}>{error}</Text> : null}
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
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
		marginBottom: 8,
		fontSize: 16,
	},
	inputError: {
		borderColor: '#dc2626',
		borderWidth: 2,
	},
	errorText: {
		color: '#dc2626',
		fontSize: 13,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	button: {
		backgroundColor: '#16a34a',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 8,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
