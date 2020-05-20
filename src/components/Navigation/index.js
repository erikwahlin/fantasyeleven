import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { AuthUserContext, withAuthentication } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Wrapper = styled.div`
    margin: 0;
`;

const NavList = styled.ul`
    margin: 0;
`;

const NavWrapper = styled.div`
    width: 100%;
    margin: 0;
    height: fit-content;
    padding: 5px;
`;

const TopNav = styled.div`
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
`;

// styled(drawer)
const SlideNav = styled.div`
    position: fixed; /* temp */
    bottom: 0; /* temp */
    z-index: 1;
`;

const NavType = ({ pathname, children }) =>
    ROUTES.slideNav.includes(pathname) ? (
        <SlideNav>{children}</SlideNav>
    ) : (
        <TopNav>{children}</TopNav>
    );

const NavRoutes = ({ routeList, user }) =>
    ROUTES[routeList].map(route => (
        <li key={route.pathname} className={`navlink-${route.pathname}`}>
            <Link to={route.pathname}>
                {route.pathname === '/account' ? user.username : route.title}
            </Link>
        </li>
    ));

const Navigation = ({ user, location, ...props }) => (
    <NavType
        pathname={location.pathname}
        className={`Navigation ${user ? 'logged-out' : 'logged-in'} unmarkable`}
    >
        <NavList className="NavList">
            {user ? (
                <>
                    {<NavRoutes routeList="loggedIn" user={user} />}
                    <li>
                        <SignOutButton />
                    </li>
                </>
            ) : (
                <NavRoutes routeList="loggedOut" />
            )}
        </NavList>
    </NavType>
);

const LoggedInRoutes = ({ user, pathname }) => (
    <>
        <NavList className="NavList">
            <li>
                <SignOutButton />
            </li>
        </NavList>
    </>
);

const LoggedOutRoutes = ({ pathname }) => (
    <ul className="landing-nav">
        <li>
            <Link className="logo" to={ROUTES.LANDING}></Link>
        </li>

        <li className="landing-btn-container">
            <Link className="landing-btn" to={ROUTES.SIGN_UP}>
                Skapa konto
            </Link>
        </li>

        <li>
            <Link className="landing-btn" to={ROUTES.SIGN_IN}>
                Logga in
            </Link>
        </li>
    </ul>
);

export default withAuthentication(withRouter(Navigation));
