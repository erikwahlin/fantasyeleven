import React from 'react';
import NewResState from './NewResState';
import NewResultSteps from './NewResultSteps';

const NewResult = ({ roundIndex }) => {
    return (
        <NewResState roundIndex={roundIndex}>
            <NewResultSteps roundIndex={roundIndex} />
        </NewResState>
    );
};

export default NewResult;
