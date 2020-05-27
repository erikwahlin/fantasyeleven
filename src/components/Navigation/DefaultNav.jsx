import React from 'react';
import styled from 'styled-components';
import { WrapperRow } from '../Elements';

// TEMP STYLE
const Wrapper = styled(WrapperRow)`
    justify-content: space-between;
    position: fixed;
    width: 97%;
    left: 15px;
    top: 5px;
    z-index:1;
`;

const DefaultNav = ({ user, children: links, ...props }) => (
    <Wrapper className={`Navigation Default ${user ? 'logged-out' : 'logged-in'} unmarkable`}>
        {links}
    </Wrapper>
);

export default DefaultNav;
