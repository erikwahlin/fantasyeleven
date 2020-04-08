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
	posOrClubSelected: { value: '', label: 'Alla spelare' },
	maxPriceSelected: { value: 'none', label: 'Högsta pris' },
	searchTerm: '',
	priceSort: 'falling',

	paginationSettings: {
		pageNumber: 1,
		pageSize: 20
	},

	slideSearch: window.innerWidth < 900 ? true : false,
	searchOpen: false,

	result: [],
	playerModal: false
};

export default INITIAL_STATE;
