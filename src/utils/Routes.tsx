import history from './history';
import React, { SFC } from 'react';
import { Callback, Home, UserPlaylists, Playlist } from '../components';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Router } from 'react-router-dom';
import { WebAuthentication } from '../auth/WebAuthentication';

const auth = new WebAuthentication();

const handleAuthentication = (props: RouteComponentProps<{}>) => {
    if (/access_token|id_token|error/.test(window.location.hash)) {
        auth.handleAuthentication();
    }
};

const Routes: SFC<{}> = () => {
    return (
        <Router history={history}>
            <div>
                <Route path="/" render={props => <Home auth={auth} {...props} />}>
                </Route>
                <Route
                    path="/callback"
                    render={props => {
                        handleAuthentication(props);
                        return <Callback {...props} />;
                    }}
                />
                <Switch>
                    <Route
                        exact path="/playlists"
                        render={props => <UserPlaylists auth={auth} {...props} />}
                    >
                    </Route>

                    <Route exact path="/playlists/:id" render={({ match }: any) => {
                        return <Playlist id={match.params.id} auth={auth} />
                    }}
                    />
                </Switch>
            </div>
        </Router >
    );
};
export default Routes;