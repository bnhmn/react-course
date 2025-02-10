import { createContext, useCallback, useContext, useState } from 'react';

import { User } from '@auth0/auth0-react';
import { RouterProps, RouterProvider } from '@tanstack/react-router';

import { authClient } from './auth-client';

/*
- We store the authentication state in the auth context.
- We create a loader to restrict access to certain routes, allowing only authenticated users (see /routes/account.tsx).
  If an unauthenticated user tries to access a protected route, they are redirected to the /login page.
  We also store the originally requested url to redirect them back after login.
- We use a loader to handle the login callback and complete the authentication (see /routes/login.callback.tsx).
- See https://github.com/TanStack/router/blob/main/examples/react/authenticated-routes for the original auth example.
*/
//

/**
 * Provides the global user authentication context.
 */
export interface AuthContext {
  isAuthenticated: boolean;
  user?: User;
  refreshAuthContext(): Promise<void>;
  getAccessToken(scope?: string): Promise<string>;
  startLogin(returnTo?: string): Promise<void>;
  startLogout(): Promise<void>;
  finishLogin(): Promise<boolean>;
}

const AuthContext = createContext<AuthContext>(undefined!);

/**
 * Provides the global user authentication context.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshAuthContext = useCallback(async () => {
    await authClient.isAuthenticated().then(setIsAuthenticated);
    await authClient.getUser().then(setUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        refreshAuthContext,
        getAccessToken: authClient.getAccessToken,
        startLogin: authClient.startLogin,
        startLogout: authClient.startLogout,
        finishLogin: authClient.finishLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * The useAuth hook can be used to access the auth context inside components.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * This wrapper is necessary for providing the auth context to TanStack Router.
 */
export function RouterProviderWithAuthContext(props: RouterProps) {
  const auth = useAuth();
  return <RouterProvider context={auth} {...props} />;
}
