import React from 'react';
import OverviewState from './OverviewState';
import Main from './Main';

const Overview = props => {
    return (
        <OverviewState>
            <Main />
        </OverviewState>
    );
};

export default Overview;
