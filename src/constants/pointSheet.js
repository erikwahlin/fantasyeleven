/* 
*
*
* STATS REF: https://www.premierleague.com/stats/
* & https://www.thestatsdontlie.com/football/uk-ireland/england/premier-league/
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

Taken from season 18/19

GAME - PLAYER
Av. Goals Per Player/Game:	0.4039 (if goalkeeper/defender: 6p, midfielder: 5p, forward: 4p)
Av. assists per Player/Game: 0.2434 (3p)
Av. Yellowss per Player/Game ≈ 0.275 (-1p) - 0.2763
Av. Reds per Player/Game ≈ 0.0289 (-3p)
Av. Penalty-misses per game ≈ if penalty (rand <= 0.0123), then if: new rand <= 0.242 (-3p)
Av. Penalty-saves per Player/Game: 0.0383 (if goalkeeper: 3p)
Av. TriplePlaySave Player/Game 0.9508
Av. Clean Sheet per Team/Player/Game: 0.2724 (if goalkeeper/defender: 4p, midfielder: 1p) - 

fulltime: true, (2p) - temp
parttime: false (1p) - temp

*/

const pointSheet = {
    // chance of
    stats: {
        goals: 0.4039,
        assists: 0.2434,
        yellows: 0.275,
        red: 0.006,
        penaltyMisses: [0.0123, 0.242],
        penaltySaves: 0.0383,
        tripleSaves: 0.9508,
        cleanSheet: 0.2724
        // playtime...
    },

    // GAME RULES
    // max limits and blacklisted positions
    limits: {
        goals: { times: 3, ignore: [] },
        assists: { times: 2, ignore: [] },
        yellows: { times: 1, ignore: [] },
        red: { times: 1, ignore: [] },
        penaltyMisses: { times: 1, ignore: [] },
        penaltySaves: { times: 1, ignore: ['Defender', 'Midfielder', 'Forward'] },
        tripleSaves: { times: 3, ignore: ['Defender', 'Midfielder', 'Forward'] },
        cleanSheet: { times: 1, ignore: ['Forward'] }
        // playtime...
    },

    // point table
    points: {
        goals: {
            Goalkeeper: 6,
            Defender: 6,
            Midfielder: 5,
            Forward: 4
        },
        assists: {
            Goalkeeper: 3,
            Defender: 3,
            Midfielder: 3,
            Forward: 3
        },
        yellows: {
            Goalkeeper: -1,
            Defender: -1,
            Midfielder: -1,
            Forward: -1
        },
        red: {
            Goalkeeper: -3,
            Defender: -3,
            Midfielder: -3,
            Forward: -3
        },
        penaltyMisses: {
            Goalkeeper: -3,
            Defender: -3,
            Midfielder: -3,
            Forward: -3
        },
        penaltySaves: {
            Goalkeeper: 3,
            Defender: 0,
            Midfielder: 0,
            Forward: 0
        },
        tripleSaves: {
            Goalkeeper: 1,
            Defender: 0,
            Midfielder: 0,
            Forward: 0
        },
        cleanSheet: {
            Goalkeeper: 4,
            Defender: 4,
            Midfielder: 1,
            Forward: 0
        },
        playtime: {
            '60+': { Goalkeeper: 2, Defender: 2, Midfielder: 2, Forward: 2 },

            '1-59': {
                Goalkeeper: 1,
                Defender: 1,
                Midfielder: 1,
                Forward: 1
            },
            '0': {
                Goalkeeper: 1,
                Defender: 1,
                Midfielder: 1,
                Forward: 1
            }
        }
        //playtime...
    }
};

export default pointSheet;
