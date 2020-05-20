import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import svSe from 'antd/es/locale/sv_SE';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
//import MyTeams from '../MyTeams';
import NewTeam from '../NewTeam';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import About from '../About';
import Overview from '../Overview';
import styled, { css, keyframes } from 'styled-components';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { isMobile } from 'react-device-detect';

const AppWrapper = styled.div`
    height: 100vh;

    /* Kill the extra bottom padding on mobile (keep the nav visible) */
    ${isMobile &&
    css`
        height: 100%;
        min-height: unset;
        max-height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    `};
`;

import ReactNotification from 'react-notifications-component';

import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const rotate = keyframes`
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(90deg);
	}
	100% {
		transform: rotate(90deg);
	}	
`;

const LandscapeMode = styled.div`
    display: none;

    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    color: white;
    text-align: center;
    z-index: 99999;

    @media screen and (min-width: 320px) and (max-width: 900px) and (max-height: 500px) and (orientation: landscape) {
        display: flex;
    }

    justify-content: center;
    align-items: center;
    flex-direction: column;

    & > p {
    }
`;

const PhoneOuter = styled.div`
    animation: ${rotate} 2s ease-in-out infinite;
    font-size: 15em;
    /* margin-top: 50vh;
		margin-left: 50vw; */

    height: 50px;
    width: 100px;
    border: 3px solid white;
    border-radius: 10px;
    margin-bottom: 30px;

    & > div {
        border: 1px solid white;
        border-radius: 5px;
        height: 40px;
        width: 90px;
        margin: auto;
        position: relative;
        top: 4px;
    }
`;

const AppContainer = styled.div`
    @media all and (max-width: 899px) {
        width: ${p => (p.route === '/admin' ? '100%' : '100vw')};
        /* height: 100vh; */
        overflow: ${p => (p.route === '/admin' ? 'visible' : 'hidden')};
    }
    @media all and (max-width: 899px) {
        height: auto;
    }

    @media all and (max-width: 1900px) {
        /* height: 100vh; */
    }
`;

const NotifContainer = styled(ReactNotification)`
    & .animOut {
        animation-duration: 5s !important;
    }
`;

console.log('path', window.location.pathname);

const App = () => (
    <Router>
        <>
            <NotifContainer className="NotifContainer" />

            <LandscapeMode className="landscapeMode">
                <PhoneOuter>
                    <div></div>
                </PhoneOuter>
                <p>Rotate that shit</p>
            </LandscapeMode>

            <ConfigProvider locale={svSe}>
                <AppContainer className="App" route={window.location.pathname}>
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

                    <Route path={ROUTES.OVERVIEW} exact component={Overview} />
                    <Route path={ROUTES.NEWTEAM} exact component={NewTeam} />

                    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />

                    <Route path={ROUTES.ABOUT} component={About} />
                </AppContainer>
            </ConfigProvider>
        </>
    </Router>
);

export default withAuthentication(App);
