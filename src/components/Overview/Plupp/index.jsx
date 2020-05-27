import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { withOverview } from '../OverviewState';
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
import { IoIosShirt } from 'react-icons/io';
import { Popover } from 'antd';

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
            color: white;
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

const CapPopBtn = styled.button`
    width: 100%;
    border: none;
    outline: none;
    margin-bottom: 5px;
    font-weight: ${p => (p.picked === true ? '700' : 'normal')};
    cursor: pointer;
`;

const Points = styled.div`
    position: absolute;
    top: 8px;
    left: 0px;
    color: black;
    z-index: 1;
    font-weight: 700;
    font-size: 24px;
    width: 100%;
    text-align: center;

    @media all and (max-width: 570px) {
        font-size: 4vw;
        top: 2vw;
    }
`;

class Plupp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMarked: false,
            popOpen: false
        };

        this.setPop = this.setPop.bind(this);
        this.handleClickInside = this.handleClickInside.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.pluppRef = createRef(null);
        this.popRef = createRef(null);

        this.popContent = () => {
            return (
                <div
                    className="popContent unmarkable"
                    style={{ textAlign: 'center', width: '150px' }}
                >
                    <CapPopBtn onClick={() => alert('Hej')}>Hej</CapPopBtn>

                    <CapPopBtn onClick={() => alert('Hå')}>Hå</CapPopBtn>

                    <a onClick={() => this.setPop(false)}>Stäng</a>
                </div>
            );
        };
    }
    // on update
    componentDidUpdate = (pp, ps) => {};

    setPop = val => {
        if (typeof val !== 'boolean') return;

        this.setState({
            popOpen: val
        });
    };

    // (runs before click inside)
    handleClickOutside = e => {
        const { popOpen } = this.state;

        if (popOpen) {
            this.setPop(false);
        }
    };

    // (runs after click outside)
    handleClickInside = e => {
        const { popOpen } = this.state;

        const newPop = popOpen ? false : true;
        this.setPop(newPop);
    };

    render() {
        const { isMarked, popOpen } = this.state;
        const { isCap, isVice, player, pos, origin, lineupIndex, overviewContext } = this.props;

        const { roundInView } = overviewContext.state;

        let result = false;

        if (roundInView.result.myTeam) {
            if (roundInView.result.myTeam.list.length > 0) {
                result = true;
            }
        }

        if (!player) {
            console.log('NO PLAYER', player, pos, origin, lineupIndex);
        }

        if (!player) return null;

        return (
            <Container>
                {player && !isMarked && (
                    <PlayerName className="PlayerName">
                        <InfoModal
                            isPitch
                            title={player.name}
                            subtitle={`${player.club} - ${toSwe(player.position, 'positions')}`}
                            img="https://source.unsplash.com/random"
                            display={this.state.playerModal}
                            /* togglePlayerModal={this.togglePlayerModal} */
                        />

                        <div>{shortenName(player.name)}</div>
                    </PlayerName>
                )}

                <PlayerPrice className="PlayerPrice">{player.price + ' kr'} </PlayerPrice>

                <OptionsTop className="OptionsTop">
                    {isCap && (
                        <OptionsBtn className="OptionsBtn" player={player}>
                            <Cap src={cap} alt="Captain" />
                        </OptionsBtn>
                    )}

                    {isVice && (
                        <OptionsBtn player={player}>
                            <Vcap src={ViceCap} alt="Vice Captain" />
                        </OptionsBtn>
                    )}
                </OptionsTop>

                <Popover
                    content={this.popContent}
                    trigger="click"
                    visible={popOpen}
                    width={500}
                    ref={this.popRef}
                    /* onVisibleChange={val => this.setPop(val)} */
                >
                    <>
                        <PluppImg
                            ref={this.pluppRef}
                            id={`switch-${origin}-${pos}-${lineupIndex}`}
                            className={`Plupp`}
                            alt={`player-plupp ${origin}`}
                            src={pluppC}
                            isMarked={isMarked}
                            onClick={e => this.handleClickInside(e)}
                            origin={origin}
                            player={player}
                        />

                        {result && player.points && (
                            <Points>
                                <span>{player.points.tot}</span>
                            </Points>
                        )}
                    </>
                </Popover>

                {/* <IoIosShirt
                    ref={this.pluppRef}
                    id={`switch-${origin}-${pos} -${lineupIndex} `}
                    className={`${isSwitchable && 'Switchable'} Plupp`}
                    alt={`player - plupp ${origin} `}
                    isMarked={this.state.isMarked}
                    onClick={e => this.handleClickInside(e)}
                    isSwitchable={isSwitchable}
                    origin={origin}
                    player={player}
                    stageName={stageName}
                    isCap={isCap}
                    isViceCap={isVice}
                    style={style}
                /> */}
            </Container>
        );
    }
}

export default withOverview(onClickOutside(Plupp));
