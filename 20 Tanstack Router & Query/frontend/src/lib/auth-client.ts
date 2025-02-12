import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';

let _authClient: Auth0Client;

async function getAuthClient() {
  if (!_authClient) {
    _authClient = await createAuth0Client({
      // In production, you should load these properties from external configuration
      domain: 'bnhmn.eu.auth0.com',
      clientId: 'Pbw3Z7K1Z1sSbZixbcH6rvWqn79CBd1t',
      authorizationParams: {
        audience: 'https://event-management-api.local',
      },
    });
  }
  return _authClient;
}

/**
 * The global auth client that manages the user authentication state.
 * Can be used in places where hooks aren't supported (e.g. loaders).
 */
export const authClient = {
  isAuthenticated: async () => {
    const client = await getAuthClient();
    return await client.isAuthenticated();
  },

  getUser: async () => {
    const client = await getAuthClient();
    return await client.getUser();
  },

  getAccessToken: async (scope?: string) => {
    const client = await getAuthClient();
    return await client.getTokenSilently({
      authorizationParams: {
        scope,
      },
    });
  },

  startLogin: async (returnTo?: string) => {
    const client = await getAuthClient();
    const currentHost = window.location.origin;
    const returnToUri = returnTo ?? new URL(window.location.href).pathname;
    await client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${currentHost}/login/callback?returnTo=${encodeURIComponent(returnToUri)}`,
      },
    });
  },

  /**
   * Saves the authorization code after successful login
   */
  finishLogin: async () => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('code') && queryParams.has('state')) {
      const client = await getAuthClient();
      await client.handleRedirectCallback();
      const isAuthenticated = await client.isAuthenticated();
      return isAuthenticated;
    }
    return false;
  },

  startLogout: async () => {
    const client = await getAuthClient();
    await client.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  },
};
