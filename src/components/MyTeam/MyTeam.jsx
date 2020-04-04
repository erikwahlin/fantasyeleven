import React, { Component } from 'react';
import styled from 'styled-components';
import { players } from './players';
import MyTeamCtx from './ctx';
import PlayerSearch from '../PlayerSearch/index';
import Pitch from '../Pitch';
import '../PlayerSearch/styles.css';

import cloneDeep from 'lodash.clonedeep';

import tempField from '../../media/temp_field.jpg';

const ContentWrap = styled.div`
	width: 90%;
	max-width: 1200px;
	margin: auto;
	display: flex;

	flex-direction: row;
	justify-content: space-around;

	& > .PlayerSearch {
		flex: 1;
	}
`;

// convert millions to less
const allPlayers = players.map(player => ({
	...player,
	price: Math.round(parseFloat(player.price))
}));

// get clubs
const allClubs = [...new Set(allPlayers.map(item => item.club))];

const initial_state = {
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
		filterKeys: {
			uid: [],
			position: [],
			club: []
		},
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

		switchers: {
			marked: null,
			target: null
		}
	}
};

export default class MyTeam extends Component {
	constructor(props) {
		super(props);
		this.state = JSON.parse(JSON.stringify({ ...initial_state }));

		this.updateState = this.updateState.bind(this);
		this.addPlayer = this.addPlayer.bind(this);
		this.updateLimit = this.updateLimit.bind(this);
		this.updateFilterKeys = this.updateFilterKeys.bind(this);
		this.applyFilter = this.applyFilter.bind(this);
		this.delHandler = this.delHandler.bind(this);
		this.setSwitchers = this.setSwitchers.bind(this);
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

	// update switchers plupps (takes in new data as key/val-obj, optional callback)
	setSwitchers = (data, callback) => {
		console.log('setMarked...!');

		const { config } = this.state;

		// update switchers with given data
		Object.keys(data).forEach(key => {
			// log changes (temp)
			if (config.switchers[key] !== data[key]) {
				console.log(`Updated switchers.${key} to ${data[key]}`);
			}

			// give new val
			config.switchers[key] = data[key];
		});

		// update state, then do opt callback
		this.setState({ config }, () => {
			if (typeof callback === 'function') {
				return callback();
			}
		});
	};

	updateFilterKeys = callback => {
		const { config, team } = this.state;
		const { filterKeys } = config;

		config.positions.forEach(pos => {
			// if pitch and bench full - add pos to filter (if filter is not active)
			if (
				team.bench[pos].length >= config.limit.bench[pos].max &&
				team.pitch[pos].length >= config.limit.pitch[pos].max
			) {
				if (!filterKeys.position.includes(pos)) {
					filterKeys.position.push(pos);
				}
				// else remove pos from filter (if filter is active)
			} else {
				if (filterKeys.position.includes(pos)) {
					const index = filterKeys.position.indexOf(pos);
					filterKeys.position.splice(index, 1);
				}
			}
		});

		Object.keys(team.clubs).forEach(club => {
			if (team.clubs[club] >= 3) {
				if (!filterKeys.club.includes(club)) filterKeys.club.push(club);
			} else {
				if (filterKeys.club.includes(club)) {
					const index = filterKeys.club.indexOf(club);
					filterKeys.club.splice(index, 1);
				}
			}
		});
		this.setState({ config });
	};

	// filter before playerSearch-result
	applyFilter = input => {
		const { team, config } = this.state;
		const { filterKeys } = config;

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
			this.updateFilterKeys();
		});
	};

	addPlayer = player => {
		// we need
		const { position: pos, club, uid } = player;
		const { team, game, config } = this.state;
		const { filterKeys } = config;
		const { pitch } = team;

		// play from start or put on bench?
		const origin = pitch[pos].length < config.limit.pitch[pos].max ? 'pitch' : 'bench';
		player.origin = origin;

		///// -> player.captain = filterKeys.captain //do i do this here?

		// add player to list
		team.list.push(player);

		// add player to formation on pitch or bench
		team[origin][pos].push(player);

		// inc team value
		game.value += player.price;

		// inc count for player's club
		team.clubs[club] = team.clubs[club] + 1 || 1;

		// inc count for player's pos
		team.count.tot[pos] += 1;
		team.count[origin][pos] += 1;

		// filter out player's uid from PlayerSearch
		filterKeys.uid.push(uid);

		// update state
		this.setState({ team, config, game }, () => {
			this.updateLimit();
		});
	};

	delHandler = player => {
		const { position: pos, uid, club, name, origin } = player;
		const { team, game, config } = this.state;
		const { filterKeys } = config;

		//dec team value
		game.value -= player.price;

		// del player from list
		team.list.forEach((item, nth) => {
			if (item.uid === uid) {
				team.list.splice(nth, 1);
			}
		});

		// del player from pitch or bench
		team[origin][pos].forEach((item, nth) => {
			if (item.uid === uid) {
				team[origin][pos].splice(nth, 1);
			}
		});

		// dec count
		team.count.tot[pos] -= 1;
		team.count[origin][pos] -= 1;

		// del from clubs
		team.clubs[club] = team.clubs[club] - 1;
		if (team.clubs[club] < 1) {
			delete team.clubs[club];
		}

		// remove player's uid from filter
		filterKeys.uid.forEach((filterUid, nth) => {
			if (uid === filterUid) {
				filterKeys.uid.splice(nth, 1);
			}
		});

		// update state, then update limits
		this.setState({ team, game, config }, () => {
			console.log(name, 'was kicked from team.');
			this.updateLimit();
		});
	};

	// maybe loop through positions on pitch/bench and update playFromStart?
	switchPlayers = () => {
		const { team, config } = this.state;
		const { marked, target } = config.switchers;

		// just in case, if marked/target not set, clear switchers and bail
		if (!marked || !target) {
			console.log('Tried to switch plupps but marked or target not set.');

			this.setSwitchers({ marked: null, target: null }, () => {
				console.log('Switchers cleared.');
			});

			return;
		}

		// deep clone switchers with vanilla
		const clone = (obj, keyName) => {
			// if level bottom or key is 'ref' return val
			if (obj === null || typeof obj !== 'object' || keyName === 'ref') {
				return obj;
			}

			const copy = obj.constructor();

			for (var key in obj) {
				copy[key] = clone(obj[key], key);
			}
			return copy;
		};

		// copies
		const markedClone = clone(marked);
		const targetClone = clone(target);

		// the new marked (<- target data)
		// if player, set target player, else del
		if (target.player) {
			// update origin
			targetClone.player.origin = markedClone.origin;

			team[marked.origin][marked.pos][marked.lineupIndex] = targetClone.player;
		} else {
			team[marked.origin][marked.pos].splice(marked.lineupIndex, 1);
		}

		// the new target (<- marked data)
		// if player, set target player, else del
		if (marked.player) {
			// update origin
			markedClone.player.origin = targetClone.origin;

			team[target.origin][target.pos][target.lineupIndex] = markedClone.player;
		} else {
			team[target.origin][target.pos].splice(target.lineupIndex, 1);
		}

		this.setState({ team, config }, () => {
			this.setSwitchers({ marked: null, target: null }, () => {
				this.updateLimit();
			});
		});
	};

	render() {
		// MyTeam-funcs in ctx
		const setters = {
			updateState: this.updateState,
			addPlayer: this.addPlayer,
			delHandler: this.delHandler,
			setSwitchers: this.setSwitchers,
			switchPlayers: this.switchPlayers
		};

		// filter allPlayers before PlayerSearch
		const filteredPlayers = this.applyFilter(allPlayers);

		return (
			<MyTeamCtx.Provider
				value={{
					state: this.state,
					setters
				}}
			>
				<div className="MyTeam Content">
					<ContentWrap className="ContentWrap">
						<Pitch />

						<PlayerSearch players={filteredPlayers} />
					</ContentWrap>
				</div>
			</MyTeamCtx.Provider>
		);
	}
}
