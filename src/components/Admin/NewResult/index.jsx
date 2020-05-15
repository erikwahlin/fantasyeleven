import React from 'react';
import NewResState from './NewResState';
import NewResultSteps from './NewResultSteps';

const NewResult = ({ round }) => {
    return (
        <NewResState>
            <NewResultSteps round={round} />
        </NewResState>
    );
};

export default NewResult;
