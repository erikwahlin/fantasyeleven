import React from 'react';
import { withAdmin } from '../AdminState';
import NewRound from './NewRound';
import Rounds from './Rounds';

const RoundSection = props => {
    return (
        <div>
            <NewRound />

            <Rounds />
        </div>
    );
};

export default withAdmin(RoundSection);
