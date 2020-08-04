import React from 'react';
import styled, { css } from 'styled-components';

import { Wrapper, ContentWrapper } from './wrapperTemplate';

const Box = styled.div`
    display: flex;

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `};
`;

const contentTemplate = ({ className, title, children }) => {
    return (
        <Wrapper className={`${className} Wrapper FlexList`}>
            <h2>{title}</h2>
            <ContentWrapper className="Content">{children}</ContentWrapper>
        </Wrapper>
    );
};

export default contentTemplate;
