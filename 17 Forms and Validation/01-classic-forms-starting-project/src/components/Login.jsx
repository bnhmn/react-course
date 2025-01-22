import { useState } from 'react';

/**
 * A simple form example with separate state values.
 */
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  function handleSubmit(event) {
    console.log('Submitted!');
  }

  function handleReset() {
    setEmail('');
    setPassword('');
  }

  return (
    <form action={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" autoComplete="email" value={email} onChange={handleChangeEmail} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={password} onChange={handleChangePassword} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat" onClick={handleReset}>
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
