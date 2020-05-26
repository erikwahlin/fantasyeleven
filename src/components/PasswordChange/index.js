import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import FormInput from '../FormInput/FormInput';
import { Form, Button } from '../../general-form-styled/form-styling';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
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
        const { passwordOne, passwordTwo, error } = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

        return (
            <Form onSubmit={this.onSubmit}>
                <FormInput
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    label="Nytt lösenord"
                />
                <FormInput
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    label="bekräfta nytt lösenord"
                />
                <Button disabled={isInvalid} type="submit">
                    Återställ lösenord
                </Button>

                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

export default withFirebase(PasswordChangeForm);
