import clubs from '../../constants/clubs';
import players from '../../constants/players';
/* const players = (async () => {
    let res = null;
    getPlayers(data => {
        res = data;
    });
    return res;
})(); */

const INITIAL_STATE = {
    appOnline: true,

    user: null,
    team: {
        createdAt: Date.now(),
        registrered: false,
        registreredAt: '',
        updatedAt: '',

        season: '20/21', // e.g. "20/21"
        round: 666,

        value: {
            pitch: 0,
            bench: 0,
            tot: 0
        },

        effort: {},
        points: {},

        players: {
            list: [],
            pitch: {
                Goalkeeper: [],
                Defender: [],
                Midfielder: [],
                Forward: []
            },
            bench: {
                Goalkeeper: [],
                Defender: [],
                Midfielder: [],
                Forward: []
            }
        },

        captain: null,
        viceCaptain: null,

        count: {
            tot: {
                Goalkeeper: 0,
                Defender: 0,
                Midfielder: 0,
                Forward: 0
            },
            pitch: {
                Goalkeeper: 0,
                Defender: 0,
                Midfielder: 0,
                Forward: 0
            },
            bench: {
                Goalkeeper: 0,
                Defender: 0,
                Midfielder: 0,
                Forward: 0
            },
            clubs: {}
        }
    },

    config: {
        buildStage: {
            stageName: 'pitch',
            stageIndex: 0
        },

        mobileSearch: window.innerWidth < 900 ? true : false,
        searchOpen: false,

        filterKeys: {
            _id: [],
            position: [],
            club: []
        },
        allPlayers: [],
        searchablePlayers: [],

        limit: {
            tot: { min: 15, max: 15 },
            pitch: {
                Goalkeeper: { min: 1, max: 1 },
                Defender: { min: 3, max: 5 },
                Midfielder: { min: 2, max: 5 },
                Forward: { min: 1, max: 3 },
                tot: 11
            },
            bench: {
                Goalkeeper: { min: 1, max: 1 },
                Defender: { min: 1, max: 1 },
                Midfielder: { min: 1, max: 1 },
                Forward: { min: 1, max: 1 },
                tot: 4
            },
            club: { max: 3 },
            value: {
                pitch: Infinity,
                bench: 30
            }
        },

        //positions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],

        switchers: {
            marked: null,
            target: null
        }
    }
};

/* const INITIAL_STATE = {
    appOnline: true,

    user: null,
    allPlayers: [],

    team: {
        createdAt: Date.now(),
        registrered: false,
        registreredAt: '',
        season: '20/21', // e.g. "20/21"

        list: [],

        captain: null,
        viceCaptain: null,

        pitch: {
            Goalkeeper: [],
            Defender: [],
            Midfielder: [],
            Forward: []
        },
        bench: {
            Goalkeeper: [],
            Defender: [],
            Midfielder: [],
            Forward: []
        },

        clubs: {},

        count: {
            tot: {
                Goalkeeper: 0,
                Defender: 0,
                Midfielder: 0,
                Forward: 0
            },
            pitch: {
                Goalkeeper: 0,
                Defender: 0,
                Midfielder: 0,
                Forward: 0
            },
            bench: {
                Goalkeeper: 0,
                Defender: 0,
                Midfielder: 0,
                Forward: 0
            }
        },

        game: {
            value: {
                pitch: 0,
                bench: 0,
                tot: 0
            },
            round: 666
        }
    },

    config: {
        buildStage: {
            stageName: 'pitch',
            stageIndex: 0
        },

        mobileSearch: window.innerWidth < 900 ? true : false,
        searchOpen: false,

        filterKeys: {
            uid: [],
            position: [],
            club: []
        },
        searchablePlayers: [],

        limit: {
            tot: { min: 15, max: 15 },
            pitch: {
                Goalkeeper: { min: 1, max: 1 },
                Defender: { min: 3, max: 5 },
                Midfielder: { min: 2, max: 5 },
                Forward: { min: 1, max: 3 },
                tot: 11
            },
            bench: {
                Goalkeeper: { min: 1, max: 1 },
                Defender: { min: 1, max: 1 },
                Midfielder: { min: 1, max: 1 },
                Forward: { min: 1, max: 1 },
                tot: 4
            },
            club: { max: 3 },
            value: {
                pitch: Infinity,
                bench: 30
            }
        },

        //positions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],

        switchers: {
            marked: null,
            target: null
        }
    }
}; */

// allplayers with rounded prices

export const allPlayers = players.map(player => ({
    ...player,
    price: Math.round(parseFloat(player.price))
}));

// all clubs
export const allClubs = clubs;

// my team initial state
export default INITIAL_STATE;
