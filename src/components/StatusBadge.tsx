import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type StatusBadgeProps = {
	status: 'PENDING' | 'COMPLETED';
};

export function StatusBadge({ status }: StatusBadgeProps) {
	const isCompleted = status === 'COMPLETED';

	return (
		<View style={[styles.badge, isCompleted ? styles.completedBg : styles.pendingBg]}>
			<Text style={[styles.text, isCompleted ? styles.completedText : styles.pendingText]}>
				{isCompleted ? 'Concluído' : 'Pendente'}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 6,
	},
	completedBg: { backgroundColor: '#dcfce7' },
	pendingBg: { backgroundColor: '#fef9c3' },
	text: { fontSize: 12, fontWeight: 'bold' },
	completedText: { color: '#15803d' },
	pendingText: { color: '#a16207' },
});
