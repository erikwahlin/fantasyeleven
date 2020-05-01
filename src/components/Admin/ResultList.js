import React, { useState } from 'react';
import { clone } from '../../constants/helperFuncs';
import './form.css';

import { listTemplate } from './template';

const { Content } = listTemplate;

const initialState = {
    ready: false,
    round: '',
    result: null
};

const ResultList = () => {
    return <Content title="Befintliga resultat" items={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />;
};

export default ResultList;
