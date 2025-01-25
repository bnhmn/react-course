import { useContext } from 'react';
import { useFormStatus } from 'react-dom';
import downvoteIcon from '../assets/downvote.svg';
import upvoteIcon from '../assets/upvote.svg';
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
        <img src={upvoteIcon} alt="upvote icon" />
      </button>
      <span>{votes}</span>
      <button formAction={() => downvoteOpinion(opinionId)} disabled={pending}>
        <img src={downvoteIcon} alt="downvote icon" />
      </button>
    </>
  );
}
