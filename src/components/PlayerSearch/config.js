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
    posOrClubSelected: { value: '', label: 'Position/klubb', eng: 'All players' },
    maxPriceSelected: { value: 'none', label: 'Maxpris', number: null },
    searchTerm: '',
    sortBy: 'price',
    priceSort: 'falling',

    paginationSettings: {
        pageNumber: 1,
        pageSize: 20
    },

    result: [],
    playerModal: false,
    multiPick: false
};

export default INITIAL_STATE;
