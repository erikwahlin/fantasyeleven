import React from 'react';
import styled from 'styled-components';
import { WrapperRow } from '../Elements';

// TEMP STYLE
const Wrapper = styled(WrapperRow)`
    justify-content: space-between;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
`;

const DefaultNav = ({ user, children: links, ...props }) => (
    <Wrapper className={`Navigation Default ${user ? 'logged-out' : 'logged-in'} unmarkable`}>
        {links}
    </Wrapper>
);

export default DefaultNav;
