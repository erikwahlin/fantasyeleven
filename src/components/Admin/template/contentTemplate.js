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

const Row = styled(Box)`
    flex-direction: row;
    flex-wrap: wrap;
`;

const Col = styled(Box)`
    flex-direction: column;

    min-width: 25%;
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
