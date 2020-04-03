import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import Logo from '../../media/Logo-white.png';
import styled from 'styled-components';

const navWrap = styled.div`
	display: flex;
	flex-direction:row;
	justify-content:space-between;
	width:50%%;
`;



const Navigation = () => (
	<AuthUserContext.Consumer>
		{authUser =>
			authUser ? (
				<NavigationAuth authUser={authUser} />
			) : (
				<NavigationNonAuth />
			)
		}
	</AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (

	<nav>
		
		{/* <img src={Logo} className="logotype"/> */}
	<ul>
		<li>
			<Link to={ROUTES.LANDING}>*Logga*</Link>
		</li>
		<li>
			<Link to={ROUTES.HOME}>Mitt lag</Link>
		</li>
		<li>
			<Link to={ROUTES.ACCOUNT}>Konto</Link>
		</li>

		{authUser.roles ? (
			<>
				{authUser.roles.includes(ROLES.ADMIN) && (
					<li>
						<Link to={ROUTES.ADMIN}>Admin</Link>
					</li>
				)}
			</>
		) : null}

		<li>
			<Link to={ROUTES.ABOUT}>Om</Link>
		</li>

		<li>
			<SignOutButton />
		</li>
	</ul>
		
	</nav>
);

const NavigationNonAuth = () => (
	<ul>
		<li>
			<Link to={ROUTES.LANDING}>*Logga*</Link>
		</li>
		<li>
			<Link to={ROUTES.SIGN_IN}>Logga in</Link>
		</li>
	</ul>
);

export default Navigation;
