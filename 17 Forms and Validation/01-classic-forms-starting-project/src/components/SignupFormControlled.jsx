import { useState } from 'react';
import { Success } from './Success';

/**
 * A complex form example with two way binding, single state value, generic handler functions, and validation on submit.
 */
export function SignupFormControlled() {
  const initialForm = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'student',
    acquisition: [],
    tosConsent: false,
  };
  const [form, setForm] = useState(initialForm);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValid = {
    email: /\w{2,}@\w{2,}\.\w{2,}/.test(form.email),
    password: form.password.length >= 6,
    confirmPassword: form.password === form.confirmPassword,
    firstName: form.firstName.length >= 1,
    lastName: form.lastName.length >= 1,
    tosConsent: form.tosConsent === true,
  };

  /**
   * @param {keyof form} fieldName
   */
  function handleChange(fieldName) {
    return function (event) {
      setForm((prev) => ({
        ...prev,
        [fieldName]: getNewInputValue(event, prev[fieldName]),
      }));
    };
  }

  function handleSubmit() {
    setSubmitClicked(true);
    if (Object.values(isValid).every((valid) => valid)) {
      console.log({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.role,
        acquisition: form.acquisition,
        tosConsent: form.tosConsent,
      });
      setSubmitted(true);
    }
  }

  function handleReset() {
    setForm(initialForm);
    setSubmitClicked(false);
    setSubmitted(false);
  }

  return (
    <form action={handleSubmit} noValidate>
      <h2>Signup</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange('email')}
        />
        <div className="control-error">{submitClicked && !isValid.email && 'Please enter a valid email address.'}</div>
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange('password')}
          />
          <div className="control-error">{submitClicked && !isValid.password && 'Please enter a valid password.'}</div>
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
          <div className="control-error">{submitClicked && !isValid.confirmPassword && 'Passwords do not match.'}</div>
        </div>
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            autoComplete="given-name"
            value={form.firstName}
            onChange={handleChange('firstName')}
          />
          <div className="control-error">{submitClicked && !isValid.firstName && 'Please enter a first name.'}</div>
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            autoComplete="family-name"
            value={form.lastName}
            onChange={handleChange('lastName')}
          />
          <div className="control-error">{submitClicked && !isValid.lastName && 'Please enter a last name.'}</div>
        </div>
      </div>

      <div className="control">
        <label htmlFor="role">What best describes your role?</label>
        <select id="role" name="role" value={form.role} onChange={handleChange('role')}>
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
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            checked={form.acquisition.includes('google')}
            onChange={handleChange('acquisition')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            checked={form.acquisition.includes('friend')}
            onChange={handleChange('acquisition')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            checked={form.acquisition.includes('other')}
            onChange={handleChange('acquisition')}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control checkbox">
        <label htmlFor="terms-and-conditions">I agree to the terms and conditions</label>
        <input
          type="checkbox"
          id="terms-and-conditions"
          name="terms"
          checked={form.tosConsent}
          onChange={handleChange('tosConsent')}
        />
        <div className="control-error">
          {submitClicked && !isValid.tosConsent && 'Please agree to the terms of service.'}
        </div>
      </div>

      {submitted && <Success />}

      <p className="form-actions">
        <button type="reset" className="button button-flat" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}

function getNewInputValue(event, prevValue) {
  if (event.target.type !== 'checkbox') {
    return event.target.value;
  }
  if (event.target.type === 'checkbox') {
    const isChecked = event.target.checked;
    const value = event.target.value;
    return Array.isArray(prevValue)
      ? isChecked
        ? [...prevValue, value]
        : prevValue.filter((item) => item !== value)
      : isChecked;
  }
}
