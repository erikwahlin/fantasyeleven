import styled, { css } from 'styled-components';
import { Tabs, Select, Space } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

export const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100%;
    min-height: 100vh;

    & * {
        /* color: #d3d6dc; */
        background: none;
    }

    & button,
    & a {
        cursor: pointer;
    }

    & .ant-tabs-tab {
    }

    &input[type='text'] {
        cursor: text;
    }

    & .ant-tabs-bar {
        ${p =>
            (p.tabPos === 'top' || p.tabPos === 'bottom') &&
            css`
                padding: 0 10px;
            `};
    }

    & .ant-tabs .ant-tabs-left-bar .ant-tabs-tab {
        font-size: 1em !important;
        font-weight: 500;
        color: black;
        cursor: pointer;
    }

    & .ant-tabs .ant-tabs-left-bar {
        background: white;
        border-right: 1px solid #2f3e55;
    }

    & .ant-tabs .ant-tabs-left-bar .ant-tabs-tab {
        text-align: left;
    }

    & .ant-tabs .ant-tabs-left-content {
        padding-left: 24px;
        border-left: 1px solid #eee;
    }

    & .hqLjmv .ant-tabs-ink-bar {
        background: /* #5ac5d3 */ red;
    }

    & .ant-tabs-ink-bar {
        background: /* #1890ff */ #00a00c;
    }

    ${p =>
        p.customstyle &&
        css`
            ${p.customstyle}
        `};
`;

export const Sel = styled(Select)``;

export const Opt = styled(Option)``;

export const TabContainer = styled(Tabs)`
    /* background: white; */
    z-index: 1;
    width: 100%;
`;

export const Tab = styled(TabPane)`
    color: #000;
`;

export const MainTitle = styled.h1`
    background: #e2dddd;
    text-align: right;
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #005c07;
`;

export const TabTitle = styled.h2``;
