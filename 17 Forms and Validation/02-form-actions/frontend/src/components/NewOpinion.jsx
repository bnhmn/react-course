import { useActionState, useContext } from 'react';
import { OpinionsContext } from '../store/opinions-context';

/**
 * The useActionState is a Hook that allows you to update state based on the result of a form action.
 * @see https://react.dev/reference/react/useActionState#using-information-returned-by-a-form-action
 */
export function NewOpinion() {
  const [formState, formAction] = useActionState(handleSubmit, { errors: null });
  const { addOpinion } = useContext(OpinionsContext);

  function handleSubmit(prevState, formData) {
    addOpinion({
      userName: formData.get('userName'),
      title: formData.get('title'),
      body: formData.get('body'),
    });

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
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
