import history from './history';
import React, { SFC } from 'react';
import { Callback, Home, User } from '../components';
import { Route, RouteComponentProps } from 'react-router';
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

                <Route path="/" render={props => <Home auth={auth} {...props} />} />
                <Route
                    path="/callback"
                    render={props => {
                        handleAuthentication(props);
                        return <Callback {...props} />;
                    }}
                />
                <Route
                    path="/user"
                    render={props => <User auth={auth} {...props} />}
                />
            </div>
        </Router>
    );
};
export default Routes;