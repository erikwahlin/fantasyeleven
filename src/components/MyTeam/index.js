import React, { Component } from 'react';
import { players } from './players';
import PlayerSearch from '../PlayerSearch';

export default class MyTeam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usersTeam: []
		};
	}

	render() {
		return <PlayerSearch
		team={this.state.usersTeam}
		 players={players} />;
	}
}
