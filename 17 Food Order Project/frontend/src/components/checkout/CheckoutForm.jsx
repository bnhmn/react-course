import { useForm } from 'react-hook-form';
import { useOrderBackend } from '../../hooks/backend';
import { Success } from './Success';

export function CheckoutForm({ cart, onClose }) {
  const form = useForm();
  const [placeOrder, isLoading, isSuccess] = useOrderBackend();

  const handleSubmit = form.handleSubmit(async (data) => {
    await placeOrder({
      customer: data,
      items: cart.items.map((item) => ({
        id: item.id,
        amount: item.amount,
      })),
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>

      <p>Total Price: ${cart.totalPrice}</p>

      {!isSuccess && (
        <>
          <Input
            name="name"
            type="text"
            label="Full Name"
            autoComplete="name"
            validations={{ required: true }}
            form={form}
          />
          <Input
            name="email"
            type="email"
            label="Email Address"
            autoComplete="email"
            defaultValue=""
            validations={{ required: true, pattern: /\w{2,}@\w{2,}\.\w{2,}/ }}
            form={form}
          />
          <Input
            name="street"
            type="text"
            label="Street"
            autoComplete="street-address"
            validations={{ required: true }}
            form={form}
          />
          <InputRow>
            <Input
              name="postalCode"
              type="text"
              label="Postal Code"
              autoComplete="postal-code"
              validations={{ required: true }}
              form={form}
            />
            <Input
              name="city"
              type="text"
              label="City"
              autoComplete="home city"
              validations={{ required: true }}
              form={form}
            />
          </InputRow>
          <div className="modal-actions">
            <button type="button" className="text-button" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Order'}
            </button>
          </div>
        </>
      )}

      {isSuccess && (
        <>
          <Success />
          <div className="modal-actions">
            <button type="button" className="button" onClick={onClose}>
              Close
            </button>
          </div>
        </>
      )}
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
      {isInvalid && <div className="control-error">{errorMessage}</div>}
    </div>
  );
}
