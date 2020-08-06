import React, { isValidElement } from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentContainer = styled.div`
    background: none;

    text-align: center;
    width: 100vw;
    max-width: 300px;
    height: 100vh;
    max-height: 800px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DefaultContent = styled.p`
    font-size: 1rem;
    font-family: Avenir;
`;

const styles = {
    loader: { fontSize: 40, margin: '20px auto' }
};

const Loader = ({ isLoading = false, content, position = 'top' }) => {
    if (!isLoading) return null;

    const output =
        typeof content === 'string' ? (
            <DefaultContent>{content}</DefaultContent>
        ) : isValidElement(content) ? (
            content
        ) : null;

    return (
        <Container>
            <ContentContainer>
                {position === 'top' && output}
                <LoadingOutlined style={styles.loader} spin />
                {position === 'bottom' && output}
            </ContentContainer>
        </Container>
    );
};

export default Loader;
