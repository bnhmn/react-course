import { useForm } from 'react-hook-form';

import { Button, Heading, Stack, Text } from '@chakra-ui/react';

import { FormCheckbox } from './form/FormCheckbox';
import { FormInput } from './form/FormInput';
import { FormRow } from './form/FormInputRow';
import { FormSelect } from './form/FormSelect';
import { Success } from './Success';

/**
 * This form uses Chakra V2 UI components and the React Hook Form library.
 * See https://v2.chakra-ui.com/getting-started and https://react-hook-form.com/get-started.
 */
export function SignupForm() {
  const form = useForm();
  const { getValues } = form;
  const isPending = form.formState.isSubmitting;
  const isSuccess = form.formState.isSubmitSuccessful;

  const handleSubmit = form.handleSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
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
      <Stack direction="column" align="start" spacing="1.3rem">
        <Heading size="lg" mb="1rem">
          Signup
        </Heading>

        {!isSuccess && (
          <>
            <Text fontSize="lg">We just need a little bit of data from you to get you started 🚀</Text>

            <FormInput
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              validations={{ required: true, pattern: /\w{2,}@\w{2,}\.\w{2,}/ }}
              form={form}
            />

            <FormRow>
              <FormInput
                name="password"
                type="discoverable-password"
                label="Password"
                autoComplete="new-password"
                validations={{ required: true, minLength: 6 }}
                form={form}
              />
              <FormInput
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                autoComplete="new-password"
                placeholder="Confirm your password"
                validations={{ validate: () => getValues('password') === getValues('confirmPassword') }}
                errorMessage="Passwords do not match."
                form={form}
              />
            </FormRow>

            <FormRow>
              <FormInput
                name="firstName"
                type="text"
                label="First Name"
                autoComplete="given-name"
                validations={{ required: true }}
                form={form}
              />
              <FormInput
                name="lastName"
                type="text"
                label="Last Name"
                autoComplete="family-name"
                validations={{ required: true }}
                form={form}
              />
            </FormRow>

            <FormSelect
              name="role"
              label="Role"
              placeholder="What best describes your role?"
              options={{
                student: 'Student',
                teacher: 'Teacher',
                employee: 'Employee',
                founder: 'Founder',
                other: 'Other',
              }}
              required
              form={form}
            />

            <FormCheckbox
              name="acquisition"
              type="multi"
              label="How did you find us?"
              options={{ google: 'Google', friend: 'Referred by friend', other: 'Other' }}
              required
              form={form}
            />

            <FormCheckbox
              name="tosConsent"
              label="Terms and Conditions"
              description="I agree to the terms and conditions"
              errorMessage="Please agree to the terms of service."
              required
              form={form}
            />
          </>
        )}

        {isSuccess && <Success />}

        <Stack direction="row" gap="0.2rem" mt="1rem">
          <Button type="submit" variant="solid" isDisabled={isPending}>
            {isPending ? 'Loading...' : 'Sign Up'}
          </Button>
          <Button type="reset" variant="ghost" onClick={form.reset} isDisabled={isPending}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
