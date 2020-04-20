import React, { createContext } from 'react';

const TeamContext = createContext(null);

export const withTeam = Component => props => (
    <TeamContext.Consumer>
        {NewTeam => <Component {...props} teamContext={NewTeam} />}
    </TeamContext.Consumer>
);

export default TeamContext;
