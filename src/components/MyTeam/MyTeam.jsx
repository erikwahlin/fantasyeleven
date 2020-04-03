import React, { Component } from 'react';
import styled from 'styled-components';
import { players } from './players';
import MyTeamCtx from './ctx';
import PlayerSearch from '../PlayerSearch';
import Pitch from '../Pitch';
import  '../PlayerSearch/styles.css';

import tempField from '../../media/temp_field.jpg';

const Content = styled.div`
	display: flex;
	flex-direction:row;
	justify-content:center;
	height:100vh;
	width:100%;
`;

const ContentWrap = styled.div`
	width:	70%;
	display: flex;
	flex-direction:row;
	justify-content:space-between;
	/* flex-wrap:wrap; */
`;


// convert millions to less
const allPlayers = players.map(player => ({
	...player,
	price: Math.round(parseFloat(player.price))
}));

// get clubs
const allClubs = [...new Set(allPlayers.map(item => item.club))];

const initial_state = {
	filter: {
		all: false,
		keys: {
			uid: [],
			position: [],
			club: []
		}
	},

	team: {
		list: [],

		captain: false,

		pitch: {
			Goalkeeper: [],
			Defender: [],
			Midfielder: [],
			Forward: []
		},
		bench: {
			Goalkeeper: [],
			Defender: [],
			Midfielder: [],
			Forward: []
		},

		clubs: {},

		count: {
			tot: {
				Goalkeeper: 0,
				Defender: 0,
				Midfielder: 0,
				Forward: 0
			},
			pitch: {
				Goalkeeper: 0,
				Defender: 0,
				Midfielder: 0,
				Forward: 0
			},
			bench: {
				Goalkeeper: 0,
				Defender: 0,
				Midfielder: 0,
				Forward: 0
			}
		}
	},

	game: {
		boosts: [],
		value: 0,
		round: 666
	},

	config: {
		limit: {
			tot: { min: 15, max: 15 },
			pitch: {
				Goalkeeper: { min: 1, max: 1 },
				Defender: { min: 3, max: 5 },
				Midfielder: { min: 2, max: 5 },
				Forward: { min: 1, max: 3 }
			},
			bench: {
				Goalkeeper: { min: 1, max: 1 },
				Defender: { min: 1, max: 1 },
				Midfielder: { min: 1, max: 1 },
				Forward: { min: 1, max: 1 }
			},
			club: { max: 3 }
		},
		positions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
		switch: {
			a: null,
			b: null
		}
	}
};

export default class MyTeam extends Component {
	constructor(props) {
		super(props);
		this.state = JSON.parse(JSON.stringify({ ...initial_state }));

		this.updateState = this.updateState.bind(this);
		this.addHandler = this.addHandler.bind(this);
		this.addPlayer = this.addPlayer.bind(this);
		this.updateLimit = this.updateLimit.bind(this);
		this.updateFilter = this.updateFilter.bind(this);
		this.applyFilter = this.applyFilter.bind(this);
		this.delHandler = this.delHandler.bind(this);
		this.setMarkedPlupp = this.setMarkedPlupp.bind(this);
		this.setTargetPlupp = this.setTargetPlupp.bind(this);
		this.switchPlayers = this.switchPlayers.bind(this);
	}

	updateState = (key, val, callback) => {
		this.setState(
			{
				[key]: val
			},
			() => {
				if (typeof callback === 'function') return callback();
			}
		);
	};

	setMarkedPlupp = ({ playFromStart, pos, index, ref, clear }) => {
		const { config } = this.state;

		if (clear) {
			config.switch.a = null;
			return this.setState({ config });
		}

		const pitchOrBench = playFromStart ? 'pitch' : 'bench';

		config.switch.a = {
			pitchOrBench,
			pos,
			index,
			ref
		};

		this.setState({ config });
	};

	setTargetPlupp = ({ playFromStart, pos, index, ref, clear }) => {
		const { config } = this.state;

		/* if (clear) {
			config.switch.b = null;
			return this.setState({ config });
		} */

		const pitchOrBench = playFromStart ? 'pitch' : 'bench';

		config.switch.b = {
			pitchOrBench,
			pos,
			index,
			ref
		};

		this.setState({ config });
	};

	updateFilter = callback => {
		const { config, team, filter } = this.state;

		config.positions.forEach(pos => {
			// if pitch and bench full - add pos to filter (if filter is not active)
			if (
				team.bench[pos].length >= config.limit.bench[pos].max &&
				team.pitch[pos].length >= config.limit.pitch[pos].max
			) {
				if (!filter.keys.position.includes(pos)) {
					filter.keys.position.push(pos);
				}
				// else remove pos from filter (if filter is active)
			} else {
				if (filter.keys.position.includes(pos)) {
					const index = filter.keys.position.indexOf(pos);
					filter.keys.position.splice(index, 1);
				}
			}
		});

		Object.keys(team.clubs).forEach(club => {
			if (team.clubs[club] >= 3) {
				if (!filter.keys.club.includes(club)) filter.keys.club.push(club);
			} else {
				if (filter.keys.club.includes(club)) {
					const index = filter.keys.club.indexOf(club);
					filter.keys.club.splice(index, 1);
				}
			}
		});
		this.setState({ filter });
	};

	applyFilter = input => {
		const { team, filter } = this.state;
		const { keys: filterKeys } = filter;

		// 15 players already picked? - bail
		if (team.list.length >= 15) {
			return [];
		}

		const f = (players, key) => {
			const res = players.filter(player => {
				let willReturn = true;

				filterKeys[key].forEach(val => {
					if (player[key] === val) {
						willReturn = false;
					}
				});

				return willReturn;
			});

			return res;
		};

		return f(f(f(input, 'club'), 'position'), 'uid');
	};

	// update formation rules (limits)
	updateLimit = () => {
		const { config, team } = this.state;

		// fresh copy of initial limits
		config.limit.pitch = JSON.parse(JSON.stringify(initial_state.config.limit.pitch));

		// desctructure initial limits
		const {
			Defender: defLimit,
			Midfielder: midLimit,
			Forward: forLimit
		} = initial_state.config.limit.pitch;

		// curr pitch count
		const { Defender: defCount, Midfielder: midCount, Forward: forCount } = team.count.pitch;

		//// Defender
		// scenario -1
		let newDefLimit = defLimit.max;
		if (midCount >= 5 || midCount + forCount === 6) {
			newDefLimit = defLimit.max - 1; // 4
		}

		// scenario -2
		if (midCount + forCount >= 7) {
			newDefLimit = defLimit.max - 2; // 3
		}
		config.limit.pitch.Defender.max = newDefLimit;

		//// Midfielder
		// scenario -1
		let newMidLimit = midLimit.max;
		if (defCount >= 5 || defCount + forCount === 6 || forCount >= 3) {
			newMidLimit = midLimit.max - 1; // 4
		}

		// scenario -2
		if (defCount + forCount === 7) {
			newMidLimit = midLimit.max - 2; // 3
		}

		// scenario -3
		if (defCount + forCount >= 8) {
			newMidLimit = midLimit.max - 3; // 1
		}
		config.limit.pitch.Midfielder.max = newMidLimit;

		//// Forward
		// scenario -1
		let newForLimit = forLimit.max;
		if (defCount >= 5 || midCount >= 5 || defCount + midCount === 8) {
			newForLimit = forLimit.max - 1; // 2
			console.log('forward down 1', newForLimit);
		}

		// scenario -2
		if (defCount + midCount >= 9) {
			newForLimit = forLimit.max - 2; // 1
			console.log('forward down 2', newForLimit);
		}
		config.limit.pitch.Forward.max = newForLimit;

		this.setState({ config }, () => {
			this.updateFilter();
		});
	};

	addPlayer = (player, playFromStart = true) => {
		// we need state
		const { team, filter, game } = this.state;

		// set play vs bench-props
		player.playFromStart = playFromStart;
		const pitchOrBench = playFromStart ? 'pitch' : 'bench';

		///// -> player.captain = filter.keys.captain //do i do this here?

		// add player to list
		team.list.push(player);

		// inc team value
		game.value += player.price;

		// add player to formation on pitch or bench
		team[pitchOrBench][player.position].push(player);

		// inc count for player's club
		team.clubs[player.club] = team.clubs[player.club] + 1 || 1;

		// inc count for player's pos
		team.count.tot[player.position] += 1;
		team.count[pitchOrBench][player.position] += 1;

		// filter out player's uid from PlayerSearch
		filter.keys.uid.push(player.uid);

		// update state
		this.setState({ team, filter, game }, () => {
			this.updateLimit();
		});
	};

	addHandler = player => {
		// we need state and new player pos
		const { config, team } = this.state;
		const { position: pos } = player;
		// player with same pos on pitch already reached limit? prepare bench
		///////const putOnBench = team.pitch[pos].length >= config.limit.pitch[pos].max ? true : false;
		const playFromStart = team.pitch[pos].length < config.limit.pitch[pos].max ? true : false;

		// add player
		this.addPlayer(player, playFromStart);

		return;
	};

	delHandler = player => {
		const { team, filter, game, config } = this.state;
		const { position: pos } = player;
		const pitchOrBench = player.playFromStart ? 'pitch' : 'bench';

		//dec team value
		game.value -= player.price;

		// del player from list
		team.list.forEach((item, nth) => {
			if (item.uid === player.uid) {
				team.list.splice(nth, 1);
			}
		});

		// del player from pitch or bench
		team[pitchOrBench][pos].forEach((item, nth) => {
			if (item.uid === player.uid) {
				// if pitch, del from pitch
				//if (player.playFromStart) {
				team[pitchOrBench][pos].splice(nth, 1);
				//}
				//if bench, just clear bench pos
				//else {
				//	team.bench[pos] = [];
				//}
			}
		});

		// if pitch-player was removed
		/* if (player.playFromStart) {
			// if same pos sitting on bench
			if (team.bench[pos].length > 0) {
				// copy lucky benchwarmer
				const luckyBenchWarmer = JSON.parse(JSON.stringify(team.bench[pos][0]));

				// clear bench pos
				team.bench[pos] = [];

				// let lucky benchwarmer play!
				/* luckyBenchWarmer.pitch = true;
				luckyBenchWarmer.bench = false;
				team.pitch[pos].push(luckyBenchWarmer); 
				this.addPlayer(luckyBenchWarmer);
			}
		} */

		// dec count
		team.count.tot[pos] -= 1;
		team.count[pitchOrBench][pos] -= 1;

		// del from clubs
		team.clubs[player.club] = team.clubs[player.club] - 1;
		if (team.clubs[player.club] < 1) {
			delete team.clubs[player.club];
		}

		// remove player's uid from filter
		filter.keys.uid.forEach((uid, nth) => {
			if (uid === player.uid) {
				filter.keys.uid.splice(nth, 1);
			}
		});

		this.setState({ team, filter, game, config }, () => {
			this.updateLimit();
			console.log('player deleted', player);
		});
	};

	/* Needs work */
	// maybe loop through positions on pitch/bench and update playFromStart?
	switchPlayers = ({ a, b }) => {
		const { team, config } = this.state;

		config.switch.b = {
			playFromStart: b.playFromStart || null,
			pos: b.pos,
			index: b.index,
			ref: b.ref || null
		};
		/* this.setTargetPlupp(
			{
				playFromStart: b.playFromStart || null,
				pos: b.pos,
				index: b.index,
				ref: b.ref || null
			},
			() => console.log('set target plupp')
		); */

		console.log(a, b);

		const a_temp = JSON.parse(JSON.stringify(a));
		const b_temp = JSON.parse(JSON.stringify(b));
		const playerA = a.player ? JSON.parse(JSON.stringify(a.player)) : null;
		const playerB = a.player ? JSON.parse(JSON.stringify(b.player)) : null;

		// if !b or b was on bench, set !playFromStart for a
		const updatePitchOrBench = x => {
			if (x.player) {
				console.log(
					x.player.name,
					'was on',
					x.pitchOrBench,
					'and had playfromstart',
					x.player.playFromStart
				);
				if (x.pitchOrBench === 'pitch') {
					return true;
				}
			}
			console.log('x was undefined');
			return false;
		};

		const fromStartA = updatePitchOrBench(b_temp);
		const fromStartB = updatePitchOrBench(a_temp);

		// if plupp 1 contains player, take plupp 2's place
		// a to b
		if (a.player !== null) {
			console.log('switching item b');
			team[b.pitchOrBench][b.pos][b.index] = playerA;
		}
		// else delete player plupp 2 player
		else {
			team[b.pitchOrBench][b.pos].splice([b.index], 1);
			console.log('removing marked item b');
		}

		// and vice versa
		// b to a
		if (b.player !== null) {
			console.log('switching item a');
			team[a.pitchOrBench][a.pos][a.index] = playerB;
		} else {
			console.log('removing marked item a');
			team[a.pitchOrBench][a.pos].splice([a.index], 1);

			team[b.pitchOrBench][b.pos][b.index].playFromStart = false;
		}

		if (team[b.pitchOrBench][b.pos][b.index]) {
			team[b.pitchOrBench][b.pos][b.index].playFromStart = fromStartA;
		}

		if (team[a.pitchOrBench][a.pos][a.index]) {
			team[a.pitchOrBench][a.pos][a.index].playFromStart = fromStartB;
		}

		config.switch.a = null;
		// temp-fix for bug
		if (b.pitchOrBench === 'pitch') {
			config.switch.b = null;
		}

		this.setState({ team, config }, () => {
			this.updateLimit();
		});
	};

	render() {
		// MyTeam-funcs in ctx
		const setters = {
			updateState: this.updateState,
			addHandler: this.addHandler,
			delHandler: this.delHandler,
			setMarkedPlupp: this.setMarkedPlupp,
			switchPlayers: this.switchPlayers
		};

		const { team, game } = this.state;

		// filter allPlayers before PlayerSearch
		const filteredPlayers = this.applyFilter(allPlayers);

		return (
			<MyTeamCtx.Provider
				value={{
					state: this.state,
					setters
				}}
			>
				<Content>
					<ContentWrap>
					<Pitch />
				
						<PlayerSearch players={filteredPlayers} />
					</ContentWrap>
				</Content>
			</MyTeamCtx.Provider>
		);
	}
}
