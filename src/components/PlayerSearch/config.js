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
    filterPos: { value: null, label: 'Alla positioner' },
    filterClub: { value: null, label: 'Alla klubbar' },
    filterMaxPrice: { value: null, label: 'Alla prisklasser' },
    searchTerm: '',
    sortBy: 'price',
    sortDirection: 'desc',

    paginationSettings: {
        pageNumber: 1,
        pageSize: 20
    },

    result: [],
    playerModal: false,
    multiPick: false
};

export default INITIAL_STATE;
