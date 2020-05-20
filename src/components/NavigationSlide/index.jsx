import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { WrapperCol } from '../Elements';

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
        {/* <img src={Logo} className="logotype"/> */}
        {pathname !== '/' && (
            <p style={{ margin: '0' }}>
                <i>(Will become a side-nav on this page){pathname}</i>
            </p>
        )}
        <NavList className="NavList">
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
                <Link to={ROUTES.OVERVIEW}>Översikt</Link>
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

export default Navigation;
