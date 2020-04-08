import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import About from '../About';
import styled, { keyframes } from 'styled-components';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

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

const App = () => (
	<Router>
		<>
			<LandscapeMode className="landscapeMode">
				<PhoneOuter>
					<div></div>
				</PhoneOuter>
				<p>Rotate that shit</p>
			</LandscapeMode>

			<div className="App">
				<Route exact path={ROUTES.LANDING} component={LandingPage} />
				<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
				<Route path={ROUTES.SIGN_IN} component={SignInPage} />
				<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

				<Route path={ROUTES.HOME} component={HomePage} />
				<Route path={ROUTES.ACCOUNT} component={AccountPage} />
				<Route path={ROUTES.ADMIN} component={AdminPage} />

				<Route path={ROUTES.ABOUT} component={About} />
			</div>
		</>
	</Router>
);

export default withAuthentication(App);
