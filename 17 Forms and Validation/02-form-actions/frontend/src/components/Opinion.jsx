import { useContext } from 'react';
import downvoteIcon from '../assets/downvote.svg';
import upvoteIcon from '../assets/upvote.svg';
import { OpinionsContext } from '../store/opinions-context';

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = useContext(OpinionsContext);
  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <div className="votes">
        <button onClick={() => upvoteOpinion(id)}>
          <img src={upvoteIcon} alt="upvote icon" />
        </button>
        <span>{votes}</span>
        <button onClick={() => downvoteOpinion(id)}>
          <img src={downvoteIcon} alt="downvote icon" />
        </button>
      </div>
    </article>
  );
}
