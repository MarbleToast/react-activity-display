// RegisterForm.tsx
// Form for registering new users

// Imports
import React from "react";
import firebase from "firebase";

import "../css/common.css";
import "../css/RegisterForm.css";
import { Redirect } from "react-router-dom";


//State and Props interface
interface IRegisterFormProps {
    firebase: typeof firebase
}

interface IRegisterFormState {
    email: string,
    password: string,
    confirmPassword: string,
    redirect: boolean,
    isLoading: boolean,
    error?: string
}


class RegisterForm extends React.Component<IRegisterFormProps, IRegisterFormState> {

    _isMounted: boolean;

    constructor(props: IRegisterFormProps) {
        super(props);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this._isMounted = false;

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            redirect: false,
            isLoading: true
        }
    }

    componentDidMount() {
        // Time for Firebase
        this._isMounted = true;
        setTimeout(
            () => {
                if (this._isMounted)
                    this.setState({isLoading: false});
            },
            1000
        )
    }

    // Form field event listeners, using any because making an interface for the event object
    // is a lot of extraneous data
    handleEmailChange(event: React.SyntheticEvent<HTMLInputElement>) {
        if (!this.state.isLoading && this._isMounted) this.setState({email: event.currentTarget.value});
    }
    handlePasswordChange(event: React.SyntheticEvent<HTMLInputElement>) {
        if (!this.state.isLoading && this._isMounted) this.setState({password: event.currentTarget.value});
    }
    handleConfirmPasswordChange(event: React.SyntheticEvent<HTMLInputElement>) {
        if (!this.state.isLoading && this._isMounted) this.setState({confirmPassword: event.currentTarget.value});
    }


    register() {
        // Firebase throws back errors we get so we just check if the two passwords are the same
        if (this.state.password === this.state.confirmPassword && this._isMounted) {
            this.props.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                () => {
                    this.setState({redirect: true});
                }
            )
            .catch(
                (error) => {
                    this.setState({
                        redirect: false,
                        error: error
                    });
                    console.log(error);
                }
            );
        }
    }

    componentWillUnmount() {
        // Unset to stop memory leaks
        this._isMounted = false;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="loading" />
            );
        }
        return (
            !this.state.redirect ?
            <div className="RegisterForm fade-in">
                {this.state.error && <span className="error-msg">Error!</span>}
                <input type="text" placeholder="Email" onChange={this.handleEmailChange} />
                <br />
                <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                <br />
                <input type="password" placeholder="Confirm Password" onChange={this.handleConfirmPasswordChange} />
                <br />
                <button className="colour-pulse" onClick={() => this.register()}>Sign In</button>
            </div>
            : <Redirect to={"/sign-in"} />
        );
    }
    
};

export default RegisterForm;
