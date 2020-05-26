import React, { Component } from 'react';
import styled from 'styled-components';
import {
    clone,
    timestamp,
    updatedStamp,
    userMsg,
    updateMsg,
    errMsg,
    userTemplate
} from '../../constants/helperFuncs';
import * as preset from '../../constants/gamePreset';
import TeamContext from './ctx';
import * as ROUTES from '../../constants/routes';
import INITIAL_STATE, { allPlayers } from './config';
import PlayerSearch from '../PlayerSearch';
import '../PlayerSearch/styles.css';
import BuildStages from './BuildStages';
import { Detector } from 'react-detect-offline';

import { withAuthentication } from '../Session';
import { withRouter } from 'react-router-dom';

import apis from '../../constants/api';

const routeToSignupMsg = userMsg({
    message: 'Klicka här för att skapa ett konto och lämna in ditt lag!',
    type: 'info',
    container: 'top-center'
});

const ContentWrap = styled.div`
    margin-top: 50px !important;
    @media screen and (min-width: 900px) {
        /* display: grid;
        grid-template-rows: 100%;
        grid-gap: 0px 75px;
        grid-template-columns: auto 550px 300px auto; */
        /* @media screen and (min-width: 1000px) {
            grid-template-columns: auto 650px 300px auto;
        } */

        margin: 0;
        display: flex;
    }

    width: 100%;
    height: 100%;

    @media all and (max-width: 899px) {
        /* prev 480 */

        width: 100%;
        height: 100%;
    }

    @media all and (max-width: 480px) {
        height: auto;
    }
`;

class NewTeam extends Component {
    constructor(props) {
        super(props);
        this.state = { ...clone(INITIAL_STATE) };

        this.updateNewTeam = this.updateNewTeam.bind(this);

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
        this.mongoCreate = this.mongoCreate.bind(this);
        this.mongoSave = this.mongoSave.bind(this);
        this.readPlayers = this.readPlayers.bind(this);
        this.readActiveRound = this.readActiveRound.bind(this);
        this.registerTeam = this.registerTeam.bind(this);

        this.clientLoad = this.clientLoad.bind(this);
        this.clientSave = this.clientSave.bind(this);

        this.saveStageInSession = this.saveStageInSession.bind(this);
        this.loadStageFromSession = this.loadStageFromSession.bind(this);

        this.setters = {
            updateNewTeam: this.updateNewTeam,
            addPlayer: this.addPlayer,
            delPlayer: this.delPlayer,
            setSwitchers: this.setSwitchers,
            switchPlayers: this.switchPlayers,
            openPlayerSearch: this.openPlayerSearch,
            closePlayerSearch: this.closePlayerSearch,
            toggleMobileSearch: this.toggleMobileSearch,
            setStage: this.setStage,
            updateFilterKeys: this.updateFilterKeys,
            registerTeam: this.registerTeam,
            saveStageInSession: this.saveStageInSession
        };
    }

    componentDidMount = () => {
        this.loadStageFromSession();
        this.readActiveRound();
        this.readPlayers(() => {
            this.updatesearchablePlayers(async () => {
                await this.userInit(loggedIn => {
                    if (loggedIn) {
                        this.load();
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
            });
        });
    };

    // updater for team-state (+ save)
    updateNewTeam = newTeam => {
        newTeam.updated = timestamp();

        this.setState({ team: newTeam }, () => {
            this.save();
        });
    };

    // get curr user
    userInit = async callback => {
        if (!this.state.appOnline) {
            this.save();
            this.updatesearchablePlayers();
            return;
        }

        console.log('user init...');

        await this.props.firebase.onAuthUserListener(
            user => {
                this.setState({ user: userTemplate(user) }, () => {
                    // got user
                    if (typeof callback === 'function') callback(true);
                });
            },
            () => {
                // no user
                if (typeof callback === 'function') callback(false);
            }
        );
    };

    /*
     * LATEST BUILDSTAGE
     * * * * * * * * * * */
    saveStageInSession = () => {
        sessionStorage.setItem('buildStage', JSON.stringify(this.state.config.buildStage));
        console.log('Remembering current buildStage in sessionStorage.');
    };

    loadStageFromSession = () => {
        if (this.props.history.action !== 'POP') {
            return console.log('Came from other route. Serving first buildStage.');
        }

        const latestStage = sessionStorage.getItem('buildStage') || null;
        if (!latestStage) {
            return console.log('Latest buildStage not found in session. Serving first buildStage.');
        }

        const config = clone(this.state.config);
        config.buildStage = JSON.parse(latestStage);

        this.setState({ config }, () => {
            console.log('Serving latest buildStage from sessionStorage.');
        });
    };

    /*
     *
     *
     *
     *
     * SAVE/LOAD TEAM
     * * * * * * * * * */
    save = () =>
        /* this.clientSave(); // */ this.state.user && this.state.appOnline
            ? this.mongoSave()
            : this.clientSave();

    load = () =>
        /* this.clientLoad(); // */ this.state.user && this.state.appOnline
            ? this.mongoLoad()
            : this.clientLoad();

    // MONGO
    mongoLoad = async () => {
        // user/team exists?
        await apis
            .read({ action: 'readUser', _id: this.state.user._id })
            .then(async res => {
                // if no, create new user
                if (!res.data || res.data === '') {
                    return this.mongoCreate();
                }

                // if yes, load user
                const user = res.data.data;

                if (!user.newTeam) {
                    return this.clientLoad();
                }

                this.setState(
                    ps => ({
                        ...ps,
                        team: { ...user.newTeam }
                    }),
                    () => {
                        console.log('Loaded team from mongo.');
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

    mongoCreate = async () => {
        // mongo user-obj
        const newUser = {
            _id: this.state.user._id,
            newTeam: {
                ...this.state.team
            },
            registeredTeams: []
        };

        // save to mongo
        await apis
            .create({ action: 'createUser', payload: newUser })
            .then(res => {
                console.log('Created new team in mongo.');
            })
            .catch(err => console.log('Failed to create new team in mongo', err));
    };

    mongoSave = async () => {
        console.log('mongo-save');

        const payload = {
            _id: this.state.user._id,
            newTeam: { ...this.state.team, updated: timestamp() }
        };

        await apis
            .update({ action: 'updateUser', payload })
            .then(res => {
                //console.log(res);
            })
            .catch(err => {
                console.log(err);
                // if db unavailable, save to client
                console.log('Unable to save to mongo.');
                this.clientSave();
            });
    };

    readPlayers = async callback => {
        await apis
            .read({ action: 'readPlayers' })
            .then(res => {
                this.setState(
                    ps => ({ ...ps, config: { ...ps.config, allPlayers: res.data.data } }),
                    () => {
                        if (typeof callback === 'function') callback();
                    }
                );
            })
            .catch(err => {
                console.log('get players fail:', err);
                this.clientLoad();
            });
    };

    readActiveRound = async callback => {
        await apis
            .read({ action: 'readActiveRound' })
            .then(res => {
                if (res.status <= 200) {
                    console.log('round res ', res.data.data);
                    this.setState({ round: res.data.data }, () => {
                        const newTeam = clone(this.state.team);

                        this.setState({ team: newTeam }, () => {
                            if (typeof callback === 'function') callback();
                        });
                    });
                } else {
                    console.log('Active round not found.');
                }
            })
            .catch(err => {
                console.log(`Failed to get active round (${err})`);
            });
    };

    registerTeam = async onSuccess => {
        const { round, user, team } = this.state;

        // save team in ls
        const lsTeam = {
            ...clone(this.state.team),
            round: null
        };
        this.clientSave(lsTeam);

        if (!user) {
            // suggest -> /signup
            routeToSignupMsg.notif.onRemoval = () => {
                // cleanup self before redirection
                routeToSignupMsg.notif.onRemoval = () => {};
                routeToSignupMsg.remove();
                // go
                this.props.history.push(ROUTES.SIGN_UP, this.props.history.location.pathname);
            };

            return routeToSignupMsg.add();
        }

        if (!round) {
            return userMsg({
                message:
                    'Just nu finns ingen aktiv omgång att delta i. Kom tillbaka och prova snart igen!',
                type: 'warning'
            }).add();
        }

        /*         const newRound = clone(round); */

        let alreadyRegistered = false;
        round.users.forEach(item => {
            if (item.user === user._id) {
                alreadyRegistered = true;
            }
        });

        if (alreadyRegistered) {
            return userMsg({
                message: 'Du verkar redan ha registrerat ett lag till den här omgången.',
                type: 'warning'
            }).add();
        }

        const registeredTeam = {
            ...clone(team),
            registered: true,
            registeredAt: timestamp(),
            updated: updatedStamp('Team registered')
        };

        const payload = { userID: user._id, roundID: round._id, registeredTeam };

        await apis
            .create({ action: 'registerTeam', payload })
            .then(res => {
                this.props.history.push({
                    pathname: '/overview'
                });
            })
            .catch(err => {
                console.log('err when registering to round', err);
                errMsg().add();
            });
    };

    // CLIENT

    clientLoad = () => {
        const data = JSON.parse(localStorage.getItem('team'));
        if (data) {
            console.log('Loaded team from Client storage.');
            return this.setState({ team: data }, () => {
                this.updateTeam();
            });
        }
        console.log('No team was loaded, starting fresh.');
    };

    clientSave = (team = this.state.team) =>
        localStorage.setItem(
            'team',
            JSON.stringify({
                ...team,
                updated: timestamp()
            })
        );

    /*
     *
     *
     *
     *
     * UPDATE/SYNC STATE
     * * * * * * * * * * */
    updateTeam = callback => {
        const newTeam = {
            ...clone(this.state.team),
            value: clone(INITIAL_STATE.team.value),
            players: {
                ...clone(INITIAL_STATE.team.players),
                list: this.state.team.players.list
            },
            count: clone(INITIAL_STATE.team.count)
        };

        const { captain, viceCaptain, players } = newTeam;

        // sort list
        players.list.sort((a, b) => a.lineupIndex - b.lineupIndex);

        // set right indexes if wrong
        players.list.forEach((p, nth) => {
            p.lineupIndex = nth;
        });

        // reset captains
        let newCap = null;
        let newViceCap = null;

        players.list.forEach(player => {
            // spot actual captains
            if (captain) {
                if (player._id === captain._id) newCap = player;
            }
            if (viceCaptain) {
                if (player._id === viceCaptain._id) newViceCap = player;
            }

            const { position: pos, origin, club } = player;

            // map player objs
            newTeam.players[origin][pos].push(player);

            // count
            newTeam.count.tot[pos]++;
            newTeam.count[origin][pos]++;

            // team value
            newTeam.value.tot += player.price;
            newTeam.value[origin] += player.price;

            // clubs
            newTeam.count.clubs[club] = newTeam.count.clubs[club] + 1 || 1;
        });

        // set captains
        newTeam.captain = newCap;
        newTeam.viceCaptain = newViceCap;

        // update updated
        newTeam.updated = timestamp();

        this.setState(
            ps => ({ ...ps, team: newTeam }),
            () => {
                if (this.state.round && !this.state.team.round) {
                    console.log('updating team with active round');
                    const teamWithRound = {
                        ...clone(this.state.team),
                        round: this.state.round._id
                    };
                    this.setState({ team: teamWithRound });
                }
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
            const { players, count } = team;

            // filter positions
            preset.positions.forEach(pos => {
                // if pitch and bench full - add pos to filter (if filter is not active)
                if (
                    (players.bench[pos].length >= config.limit.bench[pos].max &&
                        buildStage.stageName === 'bench') ||
                    (players.pitch[pos].length >= config.limit.pitch[pos].max &&
                        buildStage.stageName === 'pitch')
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
            Object.keys(count.clubs).forEach(club => {
                if (count.clubs[club] >= 3) {
                    if (!filterKeys.club.includes(club)) filterKeys.club.push(club);
                } else {
                    if (filterKeys.club.includes(club)) {
                        const index = filterKeys.club.indexOf(club);
                        filterKeys.club.splice(index, 1);
                    }
                }
            });

            // add to uid-filter
            players.list.forEach(player => {
                const matchIndex = filterKeys._id.indexOf(player._id);

                // if exists on pitch but not in filter, add
                if (matchIndex < 0) {
                    config.filterKeys._id.push(player._id);
                }
            });

            // remove from uid-filter
            const playerUids = players.list.map(player => player._id);
            filterKeys._id.forEach((uid, nth) => {
                const matchIndex = playerUids.indexOf(uid);

                // if exists in filter but not on pitch, remove
                if (matchIndex < 0) {
                    config.filterKeys._id.splice(nth, 1);
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
            res.searchablePlayers = this.applyFilter(this.state.config.allPlayers);
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
        const { players } = team;
        const { filterKeys, switchers } = config;
        const { marked, target } = switchers;

        // marked plupp?
        const markedMode = marked && !target ? true : false;

        // if 15 players picked and no plupp marked, bail
        if (players.list.length >= 15 && !markedMode) {
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
        const uniqueUids = f(input, '_id');

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
        this.setState(
            ps => ({ config: { ...ps.config, buildStage: newStage } }),
            () => {
                this.saveStageInSession();
            }
        );
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
            const { players } = team;
            const { stageName } = config.buildStage;

            player.lineupIndex = players.list.length;
            player.origin = stageName;
            players.list.push(player);

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
            const { players } = team;
            const { marked } = config.switchers;
            const { stageName } = config.buildStage;

            // clear all players
            if (options.delAll) {
                let lucky = [];
                players.list.forEach(p => {
                    if (p.origin !== stageName) {
                        lucky.push(p);
                    }
                });

                players.list = clone(lucky);

                // clear filterKeys
                config.filterKeys = clone(INITIAL_STATE.config.filterKeys);

                return { team, config };
            }

            players.list.splice([options.index || marked.lineupIndex], 1);
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
        const { players } = team;
        const { stageName } = config.buildStage;

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

            players.list.splice(marked.lineupIndex, 1, tempTarget);
            players.list[marked.lineupIndex].lineupIndex = marked.lineupIndex;
            players.list[marked.lineupIndex].origin = stageName;

            // if not from list, vice versa
            if (!fromList) {
                players.list.splice(target.lineupIndex, 1, tempMarked);
                players.list[target.lineupIndex].lineupIndex = target.lineupIndex;
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
        /*         if (stageName === 'captain') {
        } */

        if (stageName === 'bench') {
            // update marked with target-vals
            const tempMarked = marked.player && clone(marked.player);
            const tempTarget = clone(target.player);

            // if empty plupp was marked, just add player
            if (!tempMarked) {
                tempTarget.origin = stageName;
                tempTarget.lineupIndex = players.list.length;

                return this.addPlayer(tempTarget);
            }

            players.list.splice(marked.lineupIndex, 1, tempTarget);
            players.list[marked.lineupIndex].lineupIndex = marked.lineupIndex;
            players.list[marked.lineupIndex].origin = stageName;

            // if not from list, vice versa
            if (!fromList) {
                players.list.splice(target.lineupIndex, 1, tempMarked);
                players.list[target.lineupIndex].lineupIndex = target.lineupIndex;
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

        const markedMode = switchers.marked && !switchers.target ? true : false;

        // filter allPlayers before PlayerSearch

        /* console.log('ALLPLAYERS', this.state.allPlayers);
        console.log('SEARCHABLE PLAYERS', this.state.config.searchablePlayers); */

        return (
            <TeamContext.Provider
                value={{
                    state: this.state,
                    setters: this.setters
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
                    <PlayerSearch players={searchablePlayers} markedMode={this.checkMarkedMode()} />
                </ContentWrap>
            </TeamContext.Provider>
        );
    }
}

export default withRouter(withAuthentication(NewTeam));
