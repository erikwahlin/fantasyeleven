import React from 'react';
import { Wrapper } from '../template/wrapperTemplate';

import { withAdmin } from '../AdminState';
import { withResult } from './ResultState';

const OverView = ({}) => {
    return (
        <Wrapper className="OverView Wrapper unmarkable">
            <h2>Översikt</h2>
        </Wrapper>
    );
};

export default withAdmin(withResult(OverView));
