/*

Since TanStack Router decouples data loading from rendering, we unfortunately can't use React Hooks to access the
user authentication status. Instead, we need to store the user authentication information outside the React component
tree so that it can be used in route loaders and action functions.

- We store the authentication state in a global JavaScript object outside the React tree.
- We create a loader to restrict access to certain routes, allowing only authenticated users.
- If an unauthenticated user tries to access a protected route, they are redirected to the /login page.
  We also store the originally requested url to redirect them back after login.
- We use an action to handle the login callback and complete the authentication (see ./routes/login.callback.tsx).
*/

import { Auth0Client, createAuth0Client, User } from '@auth0/auth0-spa-js';
import { BeforeLoadContextOptions, redirect } from '@tanstack/react-router';

interface AuthProvider {
  isAuthenticated(): Promise<boolean>;
  getUser(): Promise<User | undefined>;
  getAccessToken(scope?: string): Promise<string>;
  startLogin(returnTo?: string): Promise<void>;
  startLogout(): Promise<void>;
  /**
   * Saves the authorization code after successful login
   */
  finishLogin(): Promise<boolean>;
}

let client: Auth0Client;

async function getAuthClient() {
  if (!client) {
    client = await createAuth0Client({
      // In production, you should load these properties from external configuration
      domain: 'bnhmn.eu.auth0.com',
      clientId: 'Pbw3Z7K1Z1sSbZixbcH6rvWqn79CBd1t',
      authorizationParams: {
        audience: 'https://event-management-api.local',
      },
    });
  }
  return client;
}

/**
 * The global context that manages our authentication state.
 */
export const authProvider: AuthProvider = {
  isAuthenticated: async () => {
    const authClient = await getAuthClient();
    return await authClient.isAuthenticated();
  },

  getUser: async () => {
    const authClient = await getAuthClient();
    return await authClient.getUser();
  },

  getAccessToken: async (scope) => {
    const authClient = await getAuthClient();
    return await authClient.getTokenSilently({
      authorizationParams: {
        scope,
      },
    });
  },

  startLogin: async (returnTo) => {
    const authClient = await getAuthClient();
    const currentHost = window.location.origin;
    const returnToUri = returnTo ?? new URL(window.location.href).pathname;
    await authClient.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${currentHost}/login/callback?returnTo=${encodeURIComponent(returnToUri)}`,
      },
    });
  },

  finishLogin: async () => {
    // Saves the authorization code after successful login
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('code') && queryParams.has('state')) {
      const authClient = await getAuthClient();
      await authClient.handleRedirectCallback();
      const isAuthenticated = await authClient.isAuthenticated();
      return isAuthenticated;
    }
    return false;
  },

  startLogout: async () => {
    const authClient = await getAuthClient();
    await authClient.logout();
  },
};

// https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes

/**
 * A loader that can be used to protect a route.
 * If the user is not logged in and tries to access the protected route, it redirects them to the /login page
 * with a query parameter that allows to redirect back to this page upon successful authentication.
 */
export async function loadAuthContext() {
  return {
    isAuthenticated: await authProvider.isAuthenticated(),
    user: await authProvider.getUser(),
  };
}

export function useAuthContext() {
  //return useRouteLoaderData('auth');
  return { isAuthenticated: true, user: {} };
}

/**
 * A loader that can be used to protect a route.
 * If the user is not logged in and tries to access the protected route, it redirects them to the /login page
 * with a query parameter that allows to redirect back to this page upon successful authentication.
 */
export async function ensureUserIsAuthenticated({ location }: BeforeLoadContextOptions<any, any, any, any, any>) {
  const isAuthenticated = await authProvider.isAuthenticated();
  if (!isAuthenticated) {
    throw redirect({ to: '/login', search: { returnTo: location.href } });
  }
}
