/**
 * Contract for Auth0 configuration file
 * @export
 * @interface Auth0Config
 */
export interface Auth0Config {
    /**
     * @property
     * @type {string}
     * @memberof Auth0Config
     */
    domain: string | undefined;
    /**
     * @property
     * @type {string}
     * @memberof Auth0Config
     */
    clientId: string | undefined;
    /**
     * @property
     * @type {string}
     * @memberof Auth0Config
     */
    callbackUrl: string | undefined;
}