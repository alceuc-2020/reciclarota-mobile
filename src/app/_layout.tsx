import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack
        screenOptions={{ 
            headerStyle: { backgroundColor: '#16a34a' }, 
            headerTintColor: '#ffffff', 
            headerTitleStyle: { fontWeight: 'bold' },
        }}
        >
            <Stack.Screen name="index" options={{ title: 'ReciclaRota - Login' }} />
            <Stack.Screen name="routes" options={{ title: 'Rotas de Coleta do Dia' }} />
            <Stack.Screen name="collection" options={{ title: 'Registro de Pesagem' }} />  
        </Stack>
    );
}
            