export const LANDING = '/';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const HOME = '/home';
export const OVERVIEW = '/overview';
export const MYTEAMS = '/myteams';
export const NEWTEAM = '/newteam';
export const ACCOUNT = '/account';
export const PASSWORD_FORGET = '/pw-forget';
export const ADMIN = '/admin';
export const ADMIN_DETAILS = '/admin/:id';
export const ABOUT = '/about';

export const topNav = [
    LANDING,
    SIGN_UP,
    SIGN_IN,
    HOME,
    ACCOUNT,
    PASSWORD_FORGET,
    ADMIN,
    ADMIN_DETAILS,
    ABOUT
];

export const slideNav = [NEWTEAM, OVERVIEW];

export const loggedIn = [
    { pathname: LANDING, title: 'Start' },
    { pathname: ADMIN, title: 'Admin' },
    { pathname: ACCOUNT, title: 'Konto' },
    { pathname: NEWTEAM, title: 'Bygg ditt lag' },
    { pathname: OVERVIEW, title: 'Mitt spel' },
    { pathname: ABOUT, title: 'Om' }
];

export const loggedOut = [
    { pathname: LANDING, title: 'Start' },
    { pathname: NEWTEAM, title: 'Bygg ditt lag' },
    { pathname: SIGN_IN, title: 'Logga in' },
    { pathname: SIGN_UP, title: 'Registrera konto' },
    { pathname: PASSWORD_FORGET, title: 'Glömt lösenord' },
    { pathname: ABOUT, title: 'Om' }
];
