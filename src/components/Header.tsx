import React from "react";
import {Link} from "react-router-dom";
import firebase from "firebase";

import "../css/common.css";
import "../css/Header.css";


interface IHeaderProps {
    user: firebase.User | null | undefined;
}

interface IHeaderState {
    isLoading: boolean
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {
        super(props);
        this.state = {
            isLoading: true
        }
    };

    componentDidMount() {
        setTimeout(
            () => {
                this.setState({isLoading: false});
            },
            1000
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <header>
                    <h1>React Activity Display</h1>
                    <nav className="nav-bar">
                        <span className="nav-link">Loading...</span>
                    </nav>
                </header>
            );
        } 
        else {
            return (
                <header>
                    <h1>React Activity Display</h1>
                    <nav className="nav-bar">
                        {
                            !this.props.user && 
                            <div>
                                <Link className="nav-link fade-in colour-pulse" to={"/register"}>Register</Link>
                                <Link className="nav-link fade-in colour-pulse" to={"/sign-in"}>Sign In</Link>
                            </div>
                        }
                        {
                            this.props.user && 
                            <Link className="nav-link fade-in colour-pulse" onClick={() => firebase.auth().signOut()} to={"/sign-in"}>Sign Out of {this.props.user.email}</Link>
                        }
                    </nav>
                </header>
            );
        }
    };
}

export default Header;