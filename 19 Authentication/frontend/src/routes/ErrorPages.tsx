import { ErrorPage } from '../components/ErrorPage';

export function GenericErrorPage() {
  return (
    <ErrorPage
      title="Something went wrong."
      description={`
        Sorry, we couldn't load the page you asked for 😕
        But you can click the button below to go back to the homepage.`}
    />
  );
}

export function NotFoundPage() {
  return (
    <ErrorPage
      title="UH OH! You're lost."
      description={`
        The page you are looking for does not exist. How you got here is a mystery.
        But you can click the button below to go back to the homepage.`}
    />
  );
}

export function LoginErrorPage() {
  return (
    <ErrorPage
      title="Login failed"
      description={`
        Sorry, we couldn't log you in 😕
        Please try again later.`}
    />
  );
}
