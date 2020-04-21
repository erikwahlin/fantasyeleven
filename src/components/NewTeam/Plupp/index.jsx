import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { withTeam } from '../ctx';
import { shortenName, clone } from '../../../constants/helperFuncs';
import onClickOutside from 'react-onclickoutside';
import pluppC from '../../../media/pluppC.svg';
import Delete from '../../../media/delW.svg';
import { FaTrash, FaExchangeAlt } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import allClubs from '../../../constants/clubs';
import InfoModal from '../../InfoModal/index';
import { toSwe } from '../../../constants/helperFuncs';

const Container = styled.div`
    width: 50px;
    height: 50px;
    align-self: center;
    position: relative;
`;

const PlayerName = styled.span`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 120px;
    background-color: rgba(57, 118, 59);
    padding: 3px;
    left: -40px;
    top: 52px;
    font-family: 'Avenir';
    font-weight: bold;
    font-size: 0.9em;
    text-align: center;
    text-shadow: 0 1px 2px #000;
    color: #eee;
    & > :nth-child(1) {
        position: absolute;
        top: 6px;
        left: -5px;
    }
    & > :nth-child(2) {
    }
`;

const PlayerPrice = styled.span`
    position: absolute;
    width: 120px;
    background-color: rgba(51, 170, 51, 0.6);
    left: -40px;
    top: 77px;
    font-family: 'Avenir';
    font-weight: bold;
    font-size: 0.7em;
    text-align: center;
    text-shadow: 0 1px 2px #000;
    color: #eee;
`;

const PluppImg = styled.svg`
    box-shadow: ${p => (p.stageName === 'captain' ? '0px -.5px 4px black' : '')};
    width: 100%;
    position: relative;
    z-index: 1;
    background: white;

    ${p => p.isMarked && 'filter: brightness(.9)'};
    opacity: ${p => (p.isSwitchable ? '.2' : '1')};

    cursor: ${p => (p.stageName === 'pitch' || p.stageName === 'bench' ? 'pointer' : 'normal')};

    height: 100%;
    border-radius: 50%;
    background: ${props =>
        props.player
            ? allClubs.find(obj => {
                  return obj.long === props.player.club;
              }).color.primary
            : '#a6afb6'};
`;

const Options = styled.div`
    position: absolute;
    z-index: 1;
    left: -30px;
    top: ${props => (props.stageName === 'pitch' ? '-23px' : '-13px')};
    /* top: ${props => (props.stageName === 'pitch' ? '-35px' : '-13px')}; */
    width: ${props => (props.stageName === 'pitch' ? '100px' : '90px')};
    height: 40px;
    margin: 0;
    padding: 0;
`;
const Btn = styled.div`
    color: #222;
    position: absolute;
    font-size: 1em;
    font-weight: bold;
    cursor: ${p => (p.stageName === 'captain' ? 'pointer' : 'normal')};
    & > div {
        height: 25px;
        width: 25px;
        color: white;
        /* padding: 3px; */
        background-color: ${props =>
            props.player
                ? allClubs.find(obj => {
                      return obj.long === props.player.club;
                  }).color.secondary
                : ''};
        border-radius: 50%;
        text-align: center;
        display: table-cell;
        vertical-align: middle;
        &:hover {
            background-color: ${props =>
                props.player
                    ? allClubs.find(obj => {
                          return obj.long === props.player.club;
                      }).color.primary
                    : ''};
            color: ${props =>
                props.player
                    ? allClubs.find(obj => {
                          return obj.long === props.player.club;
                      }).color.secondary
                    : ''};
        }
    }
`;

const CaptainBtn = styled(Btn)`
    left: 18px;
`;

const VCaptainBtn = styled(Btn)`
    right: 8px;
`;

const PluppRole = styled.span`
    font-size: 2em;
    left: 15px;
    top: 6px;
    z-index: 1;
    position: absolute;
    color: ${props =>
        props.player
            ? allClubs.find(obj => {
                  return obj.long === props.player.club;
              }).color.secondary
            : '#bfbfbf'};
`;

const DelBtn = styled.button`
    width: 40px;
    height: 100%;
    margin: 0 5px;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 50%;
    background: none;
    color: red;
    font-size: 1em;
    & > * {
        width: 100%;
        height: 100%;
    }
`;

const DelImg = styled.img`
 /*    width: 100%;
    height: 100%;
    max-width: 700px;
    position: absolute; */
`;

const SwitchIcon = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 0;
    text-align: center;
    color: #ccc;
    font-size: 0.5em;

    & > * {
        width: 65%;
        height: 65%;
        margin-top: 16%;
        left: unset;
        top: unset;
    }
`;

class Plupp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMarked: false,
            isSwitchable: false,
            isQuickSwitchable: false
        };

        this.del = this.del.bind(this);
        this.handleClickInside = this.handleClickInside.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.markedPrivilege = this.markedPrivilege.bind(this);
        this.switchablePrivilege = this.switchablePrivilege.bind(this);
        this.syncWithSwitchers = this.syncWithSwitchers.bind(this);
        this.quickSwitch = this.quickSwitch.bind(this);

        this.delBtn = createRef(null);
        this.pluppRef = createRef(null);
        this.switchRef = createRef(null);

        this.setCap = this.setCap.bind(this);
    }

    // on update
    componentDidUpdate = (pp, ps) => {
        this.syncWithSwitchers(pp, ps);
    };

    // check if plupp should be marked
    markedPrivilege = () => {
        const { marked } = this.props.teamContext.state.config.switchers;
        const self = this.pluppRef.current;

        if (marked) {
            if (self === marked.ref) {
                return true;
            }
        }

        return false;
    };

    // check if plupp should be switchable
    switchablePrivilege = () => {
        const { player, teamContext, pos, origin } = this.props;
        const { marked } = teamContext.state.config.switchers;
        const pluppRef = this.pluppRef.current;

        // is switchable if:
        // another plupp is marked, it contains a player or is on bench
        if ((player || origin === 'bench') && marked) {
            if (pos === marked.pos && pluppRef !== marked.ref) {
                return true;
            }
        }
        return false;
    };

    // update marked and switchable
    syncWithSwitchers = (pp, ps) => {
        // get new privileges
        const markedPrivilege = this.markedPrivilege();
        const switchablePrivilege = this.switchablePrivilege();

        // update state if needed
        if (this.state.isMarked !== markedPrivilege) {
            this.setState({ isMarked: markedPrivilege });
        }

        if (this.state.isSwitchable !== switchablePrivilege) {
            this.setState({ isSwitchable: switchablePrivilege });
        }

        // check if bench/pitch has space for another plupp
        const { isMarked, isQuickSwitchable } = this.state;
        const { player, pos, origin, teamContext } = this.props;
        const { config, team } = teamContext.state;

        const quickSwitchable = () => {
            const oppOrigin = origin === 'pitch' ? 'bench' : 'pitch';
            const limit = config.limit[oppOrigin][pos].max;
            const count = team.count[oppOrigin][pos];
            return count < limit ? true : false;
        };

        const qs = isMarked && player ? quickSwitchable() : false;

        if (qs !== isQuickSwitchable) {
            this.setState({ isQuickSwitchable: qs });
        }
    };

    del = () => {
        const { teamContext, player } = this.props;
        const { delPlayer } = teamContext.setters;

        // unmark, then clear switchers, then del ref
        this.setState({ isMarked: false }, () => {
            delPlayer(player);
        });
    };

    // (runs before click inside)
    handleClickOutside = e => {
        if (!this.state.isMarked) return;

        const { setSwitchers, closePlayerSearch } = this.props.teamContext.setters;
        const { buildStage } = this.props.teamContext.state.config;
        const { stageName } = buildStage;

        if (stageName === 'captain') return;

        // if clicked on switchable plupp on pitch or inside playerSearch, bail
        const switchablePlupp = e.target.classList.contains('SwitchablePlupp');
        const playerSearch = e.target.closest('.PlayerSearch');

        if ((e.target.closest('.Pitch') && switchablePlupp) || playerSearch) {
            return;
        }

        // else clear switchers and close playersearch (if slide-opened)

        closePlayerSearch();

        setSwitchers({ marked: null, target: null });
    };

    // (runs after click outside)
    handleClickInside = (e, stageName) => {
        if (stageName === 'captain') return;

        const { teamContext, player, pos, origin } = this.props;
        const { setSwitchers, switchPlayers, openPlayerSearch } = teamContext.setters;
        const { switchers, buildStage } = teamContext.state.config;
        const { marked } = switchers;
        const ref = this.pluppRef.current;

        // set lineupIndex only if player (not empty bench-seat)
        let lineupIndex = null;
        if (player) {
            lineupIndex = player.lineupIndex;
        }

        /* TEMP */
        if (teamContext.state.config.mobileSearch) {
            openPlayerSearch();
        }

        /* TEMP */

        // if switchers dont have a marked, mark this plupp
        if (!marked) {
            // set as marked, then update switchers
            setSwitchers({
                marked: {
                    origin,
                    pos,
                    lineupIndex,
                    player,
                    ref
                }
            });
            // if switchers do have a marked...
        } else {
            // if this is the marked plupp, unmark, clear switchers
            if (ref === marked.ref) {
                return setSwitchers({ marked: null, target: null });
            }

            if (buildStage.stageName !== 'pitch') return;

            // else, target this plupp, prepare switch
            setSwitchers(
                {
                    target: {
                        origin,
                        pos,
                        lineupIndex,
                        player,
                        ref
                    }
                },
                () => {
                    switchPlayers();
                }
            );
        }
    };

    quickSwitch = () => {
        const ref = this.pluppRef.current;
        const { player, pos, origin, lineupIndex, teamContext } = this.props;
        const { setSwitchers, switchPlayers } = teamContext.setters;
        const targetOrigin = origin === 'pitch' ? 'bench' : 'pitch';
        const targetIndex = teamContext.state.team[targetOrigin][pos].length;

        // else, target this plupp, prepare switch
        setSwitchers(
            {
                marked: {
                    origin,
                    pos,
                    lineupIndex,
                    player,
                    ref
                },
                target: {
                    origin: targetOrigin,
                    pos,
                    lineupIndex: targetIndex,
                    player: null,
                    ref: null
                }
            },
            () => {
                switchPlayers();
            }
        );
    };

    setCap = (role = 'captain') => {
        const { teamContext, player } = this.props;
        const team = clone(teamContext.state.team);
        const { updateNewTeam } = teamContext.setters;
        const otherRole = role !== 'captain' ? 'captain' : 'viceCaptain';

        // if same player already has a role, clear
        if (team[otherRole] === player.uid) {
            team[otherRole] = null;
        }

        team[role] = player.uid;

        updateNewTeam(team);
    };

    render() {
        const { isMarked, isSwitchable } = this.state;
        const { player, pos, origin, lineupIndex, teamContext } = this.props;
        const { captain, viceCaptain } = teamContext.state.team;
        const { stageName } = teamContext.state.config.buildStage;

        let isCap = false,
            isViceCap = false;
        if (player) {
            isCap = player.uid === captain ? true : false;
            isViceCap = player.uid === viceCaptain ? true : false;
        }

        /* 
        
        */

        return (
            <Container>
                {player && (
                    <PlayerName className="PlayerName">
                        <InfoModal
                            isPitch
                            title={player.name}
                            subtitle={`${player.club} - ${toSwe(player.position, 'positions')}`}
                            img="https://source.unsplash.com/random"
                            display={this.state.playerModal}
                            togglePlayerModal={this.togglePlayerModal}
                        />
                        <div>{shortenName(player.name)}</div>
                    </PlayerName>
                )}
                {(stageName === 'pitch' || stageName === 'bench') && player && (
                    <PlayerPrice className="PlayerPrice">{player.price + ' kr'} </PlayerPrice>
                )}

                {/* 				{player && <PlayerName className="PlayerName">{shortenName(player.name)}</PlayerName>}
				{player && <PlayerPrice className="PlayerPrice">{player.price + ' kr'} </PlayerPrice>} */}

                {(stageName === 'pitch' || stageName === 'bench') && isMarked && player && (
                    <Options stageName={stageName}>
                        <DelBtn ref={this.delBtn} onClick={this.del}>
                            <DelImg src={Delete} />
                        </DelBtn>
                    </Options>
                )}

                {stageName === 'captain' && (
                    <Options stageName={stageName}>
                        {!isCap && (
                            <CaptainBtn
                                player={player}
                                onClick={() => this.setCap()}
                                stageName={stageName}
                            >
                                <div>C</div>
                            </CaptainBtn>
                        )}

                        {!isViceCap && (
                            <VCaptainBtn
                                player={player}
                                onClick={() => this.setCap('viceCaptain')}
                                stageName={stageName}
                            >
                                <div>V</div>
                            </VCaptainBtn>
                        )}
                    </Options>
                )}

                <PluppImg
                    ref={this.pluppRef}
                    id={`switch-${origin}-${pos}-${lineupIndex}`}
                    className={`${isSwitchable ? 'Switchable' : ''}Plupp`}
                    alt={`player-plupp ${origin}`}
                    src={pluppC}
                    isMarked={this.state.isMarked}
                    onClick={e => this.handleClickInside(e, stageName)}
                    isSwitchable={isSwitchable}
                    origin={origin}
                    player={player}
                    stageName={stageName}
                    isCap={isCap}
                    isViceCap={isViceCap}
                />

                {(isCap || isViceCap) && <PluppRole player={player}>{isCap ? 'C' : 'V'}</PluppRole>}

                {stageName === 'pitch' ||
                    (stageName === 'bench' && (
                        <SwitchIcon className="SwitchContainer" isSwitchable={isSwitchable}>
                            <FaExchangeAlt
                                alt="SwitchIcon"
                                className="SwitchIcon"
                                player={player}
                            />
                        </SwitchIcon>
                    ))}
            </Container>
        );
    }
}

export default withTeam(onClickOutside(Plupp));
