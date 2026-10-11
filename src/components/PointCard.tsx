import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBadge } from './StatusBadge';

export type Point = {
	id?: string | number;
	name: string;
	category: string;
	status: 'PENDING' | 'COMPLETED';
};

type PointCardProps = {
	item: Point;
	onPress: () => void;
};

export function PointCard({ item, onPress }: PointCardProps) {
	return (
		<TouchableOpacity
			style={styles.card}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<View style={styles.header}>
				<Text style={styles.title} numberOfLines={1}>
					{item.name}
				</Text>
				<StatusBadge status={item.status} />
			</View>
			<Text style={styles.subtitle}>{item.category}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#ffffff',
		padding: 16,
		borderRadius: 10,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: '#e5e7eb',
		elevation: 2,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 6,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#1f2937',
		flex: 1,
		marginRight: 8,
	},
	subtitle: {
		fontSize: 14,
		color: '#6b7280',
	},
});
