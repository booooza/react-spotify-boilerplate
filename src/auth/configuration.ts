import { Auth0Config } from './Auth0Config';
export const AUTH_CONFIG: Auth0Config = {
    domain: process.env.REACT_APP_SPOTIFY_DOMAIN,
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    callbackUrl: process.env.REACT_APP_SPOTIFY_CALLBACK_URL,
};