import React, { Component } from 'react';

import ResultForm from './ResultForm';
import ResultList from './ResultList';

import NewResultWrapper from '../Result';

const Result = props => (
    <>
        {/* <ResultForm /> */}
        <NewResultWrapper />

        <ResultList />
    </>
);

export default Result;
