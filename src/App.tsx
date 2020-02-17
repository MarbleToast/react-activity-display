import React, {useContext} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import './css/App.css';

import {AuthContext} from "./firebaseContext";
import RegisterForm from "./components/RegisterForm";
import LoginForm from './components/LoginForm';
import Header from "./components/Header";
import ActivityDisplay from './components/ActivityPanel';

const App: React.FC = () => {
    const {authUser, firebase} = useContext(AuthContext);
    return (
        <BrowserRouter>
            <div className="App">
                <Header user={authUser} />
                <Switch>
                    {
                        !authUser &&
                        <>
                            <Redirect exact from="/" to="/sign-in" />
                            <Route path="/sign-in" render={() => <LoginForm firebase={firebase} /> }/>
                            <Route path="/register" render={() => <RegisterForm firebase={firebase} />} />
                        </>
                    }
                    {
                        authUser && 
                        <>
                            <Redirect exact from="/sign-in" to="/activity-display" />
                            <Redirect exact from="/register" to="/activity-display" />
                            <Route path="/activity-display" render={() => <ActivityDisplay user={authUser} />} />
                        </>
                    }
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;