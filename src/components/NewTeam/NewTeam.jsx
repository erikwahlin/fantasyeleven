import React, { Component } from 'react';
import styled from 'styled-components';
import { clone } from '../../constants/helperFuncs';
import * as preset from '../../constants/gamePreset';
import NewTeamCtx from './ctx';
import INITIAL_STATE, { allPlayers } from './config';
import PlayerSearch from '../PlayerSearch';
import '../PlayerSearch/styles.css';
import BuildStages from './BuildStages';
import { isMobile, isBrowser } from 'react-device-detect';
import { Offline, Online, Detector } from 'react-detect-offline';

import { withAuthentication } from '../Session';

import apis from '../../constants/api';

const ContentWrap = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 90%;
    grid-gap: 0px 20px;

    @media screen and (min-height: 700px) and (max-width: 500px) {
        grid-template-rows: 70px 632px;
    }

    @media screen and (min-width: 501px) {
        @media screen and (max-height: 600px) {
            grid-template-rows: 70px 550px;
        }

        @media screen and (min-height: 765px) {
            grid-template-rows: 70px 700px;
        }

        @media screen and (min-width: 900px) {
            grid-template-columns: auto 550px 300px auto;

            @media screen and (min-width: 1000px) {
                grid-template-columns: auto 650px 300px auto;
            }
        }
    }
`;

class NewTeam extends Component {
    constructor(props) {
        super(props);
        this.state = clone(INITIAL_STATE);

        this.updatesearchablePlayers = this.updatesearchablePlayers.bind(this);
        this.updateLimit = this.updateLimit.bind(this);
        this.updateTeam = this.updateTeam.bind(this);
        this.updateFilterKeys = this.updateFilterKeys.bind(this);
        this.applyFilter = this.applyFilter.bind(this);

        this.addPlayer = this.addPlayer.bind(this);
        this.delPlayer = this.delPlayer.bind(this);
        this.setSwitchers = this.setSwitchers.bind(this);
        this.switchPlayers = this.switchPlayers.bind(this);
        this.checkMarkedMode = this.checkMarkedMode.bind(this);

        this.toggleMobileSearch = this.toggleMobileSearch.bind(this);
        this.openPlayerSearch = this.openPlayerSearch.bind(this);
        this.closePlayerSearch = this.closePlayerSearch.bind(this);
        this.setStage = this.setStage.bind(this);

        this.userInit = this.userInit.bind(this);
        this.load = this.load.bind(this);
        this.save = this.save.bind(this);
        this.mongoLoad = this.mongoLoad.bind(this);
        this.mongoSave = this.mongoSave.bind(this);
        this.clientLoad = this.clientLoad.bind(this);
        this.clientSave = this.clientSave.bind(this);
    }

    componentDidMount = async () => {
        await this.userInit();
        this.updatesearchablePlayers();
    };

    // get curr user
    userInit = async () => {
        if (!this.state.appOnline) {
            this.save();
            this.updatesearchablePlayers();
            return;
        }

        console.log('user init');
        await this.props.firebase.auth.onAuthStateChanged(user => {
            // if logged in, use/load from mongo
            if (user) {
                this.setState({ user: user.uid }, async () => {
                    this.load();
                });
            }

            // if not logged in, use client storage
            else {
                console.log('Not logged in. Using client-storage.');
                // if local data, load, else create
                if (localStorage.getItem('team')) {
                    this.load();
                } else {
                    this.save();
                    this.updatesearchablePlayers();
                }
            }
        });
    };

    /*
     *
     *
     *
     *
     * SAVE/LOAD TEAM
     * * * * * * * * * */
    save = () => (this.state.user && this.state.appOnline ? this.mongoSave() : this.clientSave());

    load = () => (this.state.user && this.state.appOnline ? this.mongoLoad() : this.clientLoad());

    mongoLoad = async () => {
        // user exists in db?
        await apis
            .get('getById', this.state.user)
            .then(async res => {
                // if no, save new user
                if (!res.data || res.data === '') {
                    // create user in DB
                    const newUser = {
                        _id: this.state.user,
                        activeTeam: {
                            ...this.state.team
                        }
                    };

                    console.log('loaded team', newUser);

                    return await apis
                        .create(newUser)
                        .then(res => {
                            console.log(res);
                        })
                        .catch(err => console.log(err));
                }

                // if yes, load user
                // load user!
                const user = res.data.data;
                this.setState(
                    ps => ({
                        ...ps,
                        team: { ...user.activeTeam }
                    }),
                    () => {
                        console.log('Successfully loaded from mongo.');
                        this.updateTeam();
                    }
                );
            })
            .catch(err => {
                // if db unavailable, load from client
                console.log('DB unavailable, using client storage.');
                this.clientLoad();
            });
    };

    mongoSave = async () => {
        const _id = this.state.user;

        const payload = {
            _id,
            activeTeam: { ...this.state.team }
        };

        await apis
            .update(_id, payload)
            .then(res => {
                //console.log(res);
            })
            .catch(err => {
                console.log(err);
                // if db unavailable, save to client
                console.log('DB unavailable, using client storage.');
                this.clientSave();
            });
    };

    clientLoad = () => {
        const data = JSON.parse(localStorage.getItem('team'));
        if (data) {
            this.setState({ team: data }, () => {
                this.updateTeam();
            });
        }
    };

    clientSave = () => localStorage.setItem('team', JSON.stringify(this.state.team));

    /*
     *
     *
     *
     *
     * UPDATE/SYNC STATE
     * * * * * * * * * * */
    updateTeam = callback => {
        // current state, but initial values on the props to update

        const newTeam = {
            ...clone(this.state.team),
            game: clone(INITIAL_STATE.team.game),
            pitch: clone(INITIAL_STATE.team.pitch),
            bench: clone(INITIAL_STATE.team.bench),
            count: clone(INITIAL_STATE.team.count),
            clubs: clone(INITIAL_STATE.team.clubs)
        };

        // sort list
        newTeam.list.sort((a, b) => a.lineupIndex - b.lineupIndex);

        // set right indexes if wrong
        newTeam.list.forEach((p, nth) => {
            p.lineupIndex = nth;
        });

        this.state.team.list.forEach(player => {
            const { position: pos, origin, club } = player;
            // map player objs
            newTeam[origin][pos].push(player);

            // count
            newTeam.count.tot[pos]++;
            newTeam.count[origin][pos]++;

            // game.value
            newTeam.game.value.tot += player.price;
            newTeam.game.value[origin] += player.price;

            // clubs
            newTeam.clubs[club] = newTeam.clubs[club] + 1 || 1;
        });

        this.setState(
            ps => ({ ...ps, team: newTeam }),
            () => {
                this.updateLimit();

                if (typeof callback === 'function') callback();
            }
        );
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

    updateFilterKeys = callback => {
        // updater, based on clone of curr state config
        const updater = prevState => {
            const { config, team } = clone(prevState);
            const { filterKeys, buildStage } = config;
            const { list } = team;

            // filter positions
            preset.positions.forEach(pos => {
                // if pitch and bench full - add pos to filter (if filter is not active)
                if (
                    (prevState.team.bench[pos].length >= config.limit.bench[pos].max &&
                        buildStage.key === 'bench') ||
                    (prevState.team.pitch[pos].length >= config.limit.pitch[pos].max &&
                        buildStage.key === 'pitch')
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

            // filter clubs
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

            // add to uid-filter
            list.forEach(player => {
                const matchIndex = filterKeys.uid.indexOf(player.uid);

                // if exists on pitch but not in filter, add
                if (matchIndex < 0) {
                    config.filterKeys.uid.push(player.uid);
                }
            });

            // remove from uid-filter
            const playerUids = list.map(player => player.uid);
            filterKeys.uid.forEach((uid, nth) => {
                const matchIndex = playerUids.indexOf(uid);

                // if exists in filter but not on pitch, remove
                if (matchIndex < 0) {
                    config.filterKeys.uid.splice(nth, 1);
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

    /*
     *
     *
     *
     *
     * INDIRECT DOM INTERACTION
     * * * * * * * * * * * * * * */
    setStage = newStage => {
        this.setState(ps => ({ config: { ...ps.config, buildStage: newStage } }));
    };

    toggleMobileSearch = () => {
        this.setState(
            ps => ({
                config: { ...ps.config, mobileSearch: !ps.config.mobileSearch }
            }),
            () => {
                if (this.state.config.mobileSearch) {
                    this.closePlayerSearch();
                } else {
                    this.openPlayerSearch();
                }
            }
        );
    };

    openPlayerSearch = () => {
        if (!this.state.config.searchOpen) {
            this.setState(ps => ({
                config: { ...ps.config, searchOpen: true }
            }));
        }
    };

    closePlayerSearch = () => {
        if (this.state.config.searchOpen) {
            this.setState(ps => ({
                config: { ...ps.config, searchOpen: false }
            }));
        }
    };

    /*
     *
     *
     *
     *
     * PLUPP/PLAYER ACTIONS
     * * * * * * * * * * * * */

    // check if a plupp/player is marked
    checkMarkedMode = () => {
        const { marked, target } = this.state.config.switchers;
        return marked && !target ? true : false;
    };

    // update switchers (marked/target) plupps (takes in new data as key/val-obj, optional callback)
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

    addPlayer = clickedPlayer => {
        // use clone of clicked player
        const player = clone(clickedPlayer);
        const { position: pos, club, uid } = player;

        const updater = prevState => {
            // use clones of curr state
            const { team, config } = prevState;
            const { key: stageName } = config.buildStage;

            player.lineupIndex = team.list.length;
            player.origin = stageName;
            team.list.push(player);

            return { team };
        };

        // update state
        this.setState(
            ps => ({ ...updater(ps) }),
            () => {
                this.setSwitchers({ marked: null, target: null }, () => {
                    this.updateTeam(() => {
                        this.save();
                        this.updateLimit();
                    });
                });
            }
        );
    };

    delPlayer = options => {
        // use player, read only

        const updater = prevState => {
            // use clones of curr state for mutation
            const { team, config } = clone(prevState);

            const { marked } = config.switchers;
            const { key: stageName } = config.buildStage;

            // clear all players
            if (options.delAll) {
                let lucky = [];
                team.list.forEach(p => {
                    if (p.origin !== stageName) {
                        lucky.push(p);
                    }
                });

                team.list = clone(lucky);

                // clear filterKeys
                config.filterKeys = clone(INITIAL_STATE.config.filterKeys);

                return { team, config };
            }

            team.list.splice([options.index || marked.lineupIndex], 1);
            return { team };
        };

        // update state, then update limits
        this.setState(
            ps => ({ ...updater(ps) }),
            () => {
                this.setSwitchers({ marked: null, target: null }, () => {
                    this.updateTeam(() => {
                        this.save();
                        this.updateLimit();
                    });
                });
            }
        );
    };

    // maybe loop through positions on pitch/bench and update playFromStart?
    switchPlayers = () => {
        const { team, config } = clone(this.state);
        const { key: stageName } = config.buildStage;

        const { marked, target } = config.switchers;
        const fromList = target.origin === 'list';

        // just in case, if marked/target not set, clear switchers and bail
        if (!marked || (!marked && !target)) {
            console.log('Something went wrong when switching players.');

            this.setSwitchers({ marked: null, target: null });

            return;
        }

        if (stageName === 'pitch') {
            // update marked with target-vals
            const tempMarked = clone(marked.player);
            const tempTarget = clone(target.player);

            team.list.splice(marked.lineupIndex, 1, tempTarget);
            team.list[marked.lineupIndex].lineupIndex = marked.lineupIndex;
            team.list[marked.lineupIndex].origin = stageName;

            // if not from list, vice versa
            if (!fromList) {
                team.list.splice(target.lineupIndex, 1, tempMarked);
                team.list[target.lineupIndex].lineupIndex = target.lineupIndex;
            }

            this.setState({ team }, () => {
                this.setSwitchers({ marked: null, target: null }, () => {
                    this.updateTeam(() => {
                        this.save();
                        this.updateLimit();
                    });
                });
            });

            return;
        }

        if (stageName === 'bench') {
            // update marked with target-vals
            const tempMarked = marked.player && clone(marked.player);
            const tempTarget = clone(target.player);

            // if empty plupp was marked, just add player
            if (!tempMarked) {
                tempTarget.origin = stageName;
                tempTarget.lineupIndex = team.list.length;

                return this.addPlayer(tempTarget);
            }

            team.list.splice(marked.lineupIndex, 1, tempTarget);
            team.list[marked.lineupIndex].lineupIndex = marked.lineupIndex;
            team.list[marked.lineupIndex].origin = stageName;

            // if not from list, vice versa
            if (!fromList) {
                team.list.splice(target.lineupIndex, 1, tempMarked);
                team.list[target.lineupIndex].lineupIndex = target.lineupIndex;
            }

            this.setState({ team }, () => {
                this.setSwitchers({ marked: null, target: null }, () => {
                    this.updateTeam(() => {
                        this.save();
                        this.updateLimit();
                    });
                });
            });

            return;
        }
    };

    render() {
        const { searchablePlayers, switchers, mobileSearch, buildStage } = this.state.config;

        // NewTeam-funcs in ctx
        const setters = {
            addPlayer: this.addPlayer,
            delPlayer: this.delPlayer,
            setSwitchers: this.setSwitchers,
            switchPlayers: this.switchPlayers,
            openPlayerSearch: this.openPlayerSearch,
            closePlayerSearch: this.closePlayerSearch,
            toggleMobileSearch: this.toggleMobileSearch,
            setStage: this.setStage,
            updateFilterKeys: this.updateFilterKeys
        };

        const markedMode = switchers.marked && !switchers.target ? true : false;

        // filter allPlayers before PlayerSearch

        return (
            <NewTeamCtx.Provider
                value={{
                    state: this.state,
                    setters
                }}
            >
                <Detector
                    render={({ online }) => null}
                    onChange={online => this.setState({ appOnline: online })}
                />
                {/* <SlideMenu
					active={this.state.slideMenuActive}
					nav={[{ id: 'header', label: 'playerlist', path: '/home' }]}
					reactRouter={false}
					closeMenu={this.togglePlayerSearch}
					extraComponent={<div>ej</div>}
				> */}

                <ContentWrap
                    className="ContentWrap"
                    markedMode={markedMode}
                    mobileSearch={mobileSearch}
                >
                    <BuildStages buildStage={buildStage} />
                    {/* <Pitch /> */}

                    <PlayerSearch players={searchablePlayers} markedMode={this.checkMarkedMode()} />
                </ContentWrap>
            </NewTeamCtx.Provider>
        );
    }
}

export default withAuthentication(NewTeam);
