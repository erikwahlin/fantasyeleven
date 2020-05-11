import React, { Component, createContext } from 'react';
import apis from '../../constants/api';
import { getPlayers } from '../../constants/players';
import { clone } from '../../constants/helperFuncs';

const AdminContext = createContext(null);

export default class AdminState extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: null
        };
        this.updatePlayer = this.updatePlayer.bind(this);
        this.deletePlayer = this.deletePlayer.bind(this);
        this.getPlayers = this.getPlayers.bind(this);

        this.setters = {
            getPlayers: this.getPlayers,
            addPlayer: this.addPlayer,
            deletePlayer: this.deletePlayer,
            updatePlayer: this.updatePlayer
        };
    }

    componentDidMount = () => {
        this.getPlayers();
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
            .then(res => this.getPlayers())
            .catch(err => console.log('err when adding player', err));
    };

    updatePlayer = async (e, player) => {
        e.preventDefault();
        await apis.admin
            .updatePlayer(player)
            .then(res => this.getPlayers())
            .catch(err => console.log('err when updating player', err));
    };

    deletePlayer = async player => {
        console.log('del player frontend...', player);
        await apis.admin
            .deletePlayer(player._id)
            .then(res => this.getPlayers())
            .catch(err => console.log('err when deleting player:', err));
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
