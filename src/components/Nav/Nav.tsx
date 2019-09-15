import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export interface NavProps {
    auth: Auth0Authentication;
}

class Nav extends Component<NavProps, {}> {
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
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">
                    Spotify Web API React Boilerplate
                </NavLink>
                <ul className="navbar-nav mr-auto">
                    {authenticated && (
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/playlists">
                                Playlists
                            </NavLink>
                        </li>
                    )}
                </ul>
                <ul className="navbar-nav ml-auto">
                    {authenticated && (
                        <li className="nav-item">
                            <button
                                className="btn btn-outline-primary my-2 my-sm-0"
                                type="submit"
                                onClick={this.logout}
                            >
                                Log Out
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        );
    }
}

export default Nav;