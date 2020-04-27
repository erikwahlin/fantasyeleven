import React from 'react';
import { withTeam } from './ctx';
import styled from 'styled-components';
import { FaUserPlus } from 'react-icons/fa';
import { toSwe, countPlayers } from '../../constants/helperFuncs';

const Wrapper = styled.div`
    width: 100%;
    /* height: 100%; */
    max-width: 900px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;

    @media all and (max-width: 480px) {
        & > * {
            max-width: 22%;
            justify-content: space-evenly;
        }
    }
`;

const ChosenPlayers = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const InfoTitle = styled.h2`
    margin: 0;
    margin-bottom: 0.2rem;

    @media all and (max-width: 480px) {
        font-size: 14px;
    }

    @media all and (max-width: 350px) {
        font-size: 4vw;
    }
`;

const InfoP = styled.p`
    color: ${p => (p.notReady ? 'red' : p.ready ? '#35892A' : 'white')};

    @media all and (max-width: 480px) {
        font-size: 24px;
        margin-bottom: 0;
    }

    @media all and (max-width: 350px) {
        font-size: 7vw;
    }
`;

const ClearBtn = styled.button`
    width: 100px;
    height: 35px;
    background: #5ac5d3;
    border: none;
    border-radius: 15px;
    outline: none;
    cursor: pointer;
    font-family: 'Avenir';
    font-size: 1em;
    font-weight: 500;
    color: black;
    padding: 5px;
    align-self: center;

    @media all and (max-width: 480px) {
        width: auto;
        height: 41px;
        padding: 7px;
        font-size: 18px;
    }

    @media all and (max-width: 350px) {
        height: 50%;
        padding: 2vw;
        font-size: 5vw;
    }
`;

const AddPlayerBtn = styled(FaUserPlus)`
    width: 65px;
    height: 100%;
    color: white;
    align-self: center;

    cursor: pointer;

    @media all and (max-width: 480px) {
        width: 47px;
    }

    @media all and (max-width: 350px) {
        width: 14vw;
    }
`;

const BuildInfo = ({ teamContext, origin }) => {
    const { team, config } = teamContext.state;
    const { game } = team;
    const { buildStage, limit, mobileSearch } = config;
    const { stageName } = buildStage;
    const { delPlayer, openPlayerSearch } = teamContext.setters;

    const maxPlayers = limit[origin].tot;
    const maxValue = limit.value[origin];

    const playerCount = team.list.filter(player => player.origin === origin).length;
    const teamValue = game.value[origin]; // adding bench tot price to state

    let budgetLeft = maxValue - teamValue; //rendering budget left

    const ready =
        buildStage.stageName === 'pitch' || buildStage.stageName === 'bench'
            ? teamValue <= maxValue && playerCount === maxPlayers
            : true;

    const notReady = teamValue > maxValue;

    const clearPlayers = () => {
        // alla spelare på []
        //const players = team.list.filter(player => player.origin === origin);
        delPlayer({ delAll: true });
    };

    return (
        <Wrapper className="BuildInfo unmarkable">
            <ChosenPlayers>
                <InfoTitle className="infoTitle">
                    Valda {origin === 'pitch' ? 'spelare' : 'reserver'}
                </InfoTitle>
                <InfoP ready={ready} className="amount">
                    {playerCount + '/' + maxPlayers}
                </InfoP>
            </ChosenPlayers>

            {stageName === 'pitch' && (
                <ChosenPlayers>
                    <InfoTitle className="infoTitle">Totalt pris</InfoTitle>
                    <InfoP className="amount" ready={ready} notReady={notReady}>
                        {teamValue + ' kr'}
                    </InfoP>
                </ChosenPlayers>
            )}
            {buildStage.stageName === 'bench' && (
                <ChosenPlayers>
                    <InfoTitle className="infoTitle">Återstående Budget</InfoTitle>
                    <InfoP
                        style={budgetLeft <= 0 ? { color: 'red' } : { color: 'green' }}
                        className="amount"
                    >
                        {budgetLeft + ' kr'}
                    </InfoP>
                </ChosenPlayers>
            )}

            {stageName === 'pitch' || stageName === 'bench' ? (
                <ClearBtn onClick={clearPlayers}>
                    {(stageName === 'pitch' && countPlayers(team.pitch) === 0) ||
                    (stageName === 'bench' && countPlayers(team.bench) === 0)
                        ? 'Autofyll'
                        : `Nollställ ${toSwe(stageName, 'origins')}`}
                </ClearBtn>
            ) : null}

            {(stageName === 'pitch' || stageName === 'bench') && mobileSearch && (
                <AddPlayerBtn className="AddPlayerBtn" onClick={openPlayerSearch} />
            )}
        </Wrapper>
    );
};

export default withTeam(BuildInfo);
