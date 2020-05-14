import React, { useState } from 'react';
import { compose } from 'recompose';

import { withAdmin } from './AdminState';

import Navigation from '../Navigation';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { afterWinResize } from '../../constants/helperFuncs';
import Result from './Result';
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
import FLogo from '../../components/Landing/fantasy11-white-logo.png';

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
        <Wrapper className="Admin unmarkable" tabPos={tabPos} winW={winW}>
            <MainTitle>
                {/* <SettingOutlined style={{ color: '#5ac5d4' }} /> */}
                <span style={{ fontFamily: 'Avenir', fontSize: '14px' }}>
                    <UserOutlined style={{ color: '#5ac5d4' }} />
                    <span>&nbsp;</span>Viktor Lager
                </span>
            </MainTitle>

            <TabContainer
                tabPosition={tabPos}
                tabBarExtraContent={tabPosMenu()}
                className="TabContainer unmarkable"
                defaultActiveKey="2"
            >
                <Tab
                    tab={
                        <span>
                            <img
                                src={FLogo}
                                style={{ width: '110px', marginLeft: '15px', marginTop: '10px' }}
                            />
                        </span>
                    }
                    key="0"
                ></Tab>

                <Tab
                    tab={
                        <span>
                            <ScheduleOutlined style={{ color: '#5ac5d4' }} />
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
                            <AreaChartOutlined style={{ color: '#5ac5d4' }} />
                            Resultat
                        </span>
                    }
                    key="2"
                >
                    <TabTitle>Resultat</TabTitle>

                    <Result />
                </Tab>

                <Tab
                    tab={
                        <span>
                            <DollarCircleOutlined style={{ color: '#5ac5d4' }} />
                            Utdelningsmodell
                        </span>
                    }
                    key="3"
                >
                    <TabTitle>Utdelningsmodell</TabTitle>

                    <AwardForm />
                </Tab>

                <Tab
                    tab={
                        <span>
                            <BarChartOutlined style={{ color: '#5ac5d4' }} />
                            Användarstatistik
                        </span>
                    }
                    key="4"
                >
                    <TabTitle>Användarstatistik</TabTitle>
                </Tab>

                <Tab
                    tab={
                        <span>
                            <TeamOutlined style={{ color: '#5ac5d4' }} />
                            Användarhantering
                        </span>
                    }
                    key="5"
                >
                    <TabTitle>Användarhantering</TabTitle>
                </Tab>

                <Tab
                    tab={
                        <span>
                            <FormOutlined style={{ color: '#5ac5d4' }} />
                            Innehåll
                        </span>
                    }
                    key="6"
                >
                    <TabTitle>Innehåll</TabTitle>
                </Tab>

                <Tab
                    tab={
                        <span>
                            <SkinOutlined style={{ color: '#5ac5d4' }} />
                            Spelare
                        </span>
                    }
                    key="7"
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
