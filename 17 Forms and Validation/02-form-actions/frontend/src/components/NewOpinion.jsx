import { useActionState, useContext } from 'react';
import { OpinionsContext } from '../store/opinions-context';

/**
 * This form uses the useActionState hook with the FormData object.
 * @see https://react.dev/reference/react/useActionState.
 */
export function NewOpinion() {
  const [formState, formAction, isPending] = useActionState(handleSubmit, { data: {}, errors: [] });
  const { data, errors } = formState;
  const { addOpinion } = useContext(OpinionsContext);

  // You can pass an async function to useActionState. It will return isPending=true until your function has completed.
  async function handleSubmit(prevState, formData) {
    // See https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const data = {
      userName: formData.get('userName').trim(),
      title: formData.get('title').trim(),
      body: formData.get('body').trim(),
    };
    const errors = [];

    if (data.userName.length == 0) {
      errors.push('Please provide your name.');
    }
    if (data.title.length < 5) {
      errors.push('The title must be at least five characters long.');
    }
    if (data.body.length < 10 || data.body.length > 300) {
      errors.push('Your opinion must be between 10 and 300 characters long.');
    }

    if (errors.length === 0) {
      await addOpinion(data);
      return { data: {}, errors };
    } else {
      return { data, errors };
    }
  }

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" autoComplete="name" defaultValue={data.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={data.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={data.body}></textarea>
        </p>

        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>

        <p className="actions">
          <button type="submit" disabled={isPending}>
            {isPending ? 'Loading...' : 'Submit'}
          </button>
        </p>
      </form>
    </div>
  );
}
