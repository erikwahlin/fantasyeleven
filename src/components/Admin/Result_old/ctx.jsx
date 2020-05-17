import React, { createContext } from 'react';

const ResultContext = createContext(null);

export const withResult = Component => props => (
    <ResultContext.Consumer>
        {Result => <Component {...props} resultContext={Result} />}
    </ResultContext.Consumer>
);

export default ResultContext;
