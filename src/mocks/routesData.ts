export type Point = {
	id: string;
	name: string;
	status: 'PENDING' | 'COMPLETED';
	category: string;
	estimatedWeightKg: number;
};

export const MOCK_POINTS: Point[] = [
	{
		id: '1',
		name: 'Ecoponto Rápido - Praça Central',
		status: 'COMPLETED',
		category: 'Plástico e Papel',
		estimatedWeightKg: 45,
	},
	{
		id: '2',
		name: 'Condomínio Residencial Green',
		status: 'PENDING',
		category: 'Vidro e Metal',
		estimatedWeightKg: 120,
	},
	{
		id: '3',
		name: 'Escola Municipal Paulo Freire',
		status: 'PENDING',
		category: 'Papelão e Orgânicos',
		estimatedWeightKg: 85,
	},
];
