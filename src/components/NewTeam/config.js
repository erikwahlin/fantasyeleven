import players from '../../constants/players';
import clubs from '../../constants/clubs';

const INITIAL_STATE = {
    // basics

    // user config
    /* value: Number,
	players: [PlayerSchema],

	// result
	points: Number,
	scored: Number,
	conceded: Number,
	keptZero: Boolean,
	yellows: Number,
    reds: Number, */

    appOnline: true,

    user: null,
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
            stageName: 'captain',
            stageIndex: 1
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
};

// allplayers with rounded prices
export const allPlayers = players.map(player => ({
    ...player,
    price: Math.round(parseFloat(player.price))
}));

// all clubs
export const allClubs = clubs;

// my team initial state
export default INITIAL_STATE;
