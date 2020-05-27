import React, { Component, createContext } from 'react';
import { withFirebase } from '../Firebase/context';
import apis from '../../constants/api';
import { getPlayers } from '../../constants/players';
import { clone, userMsg, updateMsg, errMsg } from '../../constants/helperFuncs';
import { compose } from 'recompose';
import { typeOf } from 'react-notifications-component/dist/js/react-notifications.dev';

const AdminContext = createContext(null);

const initialState = {
    user: '',
    allUsers: [],
    settings: {
        updatedBy: '',
        activeRound: ''
    },
    rounds: [],
    results: [],
    players: [],

    editPlayer: '',
    newPlayer: false
};

class AdminState extends Component {
    constructor(props) {
        super(props);

        this.state = clone(initialState);

        // General updater
        this.updateAdminState = this.updateAdminState.bind(this);
        this.getUsers = this.getUsers.bind(this);

        // Settings
        this.readSettings = this.readSettings.bind(this);
        this.updateSettings = this.updateSettings.bind(this);

        // Rounds
        this.readRounds = this.readRounds.bind(this);
        this.createRound = this.createRound.bind(this);
        this.updateRound = this.updateRound.bind(this);
        this.deleteRound = this.deleteRound.bind(this);
        // Result
        this.readResults = this.readResults.bind(this);
        this.updateResult = this.updateResult.bind(this);
        // Players
        this.readPlayers = this.readPlayers.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.updatePlayer = this.updatePlayer.bind(this);
        this.deletePlayer = this.deletePlayer.bind(this);
        // Share
        this.setters = {
            updateSettings: this.updateSettings,
            updateAdminState: this.updateAdminState,
            createRound: this.createRound,
            updateRound: this.updateRound,
            deleteRound: this.deleteRound,
            updateResult: this.updateResult,
            addPlayer: this.addPlayer,
            deletePlayer: this.deletePlayer,
            updatePlayer: this.updatePlayer
        };
    }

    componentDidMount = () => {
        this.userInit(admin => {
            if (!admin) {
                errMsg(
                    'Kunde inte fastställa admin-rättigheter. Vänligen logga in på nytt.',
                    10000
                ).add();
                return;
            }
            // admin-funcs
            this.getUsers();
            this.readSettings();
            this.readRounds();
            this.readResults();
            this.readPlayers();
        });
    };

    userInit = async callback => {
        await this.props.firebase.auth.onAuthStateChanged(async user => {
            // check/set admin details
            if (user) {
                await this.props.firebase
                    .user(user.uid)
                    .once('value')
                    .then(snapshot => {
                        this.setState(
                            {
                                user: {
                                    uid: user.uid,
                                    username: snapshot.val().username,
                                    email: snapshot.val().email,
                                    roles: snapshot.val().roles
                                }
                            },
                            () => {
                                if (typeof callback === 'function') callback(true);
                            }
                        );
                    });
            } else if (typeof callback === 'function') callback(false);
        });
    };

    getUsers = async () => {
        await this.props.firebase.users().on(
            'value',
            snap => {
                const users = Object.entries(snap.val()).map(user => ({
                    uid: user[0],
                    username: user[1].username,
                    email: user[1].email
                }));
                this.setState({ users });
            },
            err => {
                console.log('get users fail', err);
            }
        );
    };

    updateAdminState = (key, val) => {
        if (!this.state.user.roles.includes('ADMIN')) {
            return errMsg('Logga in på nytt med admin-rättigheter.').add();
        }

        this.setState(ps => ({ ...ps, [key]: val }));
    };

    readSettings = async callback => {
        await apis
            .read({ action: 'readSettings' })
            .then(res => {
                if (res.status <= 200) {
                    // if no activeRound, set empty obj
                    const settings = {
                        ...res.data.data,
                        activeRound: res.data.data.activeRound || {}
                    };

                    this.setState({ settings }, () => {
                        if (typeof callback === 'function') callback();
                    });
                }
            })
            .catch(err => {
                console.log(`Failed to read settings (${err})`);
            });
    };

    updateSettings = async ({ key, val, msg }) => {
        const { user } = this.state;
        if (!user.roles.includes('ADMIN')) {
            return errMsg('Logga in på nytt med admin-rättigheter.').add();
        }

        await apis
            .update({ action: 'updateSettings', payload: { key, val, user } })
            .then(res => {
                console.log('Updated settings', key);

                this.readSettings();

                if (typeof msg === 'string') {
                    updateMsg(msg).add();
                }
            })
            .catch(err => {
                console.log(`Failed to update settings ${err}`);
                console.log('tried to update with settings:', key, val);
            });
    };

    readRounds = async callback => {
        if (!this.state.user.roles.includes('ADMIN')) {
            return errMsg('Logga in på nytt med admin-rättigheter.').add();
        }

        await apis
            .read({ action: 'readRounds' })
            .then(res => {
                if (res.status <= 200) {
                    this.setState({ rounds: res.data.data.reverse() }, () => {
                        if (typeof callback === 'function') callback();
                    });
                } else {
                    console.log('No rounds found.');
                }
            })
            .catch(err => {
                console.log(`Failed to get rounds (${err})`);
            });
    };

    createRound = async ({ payload, onSuccess }) => {
        if (!this.state.user.roles.includes('ADMIN')) {
            return errMsg('Logga in på nytt med admin-rättigheter.').add();
        }

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
            if (r.alias === payload.alias) {
                isTaken = true;
                return;
            }
        });

        if (isTaken) return taken.add();

        console.log('will create (adminst)', payload);

        await apis
            .create({ action: 'createRound', payload })
            .then(res => {
                if (res.status <= 200) {
                    conf.add();

                    this.setState({ rounds: [] }, () => {
                        this.readRounds();
                    });

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

    updateRound = (newRound, onSuccess) => {
        if (!this.state.user.roles.includes('ADMIN')) {
            return errMsg('Logga in på nytt med admin-rättigheter.').add();
        }

        console.log('round to update', newRound.users);

        const update = async (round, conf = true) => {
            await apis
                .update({ action: 'updateRound', payload: round })
                .then(res => {
                    this.readRounds();

                    if (conf) {
                        updateMsg('Omgång uppdaterad', 1000).add();
                    }

                    if (typeof onSuccess === 'function') onSuccess();
                })
                .catch(err => {
                    console.log('err when updating round', err);

                    errMsg().add();
                });
        };

        update(newRound);
    };

    deleteRound = async ({ payload }) => {
        if (!this.state.user.roles.includes('ADMIN')) {
            return errMsg('Logga in på nytt med admin-rättigheter.').add();
        }

        await apis
            .delete({ action: 'deleteRound', _id: payload._id })
            .then(res => {
                this.readRounds();

                const delMsg = userMsg({
                    message: `Omgång ${payload.alias} borttagen!`,
                    dismiss: { duration: 3000 }
                });

                delMsg.add();

                // if this was an active round, update settings
                if (payload._id === this.state.settings.activeRound._id) {
                    this.updateSettings({
                        key: 'activeRound',
                        val: {}
                    });
                }
            })
            .catch(err => {
                console.log('err when deleting round:', err);

                errMsg('Något gick fel vid radering.').add();
            });
    };

    readResults = async (payload = 'all') => {
        await apis
            .read({ action: 'readResults', payload })
            .then(async res => {
                this.setState({ results: res.data.data });
            })
            .catch(err => {
                //setLoading(false);
                console.log('err when getting player result');
            });
    };

    createResult = async ({ payload, callback }) => {
        if (!this.state.user.roles.includes('ADMIN')) {
            return errMsg('Logga in på nytt med admin-rättigheter.').add();
        }

        await apis
            .create('createResult', payload)
            .then(async res => {
                if (!res) return console.log('Failed to get back a post response.');

                const results = res.data.data;
                console.log('Created new player result!', results);

                // update result state with post response
                this.setState({ results }, () => {
                    // display conf-msg
                    const confirmation = userMsg({
                        message: 'Nytt resultat skapat!',
                        dismiss: {
                            duration: 2000
                        },
                        type: 'success'
                    });
                    confirmation.add();

                    if (typeof callback === 'function') callback();
                });
            })

            .catch(err => {
                console.log('Failed to create new player result.', err);
            });
    };

    updateResult = async payload => {
        if (!this.state.user.roles.includes('ADMIN')) {
            return errMsg('Logga in på nytt med admin-rättigheter.').add();
        }

        await apis
            .update({ action: 'updateResult', payload })
            .then(res => {
                this.setState({ results: res });
            })
            .catch(err => {
                console.log(`Failed to update res ${err}`);
            });
    };

    readPlayers = async callback => {
        await apis
            .read({ action: 'readPlayers' })
            .then(async res => {
                // if no, create new user
                if (!res.data || res.data === '') {
                    return console.log('no player-data was returned.');
                }

                // if yes, load user
                const players = res.data.data;

                this.setState({ players });

                window.players = players;
            })
            .catch(err => {
                // if db unavailable, load from client
                console.log('Getting players failed.');
            });
    };

    addPlayer = async payload => {
        if (!this.state.user.roles.includes('ADMIN')) {
            return errMsg('Logga in på nytt med admin-rättigheter.').add();
        }

        console.log('addPlayer in adminstate...');
        await apis
            .create({ action: 'createPlayer', payload })
            .then(res => {
                this.readPlayers();
                const addMsg = userMsg({
                    message: 'Spelare tillagd!',
                    dismiss: { duration: 3000 },
                    type: 'success'
                });

                addMsg.add();
            })
            .catch(err => {
                console.log('err when adding player', err);

                errMsg().add();
            });
    };

    updatePlayer = async (e, player) => {
        e.preventDefault();

        if (!this.state.user.roles.includes('ADMIN')) {
            return errMsg('Logga in på nytt med admin-rättigheter.').add();
        }

        if (player.name === '' || isNaN(Number(player.price))) {
            const invalidMsg = userMsg({
                type: 'warning',
                message: 'Vänligen fyll i samtliga fält',
                dismiss: { duration: 3000 }
            });

            invalidMsg.add();
            return;
        }

        await apis
            .update({ action: 'updatePlayer', payload: player })
            .then(res => {
                this.readPlayers();
                updateMsg('Spelare uppdaterad!').add();
            })
            .catch(err => {
                console.log('err when updating player', err);

                errMsg().add();
            });
    };

    deletePlayer = async player => {
        if (!this.state.user.roles.includes('ADMIN')) {
            return errMsg('Logga in på nytt med admin-rättigheter.').add();
        }

        await apis
            .delete({ action: 'deletePlayer', _id: player._id })
            .then(res => {
                // empty form
                this.readPlayers();
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

export default withFirebase(AdminState);

export const withAdmin = Component => props => (
    <AdminContext.Consumer>
        {Admin => <Component {...props} adminContext={Admin} />}
    </AdminContext.Consumer>
);
