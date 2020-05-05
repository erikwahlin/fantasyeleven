import styled, { css } from 'styled-components';

export const clickedClass = (e, duration = 300, className = 'clicked') => {
    const target = e.target.classList.contains('UnderlayContainer')
        ? e.target
        : e.target.closest('.UnderlayContainer');

    target.classList.add(className);

    setTimeout(() => {
        target.classList.remove(className);
    }, duration);
};

export const Underlay = styled.div`
    -webkit-transition: ${p => p.duration || '0.3s'};
    -moz-transition: ${p => p.duration || '0.3s'};
    -o-transition: ${p => p.duration || '0.3s'};
    transition: ${p => p.duration || '0.3s'};

    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    opacity: ${p => p.opacity || '0'};
    z-index: ${p => p.zIndex || '0'};

    box-shadow: ${p => p.boxShadow || 'none'};
`;

export const AppearOnHover = styled(Underlay)`
    opacity: 0;
`;

export const DisappearOnHover = styled(Underlay)`
    opacity: 1;
`;

export const UnderlayContainer = styled.div`
    position: relative;
    text-align: center;
    align-self: flex-end;
    font-size: 1.4em;
    font-weight: 700;
    width: auto;
    height: 50px;
    padding: 0;

    cursor: ${p => p.cursor || 'pointer'};

    @media all and (max-width: 480px) {
        width: 100vw;
    }

    &:hover ${AppearOnHover} {
        opacity: 1;
    }

    &:hover ${DisappearOnHover} {
        opacity: 0;
    }

    margin: 40px 0 0;

    &[class*='clicked'] .underlay {
        opacity: 0 !important;
    }

    &[class*='clicked'] .underlay.appearOnClick {
        opacity: 1 !important;
    }

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `};
`;
