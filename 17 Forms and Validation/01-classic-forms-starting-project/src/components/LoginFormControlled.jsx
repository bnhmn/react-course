import { useState } from 'react';
import { Success } from './Success';

/**
 * A simple form example with two way binding (state <-> DOM) and validation on submit.
 */
export function LoginFormControlled() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailIsValid = /\w{2,}@\w{2,}\.\w{2,}/.test(email);
  const passwordIsValid = password.length >= 6;

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  function handleSubmit() {
    setSubmitClicked(true);
    if (emailIsValid && passwordIsValid) {
      console.log({
        email,
        password,
      });
      setSubmitted(true);
    }
  }

  function handleReset() {
    setEmail('');
    setPassword('');
    setSubmitClicked(false);
    setSubmitted(false);
  }

  return (
    <form action={handleSubmit} noValidate>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" autoComplete="email" value={email} onChange={handleChangeEmail} />
          <div className="control-error">{submitClicked && !emailIsValid && 'Please enter a valid email address.'}</div>
        </div>

        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={password} onChange={handleChangePassword} />
          <div className="control-error">{submitClicked && !passwordIsValid && 'Please enter a valid password.'}</div>
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
