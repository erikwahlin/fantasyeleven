import React from 'react';
import ResultState from './ResultState';
import ResultPage from './ResultPage';

const NewResult = ({ roundIndex, closeResult }) => {
    return (
        <ResultState roundIndex={roundIndex}>
            <ResultPage roundIndex={roundIndex} closeResult={closeResult} />
        </ResultState>
    );
};

export default NewResult;
