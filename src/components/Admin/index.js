import React, { useState } from 'react';
import { compose } from 'recompose';
import Navigation from '../Navigation';

import { withAuthorization } from '../Session';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { afterWinResize } from '../../constants/helperFuncs';
import ResultForm from './ResultForm';
import ResultList from './ResultList';
import AwardForm from './AwardForm';

import { adminTemplate } from './template/';

const {
    Wrapper,

    Sel,
    Opt,
    TabContainer,
    Tab,
    MainTitle,
    TabTitle
} = adminTemplate;

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
            <MainTitle>Admin</MainTitle>

            <TabContainer
                tabPosition={tabPos}
                tabBarExtraContent={tabPosMenu()}
                className="TabContainer unmarkable"
            >
                <Tab tab="Resultat" key="0">
                    <TabTitle>Resultat</TabTitle>

                    <ResultForm />

                    <ResultList />
                </Tab>
                <Tab tab="Utdelningsmodell" key="1">
                    <TabTitle>Utdelningsmodell</TabTitle>

                    <AwardForm />
                </Tab>
                <Tab tab="Användarstatistik" key="2">
                    <TabTitle>Användarstatistik</TabTitle>
                </Tab>
                <Tab tab="Användarhantering" key="3">
                    <TabTitle>Användarhantering</TabTitle>
                </Tab>
                <Tab tab="Innehåll" key="4">
                    <TabTitle>Innehåll</TabTitle>
                </Tab>
                <Tab tab="Spelare" key="5">
                    <TabTitle>Spelare</TabTitle>
                </Tab>
            </TabContainer>
        </Wrapper>
    );
};

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(withAuthorization(condition))(AdminPage);
