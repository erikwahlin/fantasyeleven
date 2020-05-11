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
            newPlayer: false
        };

        this.updateAdminState = this.updateAdminState.bind(this);

        this.updatePlayer = this.updatePlayer.bind(this);
        this.deletePlayer = this.deletePlayer.bind(this);
        this.getPlayers = this.getPlayers.bind(this);

        this.setters = {
            updateAdminState: this.updateAdminState,
            getPlayers: this.getPlayers,
            addPlayer: this.addPlayer,
            deletePlayer: this.deletePlayer,
            updatePlayer: this.updatePlayer
        };
    }

    componentDidMount = () => {
        this.getPlayers();
    };

    updateAdminState = (key, val) => {
        this.setState(ps => ({ ...ps, [key]: val }));
    };

    /* loadPlayers = force => {
        if (!this.state.players || force) {
            getPlayers(players => {
                this.setState({ players });
            });
        }
    }; */

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
                    dismiss: { duration: 3000 }
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
