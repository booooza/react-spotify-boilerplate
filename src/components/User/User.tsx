import React, { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { User as SpotifyUser, SpotifyApiContext } from 'react-spotify-api'

export interface UserProps {
    auth: Auth0Authentication;
}

/**
 * Contrat for state
 * @export
 * @interface UserState
 */
export interface UserState {
    id: string,
    displayName: string;
}

/**
 * @public
 * @export
 * @class User
 * @extends {Component<UserProps, UserState>}
 */
class User extends Component<any, UserState> {
    state: UserState = {
        id: '',
        displayName: '',
    };

    render() {
        const { authenticated } = this.props.auth;
        return (
            <div className="container">
                {authenticated && this.props.auth.accessToken && (
                    <SpotifyApiContext.Provider value={this.props.auth.accessToken}>
                        <SpotifyUser>
                            {(user, loading, error) =>
                                user ? (
                                    <ul>
                                        <li>Name: {user.display_name}</li>
                                        <li>ID: {user.id}</li>
                                    </ul>
                                ) : null
                            }
                        </SpotifyUser>
                    </SpotifyApiContext.Provider>

                )}
            </div>
        );
    }
}

export default User;
