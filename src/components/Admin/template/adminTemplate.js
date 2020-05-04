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

    & .ant-tabs-ink-bar {
        background: #1890ff;
    }
`;

export const Sel = styled(Select)``;

export const Opt = styled(Option)``;

export const TabContainer = styled(Tabs)``;

export const Tab = styled(TabPane)`
    color: #000;
`;

export const MainTitle = styled.h1`
    text-align: center;
    padding: 20px;
`;

export const TabTitle = styled.h2``;
