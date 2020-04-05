export const config = {
	positions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
	sortOptions: {
		name: 'namn',
		club: 'lag',
		price: 'pris',
		position: 'position'
	}
};

const INITIAL_STATE = {
	posOrClubSelected: { value: 'none', label: 'Alla spelare' },
	maxPriceSelected: { value: 'none', label: 'Högsta pris' },
	searchTerm: '',
	priceSort: 'falling',

	paginationSettings: {
		pageNumber: 1,
		pageSize: 20
	},

	result: []
};

export default INITIAL_STATE;
