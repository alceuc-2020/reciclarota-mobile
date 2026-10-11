import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBadge } from './StatusBadge';

export interface PointItem {
	id: string;
	name: string;
	category: string;
	status: 'PENDING' | 'COMPLETED';
	weightKg?: number;
}

interface PointCardProps {
	item: PointItem;
	onPress: () => void;
}

export function PointCard({ item, onPress }: PointCardProps) {
	return (
		<TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
			<View style={styles.info}>
				<Text style={styles.name}>{item.name}</Text>
				<Text style={styles.category}>{item.category}</Text>
				{item.weightKg !== undefined && (
					<Text style={styles.category}>{item.weightKg} kg</Text>
				)}
			</View>
			<StatusBadge status={item.status} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#ffffff',
		borderRadius: 8,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: '#f3f4f6',
	},
	info: {
		flex: 1,
		marginRight: 12,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#1f2937',
	},
	category: {
		fontSize: 14,
		color: '#6b7280',
		marginTop: 4,
	},
});
