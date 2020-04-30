import styled from 'styled-components';
import { Steps } from 'antd';

const StepContainer = styled(Steps)`
    height: auto;
    max-height: 30px;

    max-width: 490px;
    margin: 0px auto 40px;

    &
        .ant-steps-item-wait
        > .ant-steps-item-container
        > .ant-steps-item-content
        > .ant-steps-item-title {
        color: white;
    }

& .ant-steps-item-icon {
    background:#adadad;
    opacity:0.7;
}

    & .ant-steps-item-finish .ant-steps-item-icon {
        background-color: green;
        border: none;
    }

    & .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
        color: white;
    }

    & .ant-steps-item-process .ant-steps-item-icon {
    background: #24344e;
    border:none;}

    @media all and (max-width: 480px) {
        margin: 5px 0;
        display: flex;
        flex-direction: row !important;

        & .ant-steps-item-tail {
            display: none !important;
        }
        & .ant-steps-horizontal .ant-steps-label-horizontal .ant-steps-item-content {
            display: none;
            min-height: 0px !important;
        }
    }

    & .ant-steps-item-title {
        font-size: 0;
    }

    @media all and (max-height: 700px) {
        display: none !important;
    }
`;

export default StepContainer;

/*     color of icon when finished step        */
