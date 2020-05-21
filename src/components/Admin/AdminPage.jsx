import React, { useState } from 'react';
import { compose } from 'recompose';

import { withAdmin } from './AdminState';

import Navigation from '../Navigation';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { afterWinResize } from '../../constants/helperFuncs';
import Rounds from './Rounds';
import AwardForm from './AwardForm';
import Players from './Players';
import { BarChartOutlined } from '@ant-design/icons';
import { TeamOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { SkinOutlined } from '@ant-design/icons';
import { DollarCircleOutlined } from '@ant-design/icons';
import { FormOutlined } from '@ant-design/icons';
import { AreaChartOutlined } from '@ant-design/icons';
import { SettingOutlined, ScheduleOutlined } from '@ant-design/icons';
import FLogo from '../../components/Landing/fantasy11-logo.png';

import { adminTemplate } from './template/';

const { Wrapper, Sel, Opt, TabContainer, Tab, MainTitle, TabTitle } = adminTemplate;

const AdminPage = ({ location }) => {
    const [tabPos, setTabPos] = useState(window.innerWidth > 899 ? 'left' : 'top');
    const [winW, setWinW] = useState(window.innerWidth);

    const posHandler = newPos => {
        setTabPos(newPos);
    };

    afterWinResize(() => {
        let newPos = tabPos;
        const winW = window.innerWidth;
        if (winW < 899) {
            if (tabPos === 'left' || tabPos === 'right') {
                newPos = 'top';
            }
        }

        posHandler(newPos);
        setWinW(window.innerWidth);
    });

    const tabPosMenu = () =>
        winW > 899 ? (
            <Sel onChange={posHandler} dropdownMatchSelectWidth={false} defaultValue="none">
                <Opt value="none" disabled>
                    Positionera
                </Opt>
                <Opt value="top">Uppe</Opt>
                <Opt value="bottom">Nere</Opt>
                <Opt value="left">Vänster</Opt>
                <Opt value="right">Höger</Opt>
            </Sel>
        ) : null;

    return (
        <Wrapper
            className="Admin unmarkable"
            tabPos={tabPos}
            winW={winW}
            customStyle="width: 100%;"
        >
            {/*             <MainTitle>
                
                <span style={{ fontFamily: 'Avenir', fontSize: '14px' }}>
                    <UserOutlined style={{ color: '#005C07' }} />
                    <span>&nbsp;</span>Viktor Lager
                </span>
            </MainTitle> */}

            <TabContainer
                tabPosition={tabPos}
                tabBarExtraContent={tabPosMenu()}
                className="TabContainer unmarkable"
                defaultActiveKey="1"
            >
                <Tab
                    tab={
                        <span>
                            <img
                                src={FLogo}
                                style={{ width: '130px', marginLeft: '5px', marginTop: '10px' }}
                            />
                        </span>
                    }
                    key="0"
                ></Tab>

                <Tab
                    tab={
                        <span>
                            <ScheduleOutlined style={{ color: '#005C07' }} />
                            Omgångar
                        </span>
                    }
                    key="1"
                >
                    <TabTitle>Omgångar</TabTitle>

                    <Rounds />
                </Tab>

                <Tab
                    tab={
                        <span>
                            <DollarCircleOutlined style={{ color: '#005C07' }} />
                            Utdelningsmodell
                        </span>
                    }
                    key="2"
                >
                    <TabTitle>Utdelningsmodell</TabTitle>

                    <AwardForm />
                </Tab>

                <Tab
                    tab={
                        <span>
                            <BarChartOutlined style={{ color: '#005C07' }} />
                            Användarstatistik
                        </span>
                    }
                    key="3"
                >
                    <TabTitle>Användarstatistik</TabTitle>
                </Tab>

                <Tab
                    tab={
                        <span>
                            <TeamOutlined style={{ color: '#005C07' }} />
                            Användarhantering
                        </span>
                    }
                    key="4"
                >
                    <TabTitle>Användarhantering</TabTitle>
                </Tab>

                <Tab
                    tab={
                        <span>
                            <FormOutlined style={{ color: '#005C07' }} />
                            Innehåll
                        </span>
                    }
                    key="5"
                >
                    <TabTitle>Innehåll</TabTitle>
                </Tab>

                <Tab
                    tab={
                        <span>
                            <SkinOutlined style={{ color: '#005C07' }} />
                            Spelare
                        </span>
                    }
                    key="6"
                >
                    {/* <TabTitle>Spelare</TabTitle> */}
                    <Players />
                </Tab>
            </TabContainer>
        </Wrapper>
    );
};

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(withAuthorization(condition), withAdmin)(AdminPage);
