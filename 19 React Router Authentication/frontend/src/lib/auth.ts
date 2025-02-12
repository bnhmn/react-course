/*
# Auth Example (using RouterProvider)
https://github.com/remix-run/react-router/tree/main/examples/auth-router-provider

This example demonstrates how to restrict access to routes to authenticated users when using `<RouterProvider>`.

The primary difference compared to how authentication was handled in `BrowserRouter` is that since `RouterProvider`
decouples fetching from rendering, we can no longer rely on React context and/or hooks to get our user authentication
status. We need access to this information outside of the React tree so we can use it in our route `loader` and `action`
functions.

Be sure to pay attention to the following features in this example:

- The use of a standalone object *outside of the React tree* that manages our authentication state
- The use of `loader` functions to check for user authentication
- The use of `redirect` from the `/protected` `loader` when the user is not logged in
- The use of a `<Form>` and an `action` to perform the login
- The use of a `from` search param and a `redirectTo` hidden input to preserve the previous location so you can send the
  user there after they authenticate
- The use of `<Form replace>` to replace the `/login` route in the history stack so the user doesn't return to the login
  page when clicking the back button after logging in
- The use of a `<fetcher.Form>` and an `action` to perform the logout
*/

import { LoaderFunctionArgs, redirect, useRouteLoaderData } from 'react-router';

import { Auth0Client, createAuth0Client, User } from '@auth0/auth0-spa-js';

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

export function extractReturnToUrl(input: Request | Pick<Location, 'search'>) {
  const searchParams = 'search' in input ? new URLSearchParams(input.search) : new URL(input.url).searchParams;
  return searchParams.get('returnTo') || '/';
}

// https://reactrouter.com/6.29.0/route/action
// https://reactrouter.com/6.29.0/route/loader#returning-responses

/**
 * A loader that can be used to protect a route.
 * If the user is not logged in and tries to access the protected route, it redirects them to the /login page
 * with a query parameter that allows login to redirect back to this page upon successful authentication.
 */
export async function requireUserLogin({ request }: LoaderFunctionArgs) {
  const isAuthenticated = await authProvider.isAuthenticated();
  if (!isAuthenticated) {
    const returnToUri = new URL(request.url).pathname;
    return redirect(`/login?returnTo=${encodeURIComponent(returnToUri)}`);
  }
  return null;
}

/**
 * An action that handles the login callback and redirects to the initial page if the login is successful.
 */
export async function loginCallbackAction({ request }: LoaderFunctionArgs) {
  // Exit early if already authenticated
  const isAuthenticated = await authProvider.isAuthenticated();
  if (isAuthenticated) {
    return redirect(extractReturnToUrl(request));
  }
  // Finish the login
  const success = await authProvider.finishLogin();
  if (success) {
    return redirect(extractReturnToUrl(request));
  }
  // Return error response
  return null;
}

export async function authContextLoader() {
  return {
    isAuthenticated: await authProvider.isAuthenticated(),
    user: await authProvider.getUser(),
  };
}

export function useAuthContext() {
  return useRouteLoaderData('auth');
}
