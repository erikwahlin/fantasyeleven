import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
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
const ManualSim = ({ players, onClick, homeClub, awayClub, step, onChange }) => {
    console.log(players);
    const uniqueClubs = players ? [...new Set(players.map(item => item.club))] : []; //but why?
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

                    {uniqueClubs.map(club => {
                        return <Clubs onClick={e => onClick(e, players, step)}>{club}</Clubs>;
                    })}
                </>
            )}
        </Wrapper>
    );
};

export default ManualSim;
