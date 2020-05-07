import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { withTeam } from '../ctx';
import { shortenName, clone } from '../../../constants/helperFuncs';
import onClickOutside from 'react-onclickoutside';
import pluppC from '../../../media/pluppC.svg';
import cap from '../../../media/Cap.svg';
import ViceCap from '../../../media/ViceCap.svg';
import Delete from '../../../media/delW.svg';
import Switch from '../../../media/switchIcon.png';
import { FaTrash, FaExchangeAlt, FaCross, FaX } from 'react-icons/fa';
import { GiCrossMark, GiBodySwapping } from 'react-icons/gi';
import { TiDelete } from 'react-icons/ti';
import allClubs from '../../../constants/clubs';
import InfoModal from '../../InfoModal/index';
import { toSwe } from '../../../constants/helperFuncs';

const Container = styled.div`
    width: 50px;
    height: 50px;
    align-self: center;
    position: relative;
    margin: 5px 0;

    @media all and (max-width: 480px) {
        margin: unset;
        width: 10vw;
        height: 10vw;
    }
`;

const PlayerName = styled.span`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 92px;
    /* background-color: rgba(57, 118, 59); */
    background-color: rgba(0, 28, 62, 0.4);
    padding: 3px;
    left: -21px;
    top: 52px;
    font-family: 'Avenir';
    font-weight: bold;
    font-size: 0.9em;
    text-align: center;
    text-shadow: 0 1px 2px #000;
    color: #eee;

    & > .ModalWrapper {
        position: absolute;
        top: 26px;
        left: -10px;
        z-index: 1;
    }

    & .ModalOpenBtn {
        & > svg {
            height: auto;
            width: auto;
            box-shadow: 0px 0 2px #444;
            border-radius: 50%;
        }
    }

    @media all and (max-width: 480px) {
        width: 19vw;
        font-size: 3vw;
        left: -5vw;
        top: 10vw;
        z-index: 1;
        padding: 0.7vw;

        & .ModalWrapper {
            min-width: unset;
            left: 0vw;
            top: 6.1vw;
        }

        & .ModalOpenBtn {
            width: 4vw;
            height: 4vw;
            & > svg {
                box-shadow: 0px 0 0.5vw #444;
            }
        }
    }
`;

const PlayerPrice = styled.span`
    position: absolute;
    width: 92px;
    /* background-color: rgba(51, 170, 51, 0.6); */
    background-color: rgba(250, 250, 250, 0.3);
    left: -21px;
    top: 77px;
    font-family: 'Avenir';
    font-weight: bold;
    font-size: 0.7em;
    text-align: center;
    text-shadow: 0 1px 2px #000;
    color: #eee;

    @media all and (max-width: 480px) {
        width: 19vw;
        font-size: 2.5vw;
        left: -5vw;
        top: 16vw;
    }
`;

const PluppImg = styled.svg`
    box-shadow: 0px -0.5px 4px black;
    width: 100%;
    position: relative;
    z-index: 1;
    background: white;

    filter: ${p => p.isMarked && 'brightness(.9)'};
    opacity: ${p => (p.isSwitchable ? '.2' : '1')};

    cursor: ${p => (p.stageName === 'pitch' || p.stageName === 'captain' ? 'pointer' : 'normal')};

    height: 100%;
    border-radius: 50%;
    background: ${props =>
        props.player
            ? allClubs.find(obj => {
                  return obj.long === props.player.club;
              }).color.primary
            : '#a6afb6'};
`;

const OptionsTop = styled.div`
    position: absolute;
    z-index: 1;
    left: -21px;
    top: -13px;
    width: 92px;
    height: 40px;
    margin: 0;
    padding: 0;

    display: flex;
    justify-content: flex-end;

    @media all and (max-width: 480px) {
        width: 19vw;
        left: -5vw;
        top: -3vw;
        height: 7vw;
    }
`;

const OptionsBottom = styled(OptionsTop)`
    top: 52px;
    justify-content: center;

    @media all and (max-width: 480px) {
        height: 10vw;
        top: 10vw;
    }
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
    right: -6px;
`;

const Cap = styled.img`
    width: 22px;
    height: 22px;
`;

const Vcap = styled.img`
    width: 22px;
    height: 22px;
`;

const VCaptainBtn = styled(Btn)`
    right: -6px;
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

const OptionsBtn = styled.button`
    width: 30px;
    margin: 0 5px;
    padding: 0;
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

    @media all and (max-width: 480px) {
        width: 8.4vw;
        height: 8.4vw;
        margin: 0 1vw;
    }
`;

const OptionsBottomBtn = styled(OptionsBtn)`
    width: 30px;
    height: 30px;
    margin: 0 2px;
    background: #fff;
    padding: 6px;

    box-shadow: 0 0 5px #222;
    border-radius: 50%;

    & > svg {
        color: #000;
        margin: 0;
    }

    @media all and (max-width: 480px) {
        width: 6.4vw;
        margin: 0.5vw;
        padding: 0.5vw 0;
        height: 6.4vw;

        & > svg {
            padding: 1vw;
        }
    }
`;

const OptionsImg = styled.img`
    box-shadow: 0 0 10px black;
    border-radius: 50%;
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

        this.DelBtn = createRef(null);
        this.SwitchBtn = createRef(null);
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
        const { buildStage, switchers } = teamContext.state.config;
        const { marked } = switchers;
        const { stageName } = buildStage;
        const pluppRef = this.pluppRef.current;

        // is switchable if:
        // another plupp is marked, it contains a player or is on bench
        if (origin === stageName) {
            if ((player || origin === 'bench') && marked) {
                if (pos === marked.pos && pluppRef !== marked.ref) {
                    return true;
                }
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
    handleClickInside = e => {
        const { teamContext, player, pos, origin } = this.props;
        const { switchers, buildStage } = teamContext.state.config;
        const { captain } = this.props.teamContext.state.team;
        const { stageName } = buildStage;

        // if plupp origin and stageName doesn't match, bail
        // if on pitchStage and plupp origin isn't pitch or captain, bail
        if (origin !== stageName && !(origin === 'pitch' && stageName === 'captain')) return;

        if (stageName === 'captain') {
            this.setCap(!captain || this.props.player.uid === captain ? 'captain' : 'viceCaptain');

            return;
        }

        const { setSwitchers, switchPlayers, openPlayerSearch } = teamContext.setters;
        const { marked } = switchers;
        const ref = this.pluppRef.current;

        // set lineupIndex only if player (not empty bench-seat)
        let lineupIndex = null;
        if (player) {
            lineupIndex = player.lineupIndex;
        }

        /* TEMP */
        /* if (teamContext.state.config.mobileSearch) {
            openPlayerSearch();
        } */

        /* TEMP */

        // if switchers dont have a marked, mark this plupp
        if (!marked) {
            if (!player && stageName === 'bench') {
                openPlayerSearch();
            }
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

        if (player.uid === team[role]) {
            team[role] = null;
        } else {
            team[role] = player.uid;
        }

        updateNewTeam(team);
    };

    render() {
        const { isMarked, isSwitchable } = this.state;
        const { player, pos, origin, lineupIndex, teamContext } = this.props;
        const { config, team } = teamContext.state;
        const { captain, viceCaptain } = team;
        const { buildStage, mobileSearch } = config;
        const { stageName } = buildStage;

        let isCap = false,
            isViceCap = false;
        if (player) {
            isCap = player.uid === captain ? true : false;
            isViceCap = player.uid === viceCaptain ? true : false;
        }

        //console.log(stageName, isSwitchable);

        return (
            <Container>
                {player && !isMarked && (
                    <PlayerName className="PlayerName">
                        {(stageName === 'pitch' ||
                            stageName === 'bench' ||
                            stageName === 'overview') && (
                            <InfoModal
                                isPitch
                                title={player.name}
                                subtitle={`${player.club} - ${toSwe(player.position, 'positions')}`}
                                img="https://source.unsplash.com/random"
                                display={this.state.playerModal}
                                togglePlayerModal={this.togglePlayerModal}
                            />
                        )}
                        <div>{shortenName(player.name)}</div>
                    </PlayerName>
                )}
                {(stageName === 'pitch' || stageName === 'bench' || stageName === 'overview') &&
                    player &&
                    !isMarked && (
                        <PlayerPrice className="PlayerPrice">{player.price + ' kr'} </PlayerPrice>
                    )}
                {(stageName === 'pitch' || stageName === 'captain' || stageName === 'bench') && (
                    <OptionsTop stageName={stageName} className="OptionsTop">
                        {isCap && (
                            <OptionsBtn
                                className="OptionsBtn"
                                player={player}
                                onClick={() => this.setCap()}
                                stageName={stageName}
                            >
                                <Cap src={cap} alt="Captain" />
                            </OptionsBtn>
                        )}

                        {isViceCap && (
                            <OptionsBtn
                                player={player}
                                onClick={() => this.setCap('viceCaptain')}
                                stageName={stageName}
                            >
                                <Vcap src={ViceCap} alt="Vice Captain" />
                            </OptionsBtn>
                        )}
                    </OptionsTop>
                )}
                {isMarked && player && (
                    <OptionsBottom className="OptionsBottom">
                        <OptionsBottomBtn
                            className="OptionsBottomBtn"
                            ref={this.DelBtn}
                            onClick={this.del}
                        >
                            {/* <OptionsImg className="OptionsImg" src={Delete} /> */}
                            <GiCrossMark color="red" alt="DelIcon" className="DelIcon" />
                        </OptionsBottomBtn>

                        {mobileSearch && (
                            <OptionsBottomBtn
                                className="OptionsBottomBtn"
                                ref={this.SwitchBtn}
                                onClick={this.props.teamContext.setters.openPlayerSearch}
                            >
                                <GiBodySwapping
                                    color="#14521D"
                                    alt="SwitchIcon"
                                    className="SwitchIcon"
                                />
                            </OptionsBottomBtn>
                        )}
                    </OptionsBottom>
                )}

                <PluppImg
                    ref={this.pluppRef}
                    id={`switch-${origin}-${pos}-${lineupIndex}`}
                    className={`${isSwitchable && 'Switchable'}Plupp`}
                    alt={`player-plupp ${origin}`}
                    src={pluppC}
                    isMarked={this.state.isMarked}
                    /* onClick={e => this.handleClickInside(e, stageName)} */
                    onClick={e => this.handleClickInside(e)}
                    isSwitchable={isSwitchable}
                    origin={origin}
                    player={player}
                    stageName={stageName}
                    isCap={isCap}
                    isViceCap={isViceCap}
                />
                {/* {(isCap || isViceCap) && <PluppRole player={player}>{isCap ? 'C' : 'V'}</PluppRole>} */}
                {(stageName === 'pitch' || stageName === 'bench') && (
                    <SwitchIcon className="SwitchContainer" isSwitchable={isSwitchable}>
                        <GiBodySwapping alt="SwitchIcon" className="SwitchIcon" player={player} />
                    </SwitchIcon>
                )}
            </Container>
        );
    }
}

export default withTeam(onClickOutside(Plupp));
