import { clone, userMsg, effortToPoints, toSwe } from './helperFuncs';

const handleResultConflicts = ({ match, key, val, player, side, otherside, pIndex, updater }) => {
    let res = clone(match);

    const goalsVsCleanSheet = () => {
        const override = () => {
            res[otherside].players = res[otherside].players.map(p => {
                let newP = clone(p);
                newP.effort.cleanSheet = false;
                newP.points.cleanSheet = effortToPoints({
                    key: 'cleanSheet',
                    val: false,
                    player: newP
                });
                console.log('vs-player cleanSheet', newP.effort.cleanSheet);

                return newP;
            });

            updater(res);
        };

        let conflict = res[otherside].players.some(p => p.effort.cleanSheet);

        if (conflict) {
            userMsg({
                message: 'Klicka för att bort "Höll nollan" från alla motståndar-spelare',
                type: 'warning',
                callback: override,
                dissmiss: {
                    duration: 10000,
                    onScreen: true
                }
            }).add();
        }
    };

    const cleanSheetVsGoals = () => {
        const override = () => {
            res[otherside].players = res[otherside].players.map(p => {
                let newP = clone(p);
                newP.effort.goals = 0;
                newP.points.cleanSheet = effortToPoints({
                    key: 'goals',
                    val: 0,
                    player: newP
                });

                console.log('vs-player cleanSheet', newP.effort.cleanSheet);

                return newP;
            });

            res[otherside].goals = 0;

            updater(res);
        };

        const conflict = res[otherside].players.some(p => p.effort.goals > 0);

        if (conflict) {
            userMsg({
                message: 'Klicka för att avmarkera "Mål" på alla motståndar-spelare',
                type: 'warning',
                callback: override,
                dissmiss: {
                    duration: 10000,
                    onScreen: true
                }
            }).add();
        }
    };

    const savesVsPosition = () => {
        const conflict = true;

        if (conflict) {
            userMsg({
                message: `Har utespelaren stått i mål?`,
                type: 'warning',
                dissmiss: { duration: 1000, onScreen: false }
            }).add();
        }
    };

    const yellowsVsNoRed = () => {
        const override = () => {
            res[side].players[pIndex].effort.red = true;

            updater(res);
        };

        userMsg({
            message: 'Klicka för att ge rött kort',
            type: 'warning',
            callback: override,
            dissmiss: {
                duration: 5000,
                onScreen: false
            }
        }).add();
    };

    // CHECKS

    // goals input vs cleanSheet
    if (key === 'goals' && val > 0) {
        goalsVsCleanSheet();
    }

    // cleanSheet input vs goals
    if (key === 'cleanSheet' && val === true) {
        cleanSheetVsGoals();
    }

    // penaltySaves vs position
    if (key == 'penaltySaves' && player.position !== 'Goalkeeper') {
        savesVsPosition();
    }

    // 2 yellows vs no red
    if (key === 'yellows' && val > 1 && !player.effort.red) {
        yellowsVsNoRed();
    }
};

export default handleResultConflicts;
