import { createFileRoute, redirect } from '@tanstack/react-router';

import { authClient } from '../lib/auth-client';

// This is a layout route. It will be applied for all child routes of /account.
// https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing#flat-routes

export const Route = createFileRoute('/account')({
  /**
   * A loader that protects this route and its child routes.
   * If the user is not logged in and tries to access the /account route, it redirects them to the /login page
   * with a query parameter that allows to redirect back to this page upon successful authentication.
   * @see https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes.
   */
  beforeLoad: async ({ location }) => {
    const isAuthenticated = await authClient.isAuthenticated();
    if (!isAuthenticated) {
      throw redirect({ to: '/login', search: { returnTo: location.href } });
    }
  },
});
