import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import FormInput from '../FormInput/FormInput';
import styled from 'styled-components';
import { Form } from '../../general-form-styled/form-styling';
const Input = styled.input`
    background-color: #e2dddd;
    outline: none;
    height: 3em;
    width: 90%;
    font-size: 1.2em;
    font-weight: 500;
    border-radius: 0 4px 4px 0;
    border: 1px solid lightgray;
    color: black;
    padding-left: 15px;
    font-family: 'Avenir';
`;

const InputWrap = styled.div`
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5px;
`;

/* const Form = styled.form`
    margin: 0 auto;
    width: 55%;
    height: 400px;
    /* padding: 100px; */
/* display: flex;
    flex-direction: column;
    min-height: 100vh;
    display: flex;
    justify-content: center;
`; */

const Placeholder = styled.span`
    background: rgba(36, 132, 10, 0.6);
    color: white;
    border-radius: 4px 0 0 4px;
    height: 3em;
    width: 10em;
    min-width: 50px;
    font-size: 1.2em;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SubmitButton = styled.button`
    padding: 12px;
    background-color: rgba(36, 132, 10, 0.6);
    border-radius: 4px;
    color: white;
    font-weight: bold;
    font-size: 1.2em;
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: -20px;
    border: none;
    width: 30%;
`;

const ButtonWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Wrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
`;

const Admin = styled.label`
    color: white;
`;

const SignUpPage = () => (
    <Wrapper>
        <SignUpForm />
    </Wrapper>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne, isAdmin } = this.state;
        const roles = [];

        if (isAdmin) {
            roles.push(ROLES.ADMIN);
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase.user(authUser.user.uid).set({
                    username,
                    email,
                    roles
                });
            })
            //      .then(() => {
            //        return this.props.firebase.doSendEmailVerification();
            //      })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    onChangeCheckbox = event => {
        const { name, checked } = event.target;
        this.setState({ [name]: checked });
    };

    render() {
        const { username, email, passwordOne, passwordTwo, isAdmin, error } = this.state;
        const pwValidation = (pw1, pw2) => {
            if ((pw1.length === 0 && pw2.length === 0) || pw2.length === 0) {
                return '';
            }
            if (pw2.length < 6) {
                return 'ditt lösenord är kortare än 6 bokstäver';
            }
            if (pw1.length >= 6 && pw2.length >= 6 && pw1 !== pw2) {
                return 'dina lösenord är inte identiska';
            }
        };
        const isPWInvalid =
            passwordTwo.length < 6 || passwordOne !== passwordTwo || passwordTwo.length < 6;
        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

        return (
            <Form onSubmit={this.onSubmit}>
                <InputWrap>
                    <Placeholder>Namn</Placeholder>
                    <Input name="username" value={username} onChange={this.onChange} type="text" />
                </InputWrap>
                <InputWrap>
                    <Placeholder>E-postadress</Placeholder>
                    <Input name="email" value={email} onChange={this.onChange} type="text" />
                </InputWrap>
                <InputWrap>
                    <Placeholder>Lösenord</Placeholder>
                    <Input
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                    />
                </InputWrap>
                <InputWrap>
                    <Placeholder>Lösenord igen</Placeholder>
                    <Input
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                    />
                </InputWrap>
                {/*                 <Admin>
                    Admin:
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                    />
                </Admin> */}
                <ButtonWrap>
                    <SubmitButton disabled={isInvalid} type="submit">
                        Registrera
                    </SubmitButton>
                </ButtonWrap>

                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Har du inget konto? <Link to={ROUTES.SIGN_UP}>Registrera dig</Link>
    </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
