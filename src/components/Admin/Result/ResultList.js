import React, { useState, useEffect } from 'react';

import { withAuthentication } from '../../Session';
import { withAdmin } from '../AdminState';

import { clone } from '../../../constants/helperFuncs';
import '../form.css';

import { ResultTemplate } from '../template';

const ResultList = ({ adminContext }) => {
    // reverse, sort later...
    const results = adminContext.state.results.reverse();

    return (
        <>
            {results.map(item => (
                <ResultTemplate
                    key={item._id}
                    season={item.season}
                    round={item.round}
                    players={item.players}
                />
            ))}

            {!results.length && (
                <h3>
                    <i>Inga skapade resultat</i>
                </h3>
            )}
        </>
    );
};

export default withAuthentication(withAdmin(ResultList));
