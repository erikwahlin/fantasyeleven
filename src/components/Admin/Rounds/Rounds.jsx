import React from 'react';
import { withAdmin } from '../AdminState';

import Round from './Round';

const Rounds = ({ adminContext }) => {
    const { rounds, settings } = adminContext.state;
    const { activeRound } = settings;

    return (
        <>
            {rounds.map((round, nth) => (
                <Round
                    roundIndex={nth}
                    key={`${round.alias}-${nth}`}
                    active={round._id === activeRound._id}
                />
            ))}
        </>
    );
};

export default withAdmin(Rounds);
