import React from 'react';
import OverviewState from './OverviewState';
import OverviewPage from './OverviewPage';

const Overview = props => {
    return (
        <OverviewState>
            <OverviewPage />
        </OverviewState>
    );
};

export default Overview;
