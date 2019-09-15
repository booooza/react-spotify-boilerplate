import React, { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { User as SpotifyUser, SpotifyApiContext } from 'react-spotify-api'

export interface UserProps {
    auth: Auth0Authentication;
}

/**
 * @public
 * @export
 * @class User
 * @extends {Component<UserProps, UserState>}
 */
class User extends Component<UserProps> {

    render() {
        const { authenticated } = this.props.auth;
        return (
            authenticated && this.props.auth.accessToken && (
                <SpotifyApiContext.Provider value={this.props.auth.accessToken}>
                    <SpotifyUser>
                        {(user, loading, error) =>
                            user ? user.display_name : null
                        }
                    </SpotifyUser>
                </SpotifyApiContext.Provider>

            )
        );
    }
}

export default User;
