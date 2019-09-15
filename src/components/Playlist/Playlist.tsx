import React, { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { Playlist as SpotifyPlaylist, SpotifyApiContext } from 'react-spotify-api'

export interface PlaylistProps {
    auth: Auth0Authentication,
    id: string | undefined
}

/**
 * @public
 * @export
 * @class User
 * @extends {Component<PlaylistProps>}
 */
class User extends Component<PlaylistProps> {

    render() {
        const { authenticated } = this.props.auth;
        return (
            <div className="container">

                {authenticated && this.props.auth.accessToken && (
                    <SpotifyApiContext.Provider value={this.props.auth.accessToken}>
                        <SpotifyPlaylist id={this.props.id} options={{ limit: 10 }}>
                            {(playlist, loading, error) =>
                                playlist ? (
                                    <div>
                                        <h4>{playlist.name} ({playlist.owner.display_name})</h4>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Artists</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Album</th>
                                                    <th scope="col">Popularity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {playlist.tracks.items.map(track => (
                                                    <tr key={track.track.id}>
                                                        <td>{
                                                            track.track.artists.map((artist, index) => (
                                                                (index ? ', ' : '') + artist.name
                                                            ))
                                                        }</td>
                                                        <td>{track.track.name}</td>
                                                        <td>{track.track.album.name}</td>
                                                        <td>{track.track.popularity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : null
                            }
                        </SpotifyPlaylist>
                    </SpotifyApiContext.Provider>

                )}
            </div>
        );
    }
}

export default User;
