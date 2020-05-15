import allClubs from './clubs';
import { clone } from './helperFuncs';

export const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

export const origins = ['pitch', 'bench', 'list'];

export const maxPlayers = {
    pitch: 11,
    bench: 4
};

export const minPlayers = {
    pitch: 11,
    bench: 4
};

export const maxPrice = {
    pitch: Infinity,
    bench: 30
};

export const buildStages = ['pitch', 'captain', 'bench', 'overview'];

export const stageTitles = {
    pitch: 'Välj 11 utespelare',
    captain: 'Välj kapten/vice kapten',
    bench: 'Välj 4 reserver',
    overview: 'Ditt lag'
};

export const playtimeOptions = [
    { label: '60+', val: '60+' },
    { label: '1-59', val: '1-59' },
    { label: '0', val: '0' }
];

export const initialEffort = {
    goals: 0,
    assists: 0,
    cleanSheets: false,
    yellows: 0,
    red: false,
    penaltyMisses: 0,
    penaltySaves: 0,
    playtime: '0'
};

export const initialMatch = (index = '') => {
    const initialTeam = {
        club: '',
        goals: 0,
        players: []
    };

    return {
        id: `match-${index + 1}`,
        index: index,
        home: clone(initialTeam),
        away: clone(initialTeam)
    };
};

export const initialMatches = () => {
    let res = [];

    for (let nth = 0; nth < allClubs.length / 2; nth++) {
        res.push(initialMatch(nth));
    }

    return res;
};
