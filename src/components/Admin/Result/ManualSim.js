import React from 'react';

import styled from 'styled-components';

const Title = styled.div`
    font-size: 2em;
    text-align: center;
`;
const players = styled.div`
    border: 1px solid white;
    width: 40%;
    font-size: 1.4em;
`;
const HomePlayers = styled(players)``;
const AwayPlayers = styled(players)``;
const Flex = styled.div`
    display: flex;
    flex-direction: row;
`;

const Player = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

const Button = styled.button`
    width: 14%;
    height: 30px;
    background-color: white !important;
    border: 1px solid black;
    color: black !important;
`;

const Wrapper = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`;
const Clubs = styled.div`
    color: white;
    &:hover {
        cursor: pointer;
    }
`;
const ManualSim = ({
    players,
    onClick,
    homeClub,
    awayClub,
    step,
    onChange,
    onClickNext,
    onPlayerClick,
    playerStep,
    whoScoredAway,
    whoScoredHome
}) => {
    console.log(players);
    const uniqueClubs = players ? [...new Set(players.map(item => item.club))] : []; //but why?
    const pickedClubPlayers = (players, club) => {
        if (players && club) {
            return players.filter(player => player.club === club);
        }
    };
    console.log(pickedClubPlayers(players, homeClub));
    console.log(pickedClubPlayers(players, awayClub));

    console.log(uniqueClubs);
    return (
        <Wrapper>
            {(step === 1 || step === 2) && (
                <>
                    <div>
                        hemmalag: <span>{homeClub}</span>{' '}
                        {step === 2 && <input className="homeClub" onChange={onChange}></input>}
                    </div>
                    <div>
                        bortalag: <span>{awayClub}</span>{' '}
                        {step === 2 && <input className="awayClub" onChange={onChange}></input>}
                    </div>
                    {step === 2 && <Button onClick={onClickNext}>Klar</Button>}

                    {uniqueClubs.map(club => {
                        return (
                            <Clubs key={club} onClick={e => onClick(e, players, step)}>
                                {club}
                            </Clubs>
                        );
                    })}
                </>
            )}
            {step === 3 && (
                <Flex>
                    <Title>
                        {playerStep === 1 && (
                            <>
                                <div>MålSkyttar</div>
                                <div>
                                    {homeClub}:{' '}
                                    {whoScoredHome.map(player => (
                                        <div>{player.name}</div>
                                    ))}
                                </div>
                                <div>
                                    {awayClub}:{' '}
                                    {whoScoredAway.map(player => (
                                        <div>{player.name}</div>
                                    ))}
                                </div>
                            </>
                        )}
                        {playerStep === 2 && 'Vem gjorde Assist?'}
                    </Title>
                    <HomePlayers>
                        <div style={({ fontSize: '2em' }, { color: 'green' })}>{homeClub}</div>
                        {pickedClubPlayers(players, homeClub).map(player => {
                            return (
                                <Player
                                    key={player.id}
                                    className={player.id}
                                    onClick={e => onPlayerClick(e, players)}
                                >
                                    {player.name}l
                                </Player>
                            );
                        })}
                    </HomePlayers>
                    <AwayPlayers>
                        <div style={({ fontSize: '2em' }, { color: 'green' })}>{awayClub}</div>
                        {pickedClubPlayers(players, awayClub).map(player => {
                            return (
                                <Player
                                    key={player.id}
                                    className={player.id}
                                    onClick={e => onPlayerClick(e, players)}
                                >
                                    {player.name}
                                </Player>
                            );
                        })}
                    </AwayPlayers>
                </Flex>
            )}
        </Wrapper>
    );
};

export default ManualSim;
