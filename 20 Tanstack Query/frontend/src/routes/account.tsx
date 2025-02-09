import { createFileRoute } from '@tanstack/react-router';

import { ensureUserIsAuthenticated } from '../lib/auth';

// This is a layout route. It will be applied for all child routes of /account.
// https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing#flat-routes

export const Route = createFileRoute('/account')({
  beforeLoad: ensureUserIsAuthenticated,
});
