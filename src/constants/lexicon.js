/*
 *
 * TO SWE
 *********** */
export const positions = {
    Goalkeeper: {
        sing: 'Målvakt',
        plur: 'Målvakter',
        defiteSing: 'Målvakten',
        defitePlur: 'Målvakterna'
    },
    Defender: {
        sing: 'Försvarare',
        plur: 'Försvarare',
        defiteSing: 'Försvararen',
        defitePlur: 'Försvararna'
    },
    Midfielder: {
        sing: 'Mittfältare',
        plur: 'Mittfältare',
        defiteSing: 'Mittfältaren',
        defitePlur: 'Mittfältarna'
    },
    Forward: {
        sing: 'Anfallare',
        plur: 'Anfallare',
        defiteSing: 'Anfallaren',
        defitePlur: 'Anfallaren'
    }
};

export const origins = {
    pitch: { sing: 'plan', plur: 'planer', defiteSing: 'planen', defitePlur: 'planerna' },
    bench: { sing: 'bänk', plur: 'bänkar', defiteSing: 'bänken', defitePlur: 'bänkarna' }
};

export const stages = {
    pitch: { sing: 'plan', plur: 'planer', defiteSing: 'planen', defitePlur: 'planerna' },
    captain: { sing: 'kapten', plur: 'kaptener', defiteSing: 'kaptenen', defitePlur: 'kaptenerna' },
    bench: { sing: 'bänk', plur: 'bänkar', defiteSing: 'bänken', defitePlur: 'bänkarna' },
    overview: {
        sing: 'översikt',
        defiteSing: 'översikten'
    }
};

export const efforts = {
    goals: { sing: 'mål', plur: 'mål' },
    assists: { sing: 'assist', plur: 'assister' },
    cleanSheet: { sing: 'höll nollan', plur: 'höll nollorna' },
    yellows: { sing: 'gult', plur: 'gula' },
    red: { sing: 'rött', plur: 'röda' },
    penaltyMisses: { sing: 'straffmiss', plur: 'straffmissar' },
    penaltySaves: { sing: 'straffräddning', plur: 'straffräddningar' },
    playtime: { sing: 'speltid', plur: 'speltider' }
};

/*
 *
 * TO ENG
 *********** */
export const positioner = {
    Målvakt: { sing: 'Goalkeeper', plur: 'Goalkeepers' },

    Målvakter: { sing: 'Goalkeeper', plur: 'Goalkeepers' },
    Försvarare: { sing: 'Defender', plur: 'Defenders' },
    Mittfältare: { sing: 'Midfielder', plur: 'Midfielders' },
    Anfallare: { sing: 'Forward', plur: 'Forwards' }
};

export const prestationer = {
    mål: { sing: 'goal', plur: 'goals' },
    assister: { sing: 'assist', plur: 'assists' },
    'höll nollan': { sing: 'cleanSheet', plur: 'cleanSheets' },
    gula: { sing: 'yellow', plur: 'yellows' },
    rött: { sing: 'red', plur: 'reds' },
    straffmissar: { sing: 'penaltyMiss', plur: 'penaltyMisses' },
    straffräddningar: { sing: 'penaltySave', plur: 'penaltySaves' },
    speltid: { sing: 'playetime', plur: 'playtimes' }
};
