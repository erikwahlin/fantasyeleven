import React, { Component } from 'react';

import ResultForm from './ResultForm';
import ResultList from './ResultList';

import NewResult from '../NewResult';

const Result = props => (
    <>
        {/* <ResultForm /> */}
        <NewResult />

        <ResultList />
    </>
);

export default Result;
