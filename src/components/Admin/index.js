import React, { useState } from 'react';
import { compose } from 'recompose';

import AdminState from './AdminState';
import AdminPage from './AdminPage';

import Navigation from '../Navigation';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { afterWinResize } from '../../constants/helperFuncs';
import Result from './Result_old';
import AwardForm from './AwardForm';
import Players from './Players';
import { BarChartOutlined } from '@ant-design/icons';
import { TeamOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { SkinOutlined } from '@ant-design/icons';
import { DollarCircleOutlined } from '@ant-design/icons';
import { FormOutlined } from '@ant-design/icons';
import { AreaChartOutlined } from '@ant-design/icons';
import { SettingOutlined } from '@ant-design/icons';
import FLogo from '../../components/Landing/fantasy11-white-logo.png';

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

const Admin = ({ location }) => {
    return (
        <>
            <AdminState>
                <AdminPage />
            </AdminState>
        </>
    );
};

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(withAuthorization(condition))(Admin);
