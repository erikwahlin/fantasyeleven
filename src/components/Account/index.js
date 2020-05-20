import React, { Component } from 'react';
import { compose } from 'recompose';

import {
    AuthUserContext,
    withAuthorization
    //  withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import Navigation from '../Navigation';
import styled from 'styled-components';

const StyledH1 = styled.h1`
    text-align: center;
    /* margin-top: 20px; */
    font-size: 3em;
`;
const OuterWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;
const InnerWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* border-radius: 10px; */
    border: 1px solid #001233;
    width: 40%;
    background-color: #001c3e;

    @media all and (max-width: 480px) {
        width: 100vw;
        box-shadow: none;
        justify-content: space-between;
        height: 100vh;
    }
    @media all and (min-width: 481px) and (max-width: 1200px) {
        width: 70vw;
    }
`;
const SIGN_IN_METHODS = [
    {
        id: 'password',
        provider: null
    },
    {
        id: 'google.com',
        provider: 'googleProvider'
    },
    {
        id: 'facebook.com',
        provider: 'facebookProvider'
    },
    {
        id: 'twitter.com',
        provider: 'twitterProvider'
    }
];

const AccountPage = ({ location }) => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                {/* <Navigation pathname={location.pathname} /> */}
                <OuterWrap>
                    <InnerWrap>
                        <StyledH1>Account: {authUser.email}</StyledH1>
                        <PasswordForgetForm />
                        <PasswordChangeForm />
                    </InnerWrap>
                </OuterWrap>
                {/* <LoginManagement authUser={authUser} /> */}
            </div>
        )}
    </AuthUserContext.Consumer>
);

class LoginManagementBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSignInMethods: [],
            error: null
        };
    }

    componentDidMount() {
        this.fetchSignInMethods();
    }

    fetchSignInMethods = () => {
        this.props.firebase.auth
            .fetchSignInMethodsForEmail(this.props.authUser.email)
            .then(activeSignInMethods => this.setState({ activeSignInMethods, error: null }))
            .catch(error => this.setState({ error }));
    };

    onSocialLoginLink = provider => {
        this.props.firebase.auth.currentUser
            .linkWithPopup(this.props.firebase[provider])
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    onDefaultLoginLink = password => {
        const credential = this.props.firebase.emailAuthProvider.credential(
            this.props.authUser.email,
            password
        );

        this.props.firebase.auth.currentUser
            .linkAndRetrieveDataWithCredential(credential)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    onUnlink = providerId => {
        this.props.firebase.auth.currentUser
            .unlink(providerId)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    render() {
        const { activeSignInMethods, error } = this.state;

        return (
            <div>
                Sign In Methods:
                <ul>
                    {SIGN_IN_METHODS.map(signInMethod => {
                        const onlyOneLeft = activeSignInMethods.length === 1;
                        const isEnabled = activeSignInMethods.includes(signInMethod.id);

                        return (
                            <li key={signInMethod.id}>
                                {signInMethod.id === 'password' ? (
                                    <DefaultLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onDefaultLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                ) : (
                                    <SocialLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onSocialLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
                {error && error.message}
            </div>
        );
    }
}

const SocialLoginToggle = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink }) =>
    isEnabled ? (
        <button type="button" onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft}>
            Deactivate {signInMethod.id}
        </button>
    ) : (
        <button type="button" onClick={() => onLink(signInMethod.provider)}>
            Link {signInMethod.id}
        </button>
    );

class DefaultLoginToggle extends Component {
    constructor(props) {
        super(props);

        this.state = { passwordOne: '', passwordTwo: '' };
    }

    onSubmit = event => {
        event.preventDefault();

        this.props.onLink(this.state.passwordOne);
        this.setState({ passwordOne: '', passwordTwo: '' });
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props;

        const { passwordOne, passwordTwo } = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

        return isEnabled ? (
            <button type="button" onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft}>
                Deactivate {signInMethod.id}
            </button>
        ) : (
            <form onSubmit={this.onSubmit}>
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm New Password"
                />

                <button disabled={isInvalid} type="submit">
                    Link {signInMethod.id}
                </button>
            </form>
        );
    }
}

const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default compose(
    //  withEmailVerification,
    withAuthorization(condition)
)(AccountPage);
