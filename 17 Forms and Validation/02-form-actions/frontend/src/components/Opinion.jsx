import { useActionState, useContext } from 'react';
import { OpinionsContext } from '../store/opinions-context';

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = useContext(OpinionsContext);

  // Note: You can assign different form actions to the buttons inside your form.
  // In this component, this helps us with displaying the pending state to the user.
  // Alternatively to the approach below, you could also use one of these hooks:
  // https://react.dev/reference/react-dom/hooks/useFormStatus#display-a-pending-state-during-form-submission
  // https://react.dev/reference/react/useTransition#displaying-a-pending-visual-state
  const [, handleUpvote, upvotePending] = useActionState(() => upvoteOpinion(id));
  const [, handleDownvote, downvotePending] = useActionState(() => downvoteOpinion(id));

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={handleUpvote} disabled={upvotePending || downvotePending}>
          <UpvoteIcon />
        </button>
        <span>{votes}</span>
        <button formAction={handleDownvote} disabled={upvotePending || downvotePending}>
          <DownvoteIcon />
        </button>
      </form>
    </article>
  );
}

// We need to inline this SVG code here to be able to style the icons via CSS.
// You can't style SVG images included via <img src="..." />.
function UpvoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
    </svg>
  );
}

function DownvoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M12 8v8" />
      <path d="m8 12 4 4 4-4" />
    </svg>
  );
}
