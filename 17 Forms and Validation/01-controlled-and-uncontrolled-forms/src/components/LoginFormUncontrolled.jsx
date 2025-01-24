import { useRef, useState } from 'react';
import { Success } from './Success';

/**
 * A simple form example using refs and Browser provided validation.
 */
export function LoginFormUncontrolled() {
  const email = useRef();
  const password = useRef();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    console.log({
      email: email.current.value,
      password: password.current.value,
    });
    setSubmitted(true);
  }

  function handleReset() {
    setSubmitted(false);
  }

  return (
    <form action={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control big-margin">
          <label htmlFor="email">Email</label>
          <input ref={email} id="email" type="email" name="email" autoComplete="email" required />
        </div>

        <div className="control">
          <label htmlFor="password">Password</label>
          <input ref={password} id="password" type="password" name="password" minLength={6} required />
        </div>
      </div>

      {submitted && <Success />}

      <p className="form-actions">
        <button type="reset" className="button button-flat" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className="button">
          Login
        </button>
      </p>
    </form>
  );
}
