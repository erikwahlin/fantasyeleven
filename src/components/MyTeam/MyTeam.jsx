import React, { Component } from 'react';
import styled from 'styled-components';
import { clone } from './helperFuncs';
import MyTeamCtx from './ctx';
import INITIAL_STATE, { allPlayers } from './config';
import PlayerSearch from '../PlayerSearch';
import Pitch from '../Pitch';
import '../PlayerSearch/styles.css';

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

export default class MyTeam extends Component {
	constructor(props) {
		super(props);
		this.state = clone(INITIAL_STATE);

		this.updateState = this.updateState.bind(this);
		this.updatesearchablePlayers = this.updatesearchablePlayers.bind(this);
		this.addPlayer = this.addPlayer.bind(this);
		this.updateLimit = this.updateLimit.bind(this);
		this.updateFilterKeys = this.updateFilterKeys.bind(this);
		this.applyFilter = this.applyFilter.bind(this);
		this.delPlayer = this.delPlayer.bind(this);
		this.setSwitchers = this.setSwitchers.bind(this);
		this.switchPlayers = this.switchPlayers.bind(this);

		//this.clearField = this.clearField.bind(this);
		this.checkMarkedMode = this.checkMarkedMode.bind(this);
	}

	componentDidMount = () => {
		this.updatesearchablePlayers();
	};

	clearField = () => {
		//do something! Set state to what it was initially, before adding players to pitch.
	}

	updateState = (key, val, callback) => {
		this.setState({ [key]: val }, () => {
			if (typeof callback === 'function') return callback();
		});
	};

	updatesearchablePlayers = callback => {
		// update clone of curr config in state
		const update = input => {
			const res = clone(input);
			// set new search res
			res.searchablePlayers = this.applyFilter(allPlayers);
			return res;
		};

		this.setState(
			// use deep clone of curr config in state
			ps => ({ config: update(ps.config) }),
			() => {
				if (typeof callback === 'function') {
					return callback();
				}
			}
		);
	};

	// update switchers plupps (takes in new data as key/val-obj, optional callback)
	setSwitchers = (data, callback = null) => {
		// update clone of curr config in state
		const update = input => {
			const res = clone(input);
			// update switchers with given data
			Object.keys(data).forEach(key => {
				// give new val
				res.switchers[key] = data[key];
			});

			return res;
		};

		this.setState(
			ps => ({
				config: update(ps.config)
			}),
			() => {
				// optional callback
				this.updatesearchablePlayers(callback);
			}
		);
	};

	checkMarkedMode = () => {
		const { marked, target } = this.state.config.switchers;
		return marked && !target ? true : false;
	};

	updateFilterKeys = callback => {
		// updater, based on clone of curr state config
		const updater = prevState => {
			const { config } = clone(prevState);
			const { filterKeys } = config;

			config.positions.forEach(pos => {
				// if pitch and bench full - add pos to filter (if filter is not active)
				if (
					prevState.team.bench[pos].length >= config.limit.bench[pos].max &&
					prevState.team.pitch[pos].length >= config.limit.pitch[pos].max
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

			Object.keys(prevState.team.clubs).forEach(club => {
				if (prevState.team.clubs[club] >= 3) {
					if (!filterKeys.club.includes(club)) filterKeys.club.push(club);
				} else {
					if (filterKeys.club.includes(club)) {
						const index = filterKeys.club.indexOf(club);
						filterKeys.club.splice(index, 1);
					}
				}
			});

			return config;
		};

		this.setState(
			ps => ({ config: updater(ps) }),
			() => {
				this.updatesearchablePlayers();
			}
		);
	};

	// filter before playerSearch-result
	applyFilter = input => {
		const { team, config } = this.state;
		const { filterKeys, switchers } = config;
		const { marked, target } = switchers;

		// marked plupp?
		const markedMode = marked && !target ? true : false;

		// if 15 players picked and no plupp marked, bail
		if (team.list.length >= 15 && !markedMode) {
			return [];
		}

		// filter func
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

		// we never want uid-duplicates (picked vs unpicked players)
		const uniqueUids = f(input, 'uid');

		// if marked plupp, return all unpicked players with plupp's pos-prop
		if (markedMode) {
			return uniqueUids.filter(player => player.position === marked.pos);
		}

		// else filter by remaining keys
		return f(f(uniqueUids, 'club'), 'position');
	};

	// update formation rules (limits)
	updateLimit = () => {
		// updater, based on curr state
		const updater = prevState => {
			// use clone of curr config for mutation
			const { config } = clone(prevState);

			// reset config limits to initial state
			config.limit.pitch = clone(INITIAL_STATE.config.limit.pitch);

			// use initial limits to compare
			const {
				Defender: defLimit,
				Midfielder: midLimit,
				Forward: forLimit
			} = INITIAL_STATE.config.limit.pitch;

			// curr pitch count
			const {
				Defender: defCount,
				Midfielder: midCount,
				Forward: forCount
			} = prevState.team.count.pitch;

			// Mutate config based on scenario

			/*
			 * DEFENDER
			 *************/

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

			/*
			 * MIDFIELDER
			 *************/

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

			/*
			 * FORWARD
			 *************/

			// scenario -1
			let newForLimit = forLimit.max;
			if (defCount >= 5 || midCount >= 5 || defCount + midCount === 8) {
				newForLimit = forLimit.max - 1; // 2
			}

			// scenario -2
			if (defCount + midCount >= 9) {
				newForLimit = forLimit.max - 2; // 1
			}
			config.limit.pitch.Forward.max = newForLimit;

			return config;
		};

		// update state
		this.setState(
			ps => ({ config: updater(ps) }),
			() => {
				this.updateFilterKeys();
			}
		);
	};

	addPlayer = clickedPlayer => {
		// use clone of clicked player
		const player = clone(clickedPlayer);
		const { position: pos, club, uid } = player;

		const updater = prevState => {
			// use clones of curr state
			const { team, config, game } = prevState;

			const { filterKeys } = config;
			const { pitch } = team;

			// play from start or put on bench?
			const origin = player.origin
				? player.origin
				: pitch[pos].length < config.limit.pitch[pos].max
					? 'pitch'
					: 'bench';
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

			// return updated props
			return {
				team,
				config,
				game
			};
		};

		// update state
		this.setState(
			ps => ({ ...updater(ps) }),
			() => {
				this.updateLimit();
			}
		);
	};

	delPlayer = player => {
		// use player, read only
		const { position: pos, uid, club, origin } = player;

		const updater = prevState => {
			// use clones of curr state for mutation
			const { team, config, game } = clone(prevState);

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

			return {
				team,
				config,
				game
			};
		};

		// update state, then update limits
		this.setState(
			ps => ({ ...updater(ps) }),
			() => {
				this.updateLimit();
			}
		);
	};

	// maybe loop through positions on pitch/bench and update playFromStart?
	switchPlayers = () => {
		// just in case, if marked/target not set, clear switchers and bail
		const { marked, target } = this.state.config.switchers;
		const fromList = target.origin === 'list';

		if (!marked || (!marked && !target)) {
			console.log('Something went wrong when switching players.');

			this.setSwitchers({ marked: null, target: null });

			return;
		}

		/* // if marked but no target, assume that player wants a quick switch (field to bench or bench to field)
		if (marked && !target && marked.player) {
			// check limits (do this before in plupp-component???)

			const { player } = clone(this.state.config.switchers.marked);

			// del player in team.origin (splice)

			// toggle player origin

			// add player in team.origin (push)

			// update player count (origin)

			// update state, done?
			this.setState(ps => ({}));

			this.setSwitchers({ marked: null, target: null }, () => {
				this.updateLimit();
			});

			return;
		} */

		// if marked is empty seat on bench, we only do this
		const addToBench = () => {
			const { target } = clone(this.state.config.switchers);

			target.player.origin = 'bench';

			this.setSwitchers({ marked: null, target: null }, () => {
				this.addPlayer(target.player);
			});
		};

		// updater, based on curr state
		const updater = prevState => {
			// use clones of curr state for mutation
			const { team, config, game } = clone(prevState);

			const { marked, target } = config.switchers;

			/*
			 * UPDATE MARKED
			 ****************/

			// if target contains player, marked = target, else del marked
			if (target.player) {
				// update origin
				target.player.origin = marked.origin;

				team[marked.origin][marked.pos][marked.lineupIndex] = target.player;
			} else {
				team[marked.origin][marked.pos].splice(marked.lineupIndex, 1);

				// update team count, marked origin -1, target origin +1
				team.count[marked.origin][marked.pos] -= 1;
				team.count[target.origin][target.pos] += 1;
			}

			// if target is listed player
			if (fromList) {
				// if marked plupp is empty bench, just add listed player to bench
				if (!marked.player && marked.origin === 'bench') {
					target.player.origin = 'bench';
					this.setSwitchers({ marked: null, target: null }, () => {
						this.addPlayer(target.player);
					});

					return;
				}

				//replace in team.list
				team.list.forEach((item, nth) => {
					if (item.uid === marked.player.uid) {
						team.list[nth] = target.player;
					}
				});

				//calculate new team value (curr val + (old player - new player))
				if (marked.player.price !== target.player.price) {
					game.value += Math.round(marked.player.price) - Math.round(target.player.price);
				}

				//update club-count
				const markedClub = marked.player.club;
				const targetClub = target.player.club;

				if (markedClub !== targetClub) {
					team.clubs[markedClub] -= 1;
					if (team.clubs[markedClub] < 1) {
						delete team.clubs[markedClub];
					}
					team.clubs[targetClub] = team.clubs[targetClub] + 1 || 1;
				}

				// replace uid in filterKeys
				config.filterKeys.uid.forEach((uid, nth) => {
					if (uid === marked.player.uid) {
						config.filterKeys.uid[nth] = target.player.uid;
					}
				});
			} else {
				/*
				 * UPDATE TARGET
				 ****************/
				// if marked contains player, target = marked, else del target
				if (marked.player) {
					// update origin
					marked.player.origin = target.origin;

					team[target.origin][target.pos][target.lineupIndex] = marked.player;
				} else {
					team[target.origin][target.pos].splice(target.lineupIndex, 1);

					// update team count, marked origin +1, target origin -1
					team.count[target.origin][target.pos] -= 1;
					team.count[marked.origin][marked.pos] += 1;
				}
			}

			return {
				team,
				config,
				game
			};
		};

		// if marked was empty seat on bench, just add new player
		if (!marked.player && marked.origin === 'bench' && fromList) return addToBench();

		// else update state with the switch
		this.setState(
			ps => ({ ...updater(ps) }),
			() => {
				this.setSwitchers({ marked: null, target: null }, () => {
					this.updateLimit();
				});
			}
		);
	};

	render() {
		const { searchablePlayers } = this.state.config;

		// MyTeam-funcs in ctx
		const setters = {
			updateState: this.updateState,
			addPlayer: this.addPlayer,
			delPlayer: this.delPlayer,
			setSwitchers: this.setSwitchers,
			switchPlayers: this.switchPlayers
		};

		// filter allPlayers before PlayerSearch

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

						<PlayerSearch players={searchablePlayers} markedMode={this.checkMarkedMode()} />
					</ContentWrap>
				</div>
			</MyTeamCtx.Provider>
		);
	}
}
