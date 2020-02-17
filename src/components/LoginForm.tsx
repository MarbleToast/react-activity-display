import React from "react";
import firebase from "firebase";

import "../css/common.css";
import "../css/LoginForm.css";
import { Redirect } from "react-router-dom";


interface ILoginFormProps {
    firebase: typeof firebase
}
interface ILoginFormState {
    email: string,
    password: string,
    redirect: boolean,
    isLoading: boolean,
    error?: string
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {

    _isMounted: boolean;

    constructor(props: ILoginFormProps) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this._isMounted = false;

        this.state = {
            email: "",
            password: "",
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

    signIn() {
        this.props.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                () => {
                    this.setState({redirect: true});
                }
            )
            .catch(
                (error) => {
                    this.setState({
                        redirect: false,
                        error: error.code
                    });
                    console.log(error);
                }
            );
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
            <div className="LoginForm fade-in">
                {this.state.error && <span className="error-msg">Invalid email or password.</span>}
                <input type="text" placeholder="Email" onChange={this.handleEmailChange} />
                <br />
                <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                <br />
                <button className="colour-pulse" onClick={() => this.signIn()}>Sign In</button>
            </div>
            : <Redirect to={"/activity-display"} />
        );
    }
    
};

export default LoginForm;
