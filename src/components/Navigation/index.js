import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { withAuthentication } from '../Session';
import * as ROUTES from '../../constants/routes';
import DefaultNav from './DefaultNav';
import DrawerNav from './DrawerNav';

import { FaUser } from 'react-icons/fa';
import { GoTools } from 'react-icons/go';
import { GiSoccerBall } from 'react-icons/gi';
import { FaQuestionCircle } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';
import { FaSignInAlt } from 'react-icons/fa';
import { IoIosCreate } from 'react-icons/io';

// styled(drawer)
const LinkContainer = styled.div`
    margin: 20px;
    margin-top: 40px;
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
    const iconConfig = {
        '/': '',
        '/admin': <FaUser />,
        '/account': <FaUser />,
        '/newteam': <GoTools />,
        '/overview': <GiSoccerBall />,
        '/about': <FaQuestionCircle />
    };

    const routes = ROUTES[routeList].filter(r =>
        r.pathname === '/admin' && !user.roles.includes('ADMIN') ? false : true
    );

    return routes.map((route, index) => (
        <LinkContainer key={route.pathname} className={`navlink-${route.pathname} navLink`}>
            {iconConfig[route.pathname]}&nbsp;&nbsp;
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
            <LinkContainer>
                <IoIosCreate />
                &nbsp;&nbsp;
                <StyledLink to={ROUTES.SIGN_UP}>Skapa konto</StyledLink>
                <br />
                <br />
                <FaSignInAlt />
                &nbsp;&nbsp; <StyledLink to={ROUTES.SIGN_IN}>Logga in</StyledLink>
            </LinkContainer>
        )}

        {user && (
            <LinkContainer className={`navLink`}>
                <MdExitToApp />
                &nbsp;&nbsp;
                <CustomLink
                    onClick={() => {
                        props.firebase.doSignOut({ ...props });
                    }}
                >
                    Logga ut
                </CustomLink>
            </LinkContainer>
        )}
    </NavType>
);

export default withAuthentication(withRouter(Navigation));
