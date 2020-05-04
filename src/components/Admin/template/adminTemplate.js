import styled, { css } from 'styled-components';
import { Tabs, Select, Space } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

export const Wrapper = styled.div`
    background: #182231;

    width: 100vw;
    height: 100%;
    min-height: 100vh;

    & * {
        color: #d3d6dc;
        background: none;
    }

    & button,
    & a,
    & input[type='submit'] {
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
        color:#d3d6dc;
        cursor: pointer;
    }

    & .ant-tabs .ant-tabs-left-bar {
        border-right: 1px solid #2f3e55;
    }

      & .ant-tabs .ant-tabs-left-content {
    padding-left: 24px;
    border-left: 1px solid #2f3e55;
}

    & .hqLjmv .ant-tabs-ink-bar {
    background: #5ac5d3;
}

    & .ant-tabs-ink-bar {
        background: #1890ff;
    }
`;

export const Sel = styled(Select)``;

export const Opt = styled(Option)``;

export const TabContainer = styled(Tabs)`
background:#131b29;
`;

export const Tab = styled(TabPane)`
    color: #000;
    background:#182231;

`;

export const MainTitle = styled.h1`
    background:#182231; 
    text-align: center;
    padding: 20px;
    margin-bottom:20px;
    border-bottom:1px solid #2f3e55;
`;

export const TabTitle = styled.h2`

    `;
