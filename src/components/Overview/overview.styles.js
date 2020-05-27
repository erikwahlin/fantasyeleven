import styled, { css } from 'styled-components';

export const ContentWrap = styled.div`
    margin-top: 50px !important;

    width: 100%;
    height: 100%;

    @media all and (max-width: 899px) {
        /* prev 480 */

        width: 100%;
        height: 100%;
    }

    @media all and (max-width: 480px) {
        height: auto;
    }
`;

export const OuterWrapper = styled.div`
    width: 100%;
    height: 100vh;
    min-width: 420px;
    margin: 0;
    position: relative;

    /*   @media all and (max-width: 899px) {
        position: fixed;
        z-index: 1;
        opacity: 1;
        left: 110vw;
        top: 0;
        height: 100%;
        width: 100%;
        background: #011931;
    } */

    @media all and (min-width: 900px) {
        margin: 0 auto 0 0;
        max-width: 550px;
        height: 825px;
    }
`;

export const InnerWrapper = styled.div`
    display: flex;

    width: 55%;
    height: 100%;
    max-width: 500px;
    flex-direction: column;
    position: relative;
    margin: 0 auto;

/*     ${p =>
        p.isMobile &&
        css`
        position: fixed;
        z-index: 1;
        height: 100%;
        width: 100%;
        background: #011931;
    `} */

    transition: all .5s;

    @media all and (min-width: 900px) {
        & > * {
            width: 100%;
        }
    }
`;

export const PitchWrap = styled.div`
    position: relative;
    min-width: 576px;
    height: 522px;
    margin: 0 auto;
    margin-bottom: 30px;

    height: fit-content;

    @media all and (max-width: 40px) {
        width: 100vw;
        /* height: 90vw; */
    }

    @media all and (max-width: 899px) {
        order: 2;
    }

    ${p =>
        p.stageName === 'bench' &&
        css`
            opacity: 0.5;
            filter: /* grayscale(1) */ brightness(70%);
        `};
`;

export const PitchImg = styled.img`
    width: 100%;
    height: 100%;
    max-width: 576px;
    position: absolute;

    ${p =>
        p.stageName === 'bench' &&
        css`
            opacity: 0.5;
        `};
`;

export const ResultWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Stake = styled.div`
    h5 {
        font-family: 'Avenir';
        font-size: 1.1em;
        color: black;
        margin-bottom: -5px;
        
    }

    background-color: #e2dddd;
    max-width:576px;
    width: 300px;
    height: auto;
    padding-left: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 3px;
    margin:0 auto;

      @media all and (max-width: 899px) {
        width:100%;
        max-width:576px;
    }
`;

export const Revenue = styled.div`
    background-color: #00840a;
    color: white;
    width: 300px;
    max-width:576px;
    height: auto;
    padding-left: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 50px;
    margin:0 auto;

        @media all and (max-width: 899px) {
        width:100%;
        max-width:576px;
    }
`;

export const Payout = styled.div`
    background-color: #00840a;
    color: white;
    width: 300px;
    height: auto;
    padding-left: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
`;
