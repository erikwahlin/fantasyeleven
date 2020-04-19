import React, { createContext } from 'react';

const NewTeamCtx = createContext(null);

export const withNewTeam = Component => props => (
    <NewTeamCtx.Consumer>{NewTeam => <Component {...props} team={NewTeam} />}</NewTeamCtx.Consumer>
);

export default NewTeamCtx;
