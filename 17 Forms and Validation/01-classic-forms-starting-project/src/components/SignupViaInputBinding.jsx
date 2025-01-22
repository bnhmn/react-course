import { useState } from 'react';

/**
 * A two way binding example with a single state value and generic handler functions.
 */
export function Signup() {
  const initialForm = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: '',
    acquisition: [],
    termsAndConditionsConsent: false,
  };
  const [form, setForm] = useState(initialForm);

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
    console.log(JSON.stringify(form, null, 2));
    /*
    {
        "email": "",
        "password": "",
        "confirmPassword": "",
        "firstName": "",
        "lastName": "",
        "role": "",
        "acquisition": ["google", "friend"],
        "termsAndConditionsConsent": true
    }
    */
  }

  function handleReset() {
    setForm(initialForm);
  }

  return (
    <form action={handleSubmit}>
      <h2>Welcome on board!</h2>
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
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange('password')}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
        </div>
      </div>

      <hr />

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

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            checked={form.termsAndConditionsConsent}
            onChange={handleChange('termsAndConditionsConsent')}
          />
          I agree to the terms and conditions
        </label>
      </div>

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
