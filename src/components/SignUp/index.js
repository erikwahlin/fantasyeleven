import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import styled from 'styled-components'

const Form = styled.form`
	margin: 0 auto;
	width: 50%;
	display:flex;	
	flex-direction: column;
	min-height: 100vh;
	display:flex;
	justify-content: center;
`
const InputWrap = styled.div`
color: white;
display:flex;
flex-direction: row;
align-items: center;
margin: 5px;
`

const Input = styled.input`
background-color: white;
outline: none;
height: 1.9em;
width: 90%;
font-size: 1.0em;

border-radius: 0 4px 4px 0;
border: 1px solid lightgray;

`
const Placeholder = styled.span`
background: rgb(5, 66, 122);
color: white;
border-radius: 4px 0 0 4px;
height: 2.2em;
width: 10em;
font-size: 1.0em;
font-weight: bold;
display: flex;
align-items: center;
justify-content: center;

`

const SubmitButton = styled.button`
	padding: 12px;
	background-color: rgb(5, 66, 122);
	border-radius: 4px;
	color: white;
	font-weight: bold;
	font-size: 1.0em;
	cursor: pointer;
	margin-top: 40px;
	border:none;
	width: 60%;
	display: flex;
	align-self: center;
	justify-content: center;


`
const Admin = styled.label`
color: white;
`;

const ErrorMessage = styled.a`
text-decoration: none;
background-color: white;
`

const Wrapper = styled.div`
background-color: rgba(2,31,61,1)
`
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
		this.setState({ [event.target.name]: event.target.value });
	};

	onChangeCheckbox = event => {
		this.setState({ [event.target.name]: event.target.checked });
	};

	render() {
		const { username, email, passwordOne, passwordTwo, isAdmin, error } = this.state;

		const isInvalid =
			passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

		return (
			<Form onSubmit={this.onSubmit}>
				<InputWrap>
				<Placeholder>Namn</Placeholder>
				<Input
					name='username'
					value={username}
					onChange={this.onChange}
					type='text'
				/>
				</InputWrap>
				<InputWrap>
				<Placeholder>E-postadress</Placeholder>
				<Input
					name='email'
					value={email}
					onChange={this.onChange}
						type='text'
				/>
				</InputWrap>
				<InputWrap>
				<Placeholder>Lösenord</Placeholder>
				<Input
					name='passwordOne'
					value={passwordOne}
					onChange={this.onChange}
					type='password'

				/>
				</InputWrap>
				<InputWrap>
				<Placeholder>Lösenord igen</Placeholder>
				<Input
					name='passwordTwo'
					value={passwordTwo}
					onChange={this.onChange}
					type='password'
				/>
				</InputWrap>
				<Admin>
					Admin:
					<input
						name='isAdmin'
						type='checkbox'
						checked={isAdmin}
						onChange={this.onChangeCheckbox}
					/>
				</Admin>
				<SubmitButton disabled={isInvalid} type='submit'>
					Registrera
				</SubmitButton>

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
