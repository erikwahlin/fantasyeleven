import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withOverview } from './OverviewState';
import { Wrapper, WrapperCol, WrapperRow, ButtonStandard } from '../Elements';

const Main = props => {
    return (
        <WrapperCol>
            <h1>ÖVERSIKT</h1>

            <WrapperRow>
                <ButtonStandard type="default">
                    <Link to={ROUTES.NEWTEAM}>Skapa ett nytt lag</Link>
                </ButtonStandard>
            </WrapperRow>
            <WrapperCol customStyle="margin-top: 20px;">
                <h2>Tidigare spel</h2>
            </WrapperCol>
        </WrapperCol>
    );
};

export default withOverview(Main);
