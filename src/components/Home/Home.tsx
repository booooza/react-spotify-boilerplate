import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { Nav } from '../';
import { ReactComponent as LoginButton } from './login.svg';

export interface HomeProps {
    auth: Auth0Authentication;
}

const loginButtonStyle = {
    width: '200px'
};

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
            <div>
                <Nav auth={this.props.auth}></Nav>
                {authenticated && (
                    <div>
                        {this.props.auth.accessToken && (
                            <div className="m-4">

                            </div>
                        )}
                        <p>
                        </p>
                    </div>
                )}
                {!authenticated && (
                    <div className="m-4 container text-center">
                        <h4>Welcome</h4>
                        <p>Please log in to continue.</p>

                        <LoginButton fill="#1DB954" style={loginButtonStyle} onClick={this.login} />
                    </div>
                )}
            </div>
        );
    }
}