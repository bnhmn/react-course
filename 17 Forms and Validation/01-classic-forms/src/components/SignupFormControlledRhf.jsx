import { useForm } from 'react-hook-form';
import { Success } from './Success';

/**
 * A complex form example that uses the React Hook Form library.
 * It greatly simplifies the creation of forms because it hides the state and validation logic from you.
 * @see https://react-hook-form.com/get-started.
 */
export function SignupFormControlledRhf() {
  const form = useForm();
  const { formState, getValues } = form;

  const handleSubmit = form.handleSubmit((data) => {
    console.log({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      acquisition: data.acquisition || [],
      tosConsent: data.tosConsent,
    });
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Signup</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <Input
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        defaultValue=""
        validations={{ required: true, pattern: /\w{2,}@\w{2,}\.\w{2,}/ }}
        form={form}
      />

      <InputRow>
        <Input
          name="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          defaultValue=""
          validations={{ required: true, minLength: 6 }}
          form={form}
        />
        <Input
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          autoComplete="new-password"
          defaultValue=""
          validations={{ validate: () => getValues('password') === getValues('confirmPassword') }}
          errorMessage="Passwords do not match."
          form={form}
        />
      </InputRow>

      <InputRow>
        <Input
          name="firstName"
          type="text"
          label="First Name"
          autoComplete="given-name"
          defaultValue=""
          validations={{ required: true }}
          form={form}
        />
        <Input
          name="lastName"
          type="text"
          label="Last Name"
          autoComplete="family-name"
          defaultValue=""
          validations={{ required: true }}
          form={form}
        />
      </InputRow>

      <Select name="role" label="What best describes your role?" form={form}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="employee">Employee</option>
        <option value="founder">Founder</option>
        <option value="other">Other</option>
      </Select>

      <MultiCheckBox
        name="acquisition"
        label="How did you find us?"
        options={{ google: 'Google', friend: 'Referred by friend', other: 'Other' }}
        form={form}
      />

      <Input
        name="tosConsent"
        type="checkbox"
        label="I agree to the terms and conditions"
        validations={{ required: true }}
        errorMessage="Please agree to the terms of service."
        form={form}
      />

      {formState.isSubmitSuccessful && <Success />}

      <p className="form-actions">
        <button type="reset" className="button button-flat" onClick={form.reset}>
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}

function InputRow({ children }) {
  return <div className="control-row">{children}</div>;
}

function Input({ name, type, label, autoComplete, defaultValue, form, validations = {}, errorMessage }) {
  const isInvalid = form.formState.errors[name] !== undefined;
  errorMessage = errorMessage ?? `Please enter a valid ${label.toLowerCase()}.`;
  return (
    <div className={`control ${type}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={isInvalid ? 'true' : 'false'}
        {...form.register(name, validations)}
      />
      <div className="control-error">{isInvalid && errorMessage}</div>
    </div>
  );
}

function Select({ name, label, children, form }) {
  return (
    <div className="control">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} {...form.register(name)}>
        {children}
      </select>
    </div>
  );
}

function MultiCheckBox({ name, label, options, form }) {
  return (
    <fieldset>
      <legend>{label}</legend>
      {Object.entries(options).map(([id, label]) => (
        <div key={id} className="control checkbox">
          <label htmlFor={id}>{label}</label>
          <input type="checkbox" id={id} name={name} value={id} {...form.register(name)} />
        </div>
      ))}
    </fieldset>
  );
}
