import React from 'react';
import { compose } from 'recompose';

import AdminState from './AdminState';
import AdminPage from './AdminPage';

import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

const Admin = () => {
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
