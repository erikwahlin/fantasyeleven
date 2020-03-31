import React, { Component } from 'react';
import { players } from './players';
import MyTeamCtx from './ctx';
import PlayerSearch from '../PlayerSearch';

// convert millions to sek
players = players.map(player => ({
	...player,
	price: Math.round(parseFloat(player.price))
}));

const config = {
	posLimit: {
		Goalkeeper: 1,
		Defender: 4,
		Midfielder: 4,
		Forward: 2,
		Bench: 3
	}
};

const initial_state = {
	value: 0,
	team: {
		Goalkeeper: [],
		Defender: [],
		Midfielder: [],
		Forward: [],
		Bench: []
	},
	boosts: [],
	meta: {
		round: 'x'
	}
};

export default class MyTeam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initial_state
		};

		this.addPlayer = this.addPlayer.bind(this);
	}

	playerCount = () => {
		const { team } = this.state;
		return Object.values(team).reduce((tot, next) => {
			return tot + next.length;
		}, 0);
	};

	addPlayer = player => {
		// RULES FOR PICKING TEAM:
		// 1. max 11 players on field
		// 1 Goalkeeper, 4 Defenders, 4 Midfielders, 2 Forwards

		// 2. max 15 players inc bench
		// conditions... (max 3 of same team, bench?)

		// 3. max 3 players from same club

		const { team } = this.state;

		// already 15 picked?
		if (this.playerCount() >= 15) {
			console.log('Already picked 15 players. (Add func to swap players)');
			return;
		}

		// limit reached on pos or bench?
		const posLimitReached =
			team[player.position].length >= config.posLimit[player.position]
				? true
				: false;

		const benchLimitReached =
			team.Bench.length >= config.posLimit.Bench ? true : false;

		if (posLimitReached) {
			console.log('Limit reached for', player.position);

			if (benchLimitReached) {
				console.log('Limit reached on Bench.');
			}
			// put on bench
			else {
				team.Bench.forEach(warmer => {
					// do once-func to test if seat is taken, any true
					if (warmer.position === player.position) {
						console.log('Position already taken on bench');
						return;
					}
				});

				team.Bench.push(player);
				this.setState({ team });
			}

			return;
		}

		// already 3 from same team
		// ...

		// must fill all positions before bench
		// ...

		// add
		team[player.position].push(player);

		this.setState({ team });
	};

	render() {
		const setters = {
			addPlayer: this.addPlayer
		};

		return (
			<MyTeamCtx.Provider
				value={{
					state: this.state,
					setters
				}}
			>
				<PlayerSearch players={players} />
			</MyTeamCtx.Provider>
		);
	}
}
