import React from 'react';
import ResultState from './ResultState';
import ResultPage from './ResultPage';

const NewResult = ({ roundIndex }) => {
    return (
        <ResultState roundIndex={roundIndex}>
            <ResultPage roundIndex={roundIndex} />
        </ResultState>
    );
};

export default NewResult;
