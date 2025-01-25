import { createContext, useEffect, useState } from 'react';

export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: async (opinion) => {},
  upvoteOpinion: async (id) => {},
  downvoteOpinion: async (id) => {},
});

export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState();

  useEffect(() => {
    fetchFromBackend({ method: 'GET', uri: '/opinions' }).then(setOpinions);
  }, []);

  function addOpinion(enteredOpinionData) {
    fetchFromBackend({ method: 'POST', uri: '/opinions', body: enteredOpinionData }).then((addedOpinion) =>
      setOpinions((prev) => [addedOpinion, ...prev]),
    );
  }

  function upvoteOpinion(id) {
    // Optimistic update (first update the UI, then update the backend, rollback the UI on error)
    changeOpinionVotes(id, 1);
    fetchFromBackend({ method: 'POST', uri: `/opinions/${id}/upvote` }).catch(() => {
      changeOpinionVotes(id, -1);
    });
  }

  function downvoteOpinion(id) {
    // Optimistic update (first update the UI, then update the backend, rollback the UI on error)
    changeOpinionVotes(id, -1);
    fetchFromBackend({ method: 'POST', uri: `/opinions/${id}/downvote` }).catch(() => {
      changeOpinionVotes(id, 1);
    });
  }

  function changeOpinionVotes(opinionId, deltaVotes) {
    setOpinions((prevOpinions) =>
      prevOpinions.map((opinion) =>
        opinion.id === opinionId ? { ...opinion, votes: opinion.votes + deltaVotes } : opinion,
      ),
    );
  }

  const contextValue = {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}

/**
 * @param {{method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; uri: string} & RequestInit} request
 */
async function fetchFromBackend(request) {
  request.url = `http://localhost:3000${request.uri}`;

  if (request.body) {
    request.headers = request.headers ?? {};
    request.headers['Content-Type'] = 'application/json';
    request.body = JSON.stringify(request.body);
  }

  const resp = await fetch(request.url, request);

  if (resp.ok) {
    if (resp.headers.get('Content-Type')?.includes('application/json')) {
      return await resp.json();
    } else {
      return null;
    }
  } else {
    const responseBody = await resp.text();
    const error = `<== Received error ${resp.status} (${resp.statusText})\n${responseBody}`;
    console.error(error);
    throw error;
  }
}
