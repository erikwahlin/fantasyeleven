import React, { Component } from 'react';
import { withOverview } from './OverviewState';

const Main = props => {
    return (
        <>
            <h1>ÖVERSIKT</h1>

            <div>
                <h2>Mitt lag</h2>
            </div>
        </>
    );
};

export default withOverview(Main);
