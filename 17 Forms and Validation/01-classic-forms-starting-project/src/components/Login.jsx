import { useState } from 'react';

export function Login() {
  const [submitClicked, setSubmitClicked] = useState(false);

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default browser submit behaviour (execute POST request).
    console.log('Submitted!');
    setSubmitClicked(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
