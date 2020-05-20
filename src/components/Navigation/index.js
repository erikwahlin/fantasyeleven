import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { AuthUserContext, withAuthentication } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import DefaultNav from './DefaultNav';
import DrawerNav from './DrawerNav';

// styled(drawer)
const LinkContainer = styled.div`
    margin: 20px;
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
            <Link to={route.pathname}>
                {route.pathname === '/account' ? user.username : route.title}
            </Link>
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
                <LinkContainer>
                    <SignOutButton />
                </LinkContainer>
            </>
        ) : (
            <NavRoutes routeList="loggedOut" />
        )}
    </NavType>
);

export default withAuthentication(withRouter(Navigation));
