import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { WrapperRow, ButtonStandard } from '../Elements';
import { Drawer } from 'antd';
import { GiHamburgerMenu } from 'react-icons/gi';
import './DrawerStyle.css';

const Wrapper = styled(WrapperRow)`
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    width: fit-content;
    right: 0;
    top: 0;
`;

const MenuBtn = styled.div`
    background: none;
    color: #fff;
    width: 70px;
    height: 62px;
    padding: 15px 20px;
    margin: 0;
    cursor: pointer;
`;

const MenuIcon = styled(GiHamburgerMenu)`
    width: 30px;
    height: auto;
`;

const DrawerStyled = styled(Drawer)`
    & * {
        background: none;
    }

    & .navLink {
        margin-top: 10px;
    }

    & a {
        color: #fff;
        transition: 200ms;
    }

    & a:hover {
        color: #1890ff;
    }
`;

const DrawerNav = ({ user, location, children: links, ...props }) => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <Wrapper
            pathname={location.pathname}
            className={`Navigation Drawer ${user ? 'logged-out' : 'logged-in'} unmarkable`}
        >
            <MenuBtn type="primary" onClick={showDrawer}>
                <MenuIcon />
            </MenuBtn>

            <DrawerStyled
                drawerStyle={{ background: location.pathname === '/admin' ? '#000' : '#021f3d' }}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                onClick={onClose}
            >
                {links}
            </DrawerStyled>
        </Wrapper>
    );
};

export default DrawerNav;
