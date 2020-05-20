import React from 'react';

import { withFirebase } from '../Firebase';

import { ButtonStandard } from '../Elements';

const SignOutButton = ({ firebase }) => <a onClick={firebase.doSignOut}>Logga ut</a>;

export default withFirebase(SignOutButton);
