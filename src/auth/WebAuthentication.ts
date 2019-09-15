import autobind from 'autobind-decorator';
import history from '../utils/history';
import { AUTH_CONFIG } from './configuration';
import { Auth0Authentication } from './Auth0Authentication';
import { Auth0DecodedHash, WebAuth } from 'auth0-js';
/**
 * Web based Auth0 authentication
 *
 * @export
 * @class WebAuthentication
 * @implements {Auth0Authentication}
 */
export class WebAuthentication implements Auth0Authentication {
    /**
     * @property
     * @readonly
     * @memberof WebAuthentication
     */
    get accessToken() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('No access token found');
        }
        return accessToken;
    }

    /**
     * @private
     * @memberof WebAuthentication
     */
    requestedScopes = 'user-read-private user-read-email';

    /**
     * @property
     * @private
     * @type {WebAuth}
     * @memberof WebAuthenticationManager
     */
    auth0: WebAuth = new WebAuth({
        domain: AUTH_CONFIG.domain ? AUTH_CONFIG.domain : '',
        clientID: AUTH_CONFIG.clientId ? AUTH_CONFIG.clientId : '',
        redirectUri: AUTH_CONFIG.callbackUrl ? AUTH_CONFIG.callbackUrl : '',
        responseType: 'token',
        scope: this.requestedScopes,
    });

    get authenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
        return new Date().getTime() < expiresAt;
    }

    @autobind
    login(): void {
        this.auth0.authorize();
    }

    @autobind
    handleAuthentication(): void {
        this.auth0.parseHash((error: any, result: any) => {
            if (result && result.accessToken) {
                this.setSession(result);
                history.replace('/playlists');
            } else if (error) {
                history.replace('/');
                // tslint:disable-next-line:no-console
                console.error(error);
                alert(`Error: ${error}. Check the console for further details.`);
            }
        });
    }

    @autobind
    setSession(authResult: Auth0DecodedHash): void {
        const { accessToken, expiresIn, scope } = authResult;
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify(expiresIn! * 1000 + new Date().getTime());
        // If there is a value on the `scope` param from the authResult,
        // use it to set scopes in the session for the user. Otherwise
        // use the scopes as requested. If no scopes were requested,
        // set it to nothing
        // tslint:disable-next-line:no-string-literal
        const scopes = scope || this.requestedScopes || '';
        localStorage.setItem('access_token', accessToken!);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('scopes', JSON.stringify(scopes));
        // navigate to the home route
        history.replace('/');
    }

    @autobind
    logout(): void {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        // navigate to the home route
        history.replace('/');
    }

    @autobind
    userHasScopes(scopes: string[]): boolean {
        const grantedScopes = JSON.parse(localStorage.getItem('scopes')!).split(
            ' ',
        );
        return scopes.every(scope => grantedScopes.includes(scope));
    }
}