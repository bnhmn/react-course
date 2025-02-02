import { useForm } from 'react-hook-form';

import { Button, Heading, Stack } from '@chakra-ui/react';

import { FormInput } from './form/FormInput';
import { Success } from './Success';

/**
 * This form uses Chakra V2 UI components and the React Hook Form library.
 * See https://v2.chakra-ui.com/getting-started and https://react-hook-form.com/get-started.
 */
export function LoginForm() {
  const form = useForm();
  const isPending = form.formState.isSubmitting;
  const isSuccess = form.formState.isSubmitSuccessful;

  const handleSubmit = form.handleSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log({
      email: data.email,
      password: data.password,
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" align="start" spacing="1.3rem">
        <Heading size="lg" mb="1rem">
          Login
        </Heading>

        {!isSuccess && (
          <>
            <FormInput
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              validations={{ required: true, pattern: /\w{2,}@\w{2,}\.\w{2,}/ }}
              form={form}
            />
            <FormInput
              name="password"
              type="discoverable-password"
              label="Password"
              validations={{ required: true, minLength: 6 }}
              form={form}
            />
          </>
        )}
        {isSuccess && <Success />}

        <Stack direction="row" gap="0.2rem" mt="1rem">
          <Button type="submit" variant="solid" isDisabled={isPending}>
            {isPending ? 'Loading...' : 'Login'}
          </Button>
          <Button type="reset" variant="ghost" onClick={form.reset} isDisabled={isPending}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
