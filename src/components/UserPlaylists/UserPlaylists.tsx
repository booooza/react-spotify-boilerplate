import React, { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { UserPlaylists as SpotifyUserPlaylists, SpotifyApiContext } from 'react-spotify-api'
import autobind from 'autobind-decorator';
import { User } from '../';

export interface UserPlaylistsProps {
    auth: Auth0Authentication;
}

/**
 * @public
 * @export
 * @class User
 * @extends {Component<UserPlaylistsProps>}
 */
class UserPlaylists extends Component<any> {

    @autobind
    onClick(e, id) {
        e.preventDefault();
        this.props.history.push(`/playlists/${id}`);
    }

    render() {
        const { authenticated } = this.props.auth;
        return (
            <div className="container">
                {authenticated && this.props.auth.accessToken && (
                    <SpotifyApiContext.Provider value={this.props.auth.accessToken}>
                        <h4><User auth={this.props.auth} {...this.props} />s Playlists</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Tracks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <SpotifyUserPlaylists options={{ limit: 50 }}>
                                    {(playlists, loading, error) =>
                                        playlists ? (
                                            playlists.items.map(playlist => (
                                                <tr key={playlist.id} onClick={(e) => this.onClick(e, playlist.id)}>
                                                    <td>{playlist.name}</td>
                                                    <td>{playlist.tracks.total}</td>
                                                </tr>

                                            ))
                                        ) : null
                                    }
                                </SpotifyUserPlaylists>
                            </tbody>
                        </table>
                    </SpotifyApiContext.Provider>

                )}
            </div>
        );
    }
}

export default UserPlaylists;
