import { useState } from 'react';
import { Success } from './Success';

/**
 * A complex form example using the native FormData object and Browser provided validation.
 * @see https://react.dev/reference/react-dom/components/form#handle-form-submission-on-the-client
 */
export function SignupFormUncontrolled() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(formData) {
    // This is a good approach for simple forms but it is hard to customize. If we want to validate
    // that the password matches the confirmPassword, we need to write lots of imperative DOM code (omitted here).
    console.log({
      email: formData.get('email'),
      password: formData.get('password'),
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      role: formData.get('role'),
      acquisition: formData.getAll('acquisition'),
      tosConsent: formData.get('terms') === 'on',
    });
    setSubmitted(true);
  }

  function handleReset() {
    setSubmitted(false);
  }

  return (
    <form action={handleSubmit}>
      <h2>Signup</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control big-margin">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" autoComplete="email" required />
      </div>

      <div className="control-row">
        <div className="control big-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" minLength={6} required />
        </div>

        <div className="control big-margin">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input id="confirm-password" type="password" name="confirm-password" required />
        </div>
      </div>

      <div className="control-row">
        <div className="control big-margin">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" autoComplete="given-name" required />
        </div>

        <div className="control big-margin">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" autoComplete="family-name" required />
        </div>
      </div>

      <div className="control big-margin">
        <label htmlFor="role">What best describes your role?</label>
        <select id="role" name="role" required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input type="checkbox" id="google" name="acquisition" value="google" />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input type="checkbox" id="friend" name="acquisition" value="friend" />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" required />I agree to the terms and conditions
        </label>
      </div>

      {submitted && <Success />}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button" onClick={handleReset}>
          Sign up
        </button>
      </p>
    </form>
  );
}
