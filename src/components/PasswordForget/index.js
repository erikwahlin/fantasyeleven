import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import FormInput from '../FormInput/FormInput';
import {
    Form,
    Button,
    StyledH1,
    OuterWrap,
    InnerWrap
} from '../../general-form-styled/form-styling';

const PasswordForgetPage = () => (
    <OuterWrap>
        <InnerWrap>
            <StyledH1>Glömt lösenord?</StyledH1>
            <PasswordForgetForm />
        </InnerWrap>
    </OuterWrap>
);

const INITIAL_STATE = {
    email: '',
    error: null
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <Form onSubmit={this.onSubmit}>
                <FormInput
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    label="Mailadress"
                />
                <Button disabled={isInvalid} type="submit">
                    Återställ lösenord
                </Button>

                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Glömt lösenord?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
