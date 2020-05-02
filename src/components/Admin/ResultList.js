import React, { useState } from 'react';
import { clone } from '../../constants/helperFuncs';
import './form.css';

import { Result } from './template';

const initialState = {
    ready: false,
    round: '',
    result: null
};

const ResultList = props => {
    // crud results from db later
    const results = [];
    return <Result />;
};

export default ResultList;
