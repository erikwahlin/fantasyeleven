import allClubs from './clubs';
import { clone } from './helperFuncs';
import player_backup from './players_backup';
import players_backup from './players_backup';
import { addEffort } from './helperFuncs';

export const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

export const positionOrder = {
    Goalkeeper: 1,
    Defender: 2,
    Midfielder: 3,
    Forward: 4
};

export const origins = ['pitch', 'bench', 'list'];

export const formations = [
    [1, 3, 4, 3],
    [1, 3, 5, 2],

    [1, 4, 3, 3],
    [1, 4, 4, 2],
    [1, 4, 5, 1],

    [1, 5, 2, 3],
    [1, 5, 3, 2],
    [1, 5, 4, 1]
];

export const formationLimits = {
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
};

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
    cleanSheet: false,
    yellows: 0,
    red: false,
    penaltyMisses: 0,
    penaltySaves: 0,
    tripleSaves: 0,
    playtime: '0'
};

export const initialPoints = {
    goals: 0,
    assists: 0,
    cleanSheet: 0,
    yellows: 0,
    red: 0,
    penaltyMisses: 0,
    penaltySaves: 0,
    tripleSaves: 0,
    playtime: 0
};

export const clubPlayers = club => players_backup.filter(p => p.club === club);

export const initialMatch = (index = '') => {
    const initialHome = {
        club: allClubs[index].long,
        goals: 0,
        players: clubPlayers(allClubs[index].long).map(p => addEffort(p))
    };

    const initialAway = {
        club: allClubs[index + 1].long,
        goals: 0,
        players: clubPlayers(allClubs[index + 1].long).map(p => addEffort(p))
    };

    return {
        id: `match-${index + 1}`,
        index: index,
        home: clone(initialHome),
        away: clone(initialAway)
    };
};

export const initialMatches = () => {
    let res = [];

    for (let nth = 0; nth < allClubs.length; nth += 2) {
        res.push(initialMatch(nth));
    }

    return res;
};
