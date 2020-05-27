import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as ROUTES from '../../constants/routes';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        /* Helper */

        this.serverValue = app.database.ServerValue;
        //this.emailAuthProvider = app.auth.EmailAuthProvider;

        /* Firebase APIs */

        this.auth = app.auth();
        this.db = app.database();

        /* Social Sign In Method Provider */

        //this.googleProvider = new app.auth.GoogleAuthProvider();
        //this.facebookProvider = new app.auth.FacebookAuthProvider();
        //this.twitterProvider = new app.auth.TwitterAuthProvider();

        //this.listAll();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password);
    };

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

    doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

    doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

    doSignOut = props => {
        this.auth.signOut().then(() => {
            //console.log(window.location, window.location.href, window.location.hostname);
            window.location.href = window.location.origin;

            //props.history.push(ROUTES.LANDING);
        });
    };

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
        });

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = [];
                        }

                        // merge auth and db user
                        authUser = {
                            roles: dbUser.roles,
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser
                        };

                        //console.log('usersss', this.users());

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}

export default Firebase;
