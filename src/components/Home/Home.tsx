import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';

export interface HomeProps {
    auth: Auth0Authentication;
}
export default class Home extends Component<HomeProps, {}> {
    @autobind
    login() {
        this.props.auth.login();
    }

    @autobind
    logout() {
        this.props.auth.logout();
    }

    render() {
        const { authenticated } = this.props.auth;
        return (
            <div className="jumbotron">
                {authenticated && (
                    <div className="container">
                        <h1 className="display-3">You are logged in!</h1>
                        <p>
                            <button className="btn btn-primary btn-lg" onClick={this.logout}>
                                Log Out
              </button>
                        </p>
                    </div>
                )}
                {!authenticated && (
                    <div className="container">
                        <h1 className="display-3">You are not logged in!</h1>
                        <p>Please log in to continue.</p>
                        <p>
                            <button className="btn btn-primary btn-lg" onClick={this.login}>
                                Log In
              </button>
                        </p>
                    </div>
                )}
            </div>
        );
    }
}