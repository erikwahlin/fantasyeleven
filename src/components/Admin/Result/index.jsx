import React, { Component } from 'react';

import ResultForm from './ResultForm';
import ResultList from './ResultList';

import NewResultWrapper from '../NewResult';

const Result = props => (
    <>
        {/* <ResultForm /> */}
        <NewResultWrapper />

        <ResultList />
    </>
);

export default Result;
