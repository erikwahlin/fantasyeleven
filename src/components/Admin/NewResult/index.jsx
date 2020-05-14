import React from 'react';
import NewResState from './NewResState';
import NewResult from './NewResult';

const NewResultWrapper = props => {
    return (
        <NewResState>
            <NewResult />
        </NewResState>
    );
};

export default NewResultWrapper;
