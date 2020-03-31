import React, { createContext } from 'react';

const MyTeamCtx = createContext(null);

export const withMyTeam = Component => props => (
	<MyTeamCtx.Consumer>
		{myTeam => <Component {...props} myTeam={myTeam} />}
	</MyTeamCtx.Consumer>
);

export default MyTeamCtx;
