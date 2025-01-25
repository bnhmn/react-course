import { useActionState, useContext, useTransition } from 'react';
import { OpinionsContext } from '../store/opinions-context';

/**
 * This form uses the useActionState hook with Browser provided validation and the FormData object.
 */
export function NewOpinion() {
  // You can use the useActionState hook to update state based on the result of a form action.
  // https://react.dev/reference/react/useActionState
  const [formState, formAction] = useActionState(handleSubmit, { errors: null });

  // You can use the useTransition hook to display a pending message while loading.
  // https://react.dev/reference/react/useTransition
  const [isPending, startTransition] = useTransition();
  const { addOpinion } = useContext(OpinionsContext);

  function handleSubmit(prevState, formData) {
    startTransition(async () =>
      addOpinion({
        userName: formData.get('userName'),
        title: formData.get('title'),
        body: formData.get('body'),
      }),
    );

    return { data: {}, errors: null };
  }

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" autoComplete="name" minLength={5} required />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} required></textarea>
        </p>

        <p className="actions">
          <button type="submit" disabled={isPending}>
            {isPending ? 'Loading...' : 'Submit'}
          </button>
        </p>
      </form>
    </div>
  );
}
