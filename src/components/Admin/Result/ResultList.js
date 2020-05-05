import React, { useState, useEffect } from 'react';

import { withAuthentication } from '../../Session';
import { withResult } from './ctx';

import { clone } from '../../../constants/helperFuncs';
import '../form.css';

import { ResultTemplate } from '../template';

const ResultList = ({ playerResult }) => {
    const { active, season, round, players } = playerResult; // todo: create shared team context

    return (
        <>
            {playerResult.map(item => (
                <ResultTemplate
                    key={item._id}
                    season={item.season}
                    round={item.round}
                    players={item.players}
                />
            ))}
        </>
    );
};

export default withAuthentication(withResult(ResultList));
