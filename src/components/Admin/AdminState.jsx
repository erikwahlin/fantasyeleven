import React, { Component, createContext } from 'react';
import apis from '../../constants/api';
import { getPlayers } from '../../constants/players';
import { clone, userMsg } from '../../constants/helperFuncs';

const AdminContext = createContext(null);

const errMsg = userMsg({
    message: 'Något gick fel!',
    dismiss: { duration: 3000 },
    type: 'error'
});

export default class AdminState extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: null,
            editPlayer: null,
            newPlayer: false,
            rounds: []
        };

        this.updateAdminState = this.updateAdminState.bind(this);

        this.updatePlayer = this.updatePlayer.bind(this);
        this.deletePlayer = this.deletePlayer.bind(this);
        this.getPlayers = this.getPlayers.bind(this);
        this.getRounds = this.getRounds.bind(this);
        this.addRound = this.addRound.bind(this);
        this.updateRound = this.updateRound.bind(this);

        this.setters = {
            updateAdminState: this.updateAdminState,
            getPlayers: this.getPlayers,
            addPlayer: this.addPlayer,
            deletePlayer: this.deletePlayer,
            updatePlayer: this.updatePlayer,
            getRounds: this.getRounds,
            addRound: this.addRound,
            updateRound: this.updateRound
        };
    }

    componentDidMount = () => {
        this.getPlayers();
        this.getRounds();
    };

    updateAdminState = (key, val) => {
        this.setState(ps => ({ ...ps, [key]: val }));
    };

    getRounds = async onSuccess => {
        await apis
            .get('getRounds')
            .then(res => {
                if (res.status <= 200) {
                    this.setState({ rounds: res.data.data.reverse() });

                    if (typeof onSuccess === 'function') return onSuccess();
                } else {
                    console.log('No rounds found.');
                }
            })
            .catch(err => {
                console.log(`Failed to get rounds (${err})`);
            });
    };

    addRound = async (round, onSuccess) => {
        const fail = userMsg({
            message: 'Något gick fel',
            dismiss: { duration: 3000 },
            type: 'danger'
        });

        const taken = userMsg({
            message: 'Alias upptaget!',
            dismiss: { duration: 3000 },
            type: 'danger'
        });

        const conf = userMsg({
            message: 'Ny omgång skapad!',
            dismiss: { duration: 3000 },
            type: 'success'
        });

        let isTaken = false;
        this.state.rounds.forEach(r => {
            if (r.alias === round.alias) {
                isTaken = true;
                return;
            }
        });

        if (isTaken) return taken.add();

        await apis
            .create('addRound', round)
            .then(res => {
                if (res.status <= 200) {
                    conf.add();

                    this.getRounds();

                    if (typeof onSuccess === 'function') return onSuccess();
                } else {
                    fail.add();
                }
            })
            .catch(err => {
                fail.add();

                console.log(`Failed to add new round (${err})`);
            });
    };

    updateRound = newRound => {
        const deactivated = (() => {
            let res = null;
            if (!newRound.active) return res;

            this.state.rounds.forEach(r => {
                if (r.active) {
                    res = { ...clone(r), active: false };
                }
            });

            return res;
        })();

        const update = async (round, conf = true) => {
            await apis.admin
                .updateRound(round)
                .then(res => {
                    this.getRounds();

                    if (conf) {
                        const updateMsg = userMsg({
                            message: 'Omgång uppdaterad!',
                            dismiss: { duration: 1000 },
                            type: 'success'
                        });

                        updateMsg.add();
                    }
                })
                .catch(err => {
                    console.log('err when updating round', err);

                    errMsg.add();
                });
        };

        if (deactivated !== null) {
            update(deactivated, false);
        }

        update(newRound);
    };

    getPlayers = async callback => {
        await apis
            .get('getPlayers')
            .then(async res => {
                // if no, create new user
                if (!res.data || res.data === '') {
                    return console.log('no player-data was returned.');
                }

                // if yes, load user
                const players = res.data.data;

                this.setState({ players });
            })
            .catch(err => {
                // if db unavailable, load from client
                console.log('Getting players failed.');
            });
    };

    addPlayer = async player => {
        console.log('addPlayer in adminstate...');
        await apis.admin
            .addPlayer(player)
            .then(res => {
                this.getPlayers();
                const addMsg = userMsg({
                    message: 'Spelare tillagd!',
                    dismiss: { duration: 3000 },
                    type: 'success'
                });

                addMsg.add();
            })
            .catch(err => {
                console.log('err when adding player', err);

                errMsg.add();
            });
    };

    updatePlayer = async (e, player) => {
        e.preventDefault();

        if (player.name === '' || isNaN(Number(player.price))) {
            const invalidMsg = userMsg({
                type: 'warning',
                message: 'Vänligen fyll i samtliga fält',
                dismiss: { duration: 3000 }
            });

            invalidMsg.add();
            return;
        }

        await apis.admin
            .updatePlayer(player)
            .then(res => {
                this.getPlayers();
                const updateMsg = userMsg({
                    message: 'Spelare uppdaterad',
                    dismiss: { duration: 3000 }
                });

                updateMsg.add();
            })
            .catch(err => {
                console.log('err when updating player', err);

                errMsg.add();
            });
    };

    deletePlayer = async player => {
        console.log('del player frontend...', player);
        await apis.admin
            .deletePlayer(player._id)
            .then(res => {
                // empty form
                this.getPlayers();
                const delMsg = userMsg({
                    message: 'Spelare borttagen',
                    dismiss: { duration: 3000 }
                });

                delMsg.add();
            })
            .catch(err => {
                console.log('err when deleting player:', err);

                errMsg.add();
            });
    };

    render() {
        return (
            <AdminContext.Provider
                value={{
                    state: this.state,
                    setters: this.setters
                }}
            >
                {this.props.children}
            </AdminContext.Provider>
        );
    }
}

export const withAdmin = Component => props => (
    <AdminContext.Consumer>
        {Admin => <Component {...props} adminContext={Admin} />}
    </AdminContext.Consumer>
);
