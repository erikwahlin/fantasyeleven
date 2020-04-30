import React from 'react';
import styled, { css } from 'styled-components';

import { Wrapper, ContentWrapper } from './wrapperTemplate';

const Box = styled.div`
    width: ${p => p.width || '100%'};
    ${p =>
        p.minWidth &&
        css`
            min-width: ${p.minWidth};
        `};
    ${p =>
        p.maxWidth &&
        css`
            max-width: ${p.maxWidth};
        `};

    ${p =>
        p.height &&
        css`
            height: ${p.height};
        `};
    ${p =>
        p.minHeight &&
        css`
            min-height: ${p.minHeight};
        `};
    ${p =>
        p.maxHeight &&
        css`
            max-height: ${p.maxHeight};
        `};

    display: ${p => p.display || 'flex'};

    ${p =>
        p.flexDirection &&
        css`
            flex-direction: ${p.flexDirection};
        `};
    ${p =>
        p.justifyContent &&
        css`
            justify-content: ${p.justifyContent};
        `};

    ${p =>
        p.flex &&
        css`
            flex: ${p.flex};
        `};
    ${p =>
        p.alignSelf &&
        css`
            align-self: ${p.alignSelf};
        `};

    ${p =>
        p.display &&
        css`
            display: ${p.display};
        `};
`;

export const FlexList = ({ title, items, children }) => {
    return (
        <Wrapper className="Wrapper FlexList">
            <ContentWrapper className="Content">
                <Box className="Results" flexDirection="column">
                    {items.map((item, nth) => (
                        <Box
                            key={`result-${nth + 1}`}
                            className={`result-${nth + 1}`}
                            flexDirection="column"
                            flex="1"
                        >
                            result {nth}
                        </Box>
                    ))}
                </Box>
            </ContentWrapper>
        </Wrapper>
    );
};
