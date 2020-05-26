import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { AuthUserContext, withAuthentication } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import DefaultNav from './DefaultNav';
import DrawerNav from './DrawerNav';
import Logo from '../Landing/fantasy11-white-logo.png';
import { withAdmin } from '../Admin/AdminState';

// styled(drawer)
const LinkContainer = styled.div`
    margin: 20px;
`;

const StyledLink = styled(Link)`
    color: white;
    font-family: 'Avenir';
    font-weight: 500;
    font-size: 1.2em;

    &:hover {
        color: #aaaaaa;
    }
`;

const CustomLink = styled.a`
    color: white;
    font-family: 'Avenir';
    font-weight: 500;
    font-size: 1.2em;

    &:hover {
        color: #aaaaaa;
    }
`;

const NavType = ({ location, children, ...props }) =>
    ROUTES.slideNav.includes(location.pathname) ? (
        <DrawerNav location={location} {...props}>
            {children}
        </DrawerNav>
    ) : (
        <DefaultNav location={location} {...props}>
            {children}
        </DefaultNav>
    );

const NavRoutes = ({ routeList, user }) => {
    const routes = ROUTES[routeList].filter(r =>
        r.pathname === '/admin' && !user.roles.includes('ADMIN') ? false : true
    );

    return routes.map(route => (
        <LinkContainer key={route.pathname} className={`navlink-${route.pathname} navLink`}>
            <StyledLink to={route.pathname}>
                {route.pathname === '/account' ? user.username : route.title}
            </StyledLink>
        </LinkContainer>
    ));
};

const Navigation = ({ user, ...props }) => (
    <NavType {...props}>
        {user ? (
            <>
                {<NavRoutes routeList="loggedIn" user={user} />}
                <hr />
                <br />
            </>
        ) : (
            <NavRoutes routeList="loggedOut" />
        )}
        {!user && (
            <LinkContainer className="landing-btn-container">
                <Link className="landing-btn" to={ROUTES.SIGN_UP}>
                    Skapa konto
                </Link>

                <Link className="landing-btn" to={ROUTES.SIGN_IN}>
                    Logga in
                </Link>
            </LinkContainer>
        )}

        {user && (
            <LinkContainer className={`navLink`}>
                <CustomLink onClick={() => props.firebase.doSignOut({ ...props })}>
                    Logga ut
                </CustomLink>
            </LinkContainer>
        )}
    </NavType>
);

/* const Navigation = ({ pathname }) => (
	<AuthUserContext.Consumer>
		{authUser =>
			authUser ? (
				<NavigationAuth authUser={authUser} pathname={pathname} />
			) : (
				<NavigationNonAuth pathname={pathname} />
			)
		}
	</AuthUserContext.Consumer>
); */

export default withAuthentication(withRouter(Navigation));

/* const NavList = styled.ul`
	margin: 0;

	& li {
		list-style-type:none;
		color:white;
	}

	}
`;

 */

/* const NavigationAuth = ({ authUser, pathname }) => (
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
			</li> */
/* 			<li>
				<StyledLink to={ROUTES.ACCOUNT}>Hur fungerar det?</StyledLink>
			</li> */

/* 			{authUser.roles ? (
				<>
					{authUser.roles.includes(ROLES.ADMIN) && (
						<li>
							<StyledLink to={ROUTES.ADMIN}>Admin</StyledLink>
						</li>
					)}
				</>
			) : null} */

/* <li>
	<StyledLink to={ROUTES.ABOUT}>Hur fungerar det?</StyledLink>
</li>

<li>
	<SignOutButton />
</li>
</NavList>
</Wrapper>
); */

/* const NavigationNonAuth = ({ pathname }) => (
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
); */
