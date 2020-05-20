import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import Logo from '../Landing/fantasy11-white-logo.png';


const Wrapper = styled.div`
	margin: 0;
`;

const NavList = styled.ul`
	margin: 0;
	
	& li {
		list-style-type:none;
		color:white;
	}

	}
`;

const StyledLink = styled(Link)`
	color:white;
	font-family:'Avenir';
	font-weight:500;
	font-size:1.2em;

	&:hover {
		color:#aaaaaa;
	}
`;

const Navigation = ({ pathname }) => (
	<AuthUserContext.Consumer>
		{authUser =>
			authUser ? (
				<NavigationAuth authUser={authUser} pathname={pathname} />
			) : (
				<NavigationNonAuth pathname={pathname} />
			)
		}
	</AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser, pathname }) => (
	<Wrapper className="Navigation" pathname={pathname}>
		
		{pathname !== '/' && (
			<p style={{ margin: '0' }}>
				<i>(Will become a side-nav on this page){pathname}</i>
			</p>
		)}
		<NavList className="NavList">
			<li>
				<Link to={ROUTES.LANDING}> <img src={Logo} style={{width:'200px'}}/></Link>
			</li>
			<li>
				<StyledLink to={ROUTES.HOME}>Skapa ett lag</StyledLink>
			</li>
{/* 			<li>
				<StyledLink to={ROUTES.ACCOUNT}>Hur fungerar det?</StyledLink>
			</li> */}
			

{/* 			{authUser.roles ? (
				<>
					{authUser.roles.includes(ROLES.ADMIN) && (
						<li>
							<StyledLink to={ROUTES.ADMIN}>Admin</StyledLink>
						</li>
					)}
				</>
			) : null} */}

			<li>
				<StyledLink to={ROUTES.ABOUT}>Hur fungerar det?</StyledLink>
			</li>

			<li>
				<SignOutButton />
			</li>
		</NavList>
	</Wrapper>
);

const NavigationNonAuth = ({ pathname }) => (
	<ul className="landing-nav">
		<li>
			<StyledLink to={ROUTES.LANDING}><img src={Logo} style={{ width: '200px' }} /></StyledLink>
		</li>

		<li>
			<StyledLink to={ROUTES.HOME}>Skapa ett lag</StyledLink>
		</li>

		<li>
			<StyledLink to={ROUTES.ABOUT}>Hur fungerar det?</StyledLink>
		</li>

		<li className="landing-btn-container">
			<Link className="landing-btn" to={ROUTES.SIGN_UP}>
				Skapa konto
			</Link>

			<Link className="landing-btn" to={ROUTES.SIGN_IN}>
				Logga in
			</Link>
		</li>
	</ul>
);

export default Navigation;
