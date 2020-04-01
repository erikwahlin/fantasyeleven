import React, { Component } from 'react';
import styled from 'styled-components';
import { players } from './players';
import MyTeamCtx from './ctx';
import PlayerSearch from '../PlayerSearch';
import Pitch from '../Pitch';

import tempField from '../../media/temp_field.jpg';

const Content = styled.div`
	width: 100vw;
	max-width: 800px;
	margin: auto;
	display: flex;
	flex-wrap: wrap;

	& > div.Pitch {
		flex: 3;
	}

	& > div.Sidebar {
		flex: 1;
	}
`;

const Sidebar = styled.div``;

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

		field: {
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
			field: {
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
			field: {
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
		positions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward']
	}
};

export default class MyTeam extends Component {
	constructor(props) {
		super(props);
		this.state = JSON.parse(JSON.stringify({ ...initial_state }));

		this.addHandler = this.addHandler.bind(this);
		this.addPlayer = this.addPlayer.bind(this);
		this.updateLimit = this.updateLimit.bind(this);
		this.updateFilter = this.updateFilter.bind(this);
		this.applyFilter = this.applyFilter.bind(this);
		this.delHandler = this.delHandler.bind(this);
	}

	updateFilter = () => {
		const { config, team, filter } = this.state;

		// any position limit reached on bench?
		config.positions.forEach(pos => {
			// (field already full) - add pos to filter
			if (team.bench[pos].length >= config.limit.bench[pos].max) {
				if (!filter.keys.position.includes(pos)) {
					filter.keys.position.push(pos);
					this.setState({ filter });
				}
				// (field not full) - remove pos from filter
			} else {
				if (filter.keys.position.includes(pos)) {
					const index = filter.keys.position.indexOf(pos);
					filter.keys.position.splice(index, 1);
					this.setState({ filter });
				}
			}
		});
	};

	applyFilter = players => {
		const { team, filter } = this.state;
		const { keys: filterKeys } = filter;

		// 15 players already picked? - bail
		if (team.list.length >= 15) {
			return [];
		}

		const f = (items, key) => {
			const res = items.filter(item => {
				let willReturn = true;

				filterKeys[key].forEach(val => {
					if (item[key] === val) {
						willReturn = false;
					}
				});

				return willReturn;
			});

			return res;
		};

		return f(f(f(players, 'club'), 'position'), 'uid');
	};

	// update formation rules (limits)
	updateLimit = () => {
		const { config, team } = this.state;

		// fresh copy of initial limits
		config.limit.field = JSON.parse(JSON.stringify(initial_state.config.limit.field));

		// desctructure initial limits
		const {
			Defender: defLimit,
			Midfielder: midLimit,
			Forward: forLimit
		} = initial_state.config.limit.field;

		// curr field count
		const { Defender: defCount, Midfielder: midCount, Forward: forCount } = team.count.field;

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
		config.limit.field.Defender.max = newDefLimit;

		//// Midfielder
		// scenario -1
		let newMidLimit = midLimit.max;
		if (defCount >= 5 || defCount + forCount === 6) {
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
		config.limit.field.Midfielder.max = newMidLimit;

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
		config.limit.field.Forward.max = newForLimit;

		this.setState({ config }, () => {
			this.updateFilter();
		});
	};

	addPlayer = (player, toBench = false) => {
		// we need state
		const { team, filter } = this.state;

		// set play vs bench-props
		player.field = !toBench;
		player.bench = toBench;
		const fieldOrBench = toBench ? 'bench' : 'field';

		// add player to list
		team.list.push(player);

		// add player to formation on field or bench
		team[fieldOrBench][player.position].push(player);

		// inc count for player's club
		team.clubs[player.club] = team.clubs[player.club] + 1 || 1;

		// inc count for player's pos
		team.count.tot[player.position] += 1;
		team.count[fieldOrBench][player.position] += 1;

		// filter out player's uid from PlayerSearch
		filter.keys.uid.push(player.uid);

		// update state
		this.setState({ team, filter }, () => {
			this.updateLimit();
		});
	};

	addHandler = player => {
		// we need state and new player pos
		const { config, team } = this.state;
		const { position: pos } = player;

		// player with same pos on field already reached limit? prepare bench
		const putOnBench = team.field[pos].length >= config.limit.field[pos].max ? true : false;

		// add player
		this.addPlayer(player, putOnBench);

		return;
	};

	delHandler = player => {
		const { team, filter } = this.state;
		const { position: pos } = player;
		const fieldOrBench = player.field ? 'field' : 'bench';

		// del player from
		// list
		team.list.forEach((item, nth) => {
			if (item.uid === player.uid) {
				team.list.splice(nth, 1);
			}
		});

		// field or bench
		team[fieldOrBench][pos].forEach((item, nth) => {
			if (item.uid === player.uid) {
				team[fieldOrBench][pos].splice(nth, 1);
			}
		});

		// if field-player was removed
		if (player.field) {
			// if same pos sitting on bench
			if (team.bench[pos].length > 0) {
				// copy lucky benchwarmer
				const luckyBenchWarmer = JSON.parse(JSON.stringify(team.bench[pos][0]));

				// clear bench pos
				team.bench[pos] = [];

				// let lucky benchwarmer play!
				/* luckyBenchWarmer.field = true;
				luckyBenchWarmer.bench = false;
				team.field[pos].push(luckyBenchWarmer); */
				this.addPlayer(luckyBenchWarmer);
			}
		}

		// dec count
		team.count.tot[pos] -= 1;
		team.count[fieldOrBench][pos] -= 1;

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

		this.setState({ team, filter }, () => {
			this.updateLimit();
		});
	};

	render() {
		// MyTeam-funcs in ctx
		const setters = {
			addHandler: this.addHandler,
			delHandler: this.delHandler
		};

		const { config, team } = this.state;

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
					<Pitch />

					<Sidebar className="Sidebar">
						<PlayerSearch players={filteredPlayers} />
					</Sidebar>
				</Content>
			</MyTeamCtx.Provider>
		);
	}
}
