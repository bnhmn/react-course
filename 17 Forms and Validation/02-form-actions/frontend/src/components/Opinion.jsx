import { useContext } from 'react';
import { useFormStatus } from 'react-dom';
import { OpinionsContext } from '../store/opinions-context';

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <VoteButtons opinionId={id} votes={votes} />
      </form>
    </article>
  );
}

export function VoteButtons({ opinionId, votes }) {
  const { upvoteOpinion, downvoteOpinion } = useContext(OpinionsContext);

  // If your component is wrapped within a <form></form>, you can use the useFormStatus hook
  // to get the current form state: https://react.dev/reference/react-dom/hooks/useFormStatus
  const { pending } = useFormStatus();

  // Note: You can assign different form actions to the buttons inside your form.
  return (
    <>
      <button formAction={() => upvoteOpinion(opinionId)} disabled={pending}>
        <UpvoteIcon />
      </button>
      <span>{votes}</span>
      <button formAction={() => downvoteOpinion(opinionId)} disabled={pending}>
        <DownvoteIcon />
      </button>
    </>
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
