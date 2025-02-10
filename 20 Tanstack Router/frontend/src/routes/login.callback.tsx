import { z } from 'zod';

import { createFileRoute, redirect } from '@tanstack/react-router';

import { LoginErrorPage } from '../components/ErrorPages';

export const Route = createFileRoute('/login/callback')({
  // https://tanstack.com/router/latest/docs/framework/react/guide/search-params#validating-search-params
  validateSearch: z.object({
    returnTo: z.string().default('/'),
  }),

  beforeLoad: async ({ context, search }) => {
    // Exit early if already authenticated
    if (context.isAuthenticated) {
      throw redirect({ to: search.returnTo });
    }
    // Finish the login
    const success = await context.finishLogin();
    if (success) {
      throw redirect({ to: search.returnTo });
    }
    // If login was not successful, show the error page
  },

  component: LoginErrorPage,
});
