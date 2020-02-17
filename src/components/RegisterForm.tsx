import React from "react";
import firebase from "firebase";

import "../css/common.css";
import "../css/RegisterForm.css";
import { Redirect } from "react-router-dom";


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
            isLoading: true,
            error: undefined
        }
    }

    componentDidMount() {
        this._isMounted = true;
        setTimeout(
            () => {
                if (this._isMounted)
                    this.setState({isLoading: false});
            },
            1000
        )
    }

    handleEmailChange(event: any) {
        if (!this.state.isLoading && this._isMounted) this.setState({email: event.target.value});
    }
    handlePasswordChange(event: any) {
        if (!this.state.isLoading && this._isMounted) this.setState({password: event.target.value});
    }
    handleConfirmPasswordChange(event: any) {
        if (!this.state.isLoading && this._isMounted) this.setState({confirmPassword: event.target.value});
    }

    register() {
        if (this.state.password === this.state.confirmPassword) {
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
