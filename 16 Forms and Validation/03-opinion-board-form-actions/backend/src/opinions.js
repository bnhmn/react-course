import data from '../db.json' with { type: "json" };

const opinions = data.opinions;

export async function saveOpinion(opinion, delaySeconds = 0) {
  await sleep(delaySeconds);
  const newOpinion = { id: new Date().getTime(), votes: 0, ...opinion };
  opinions.unshift(newOpinion);
  return newOpinion;
}

export async function findAllOpinions(delaySeconds = 0) {
  await sleep(delaySeconds);
  return [...opinions];
}

export async function findOpinionById(id, delaySeconds = 0) {
  await sleep(delaySeconds);
  return opinions.find((o) => o.id === id);
}

export async function upvoteOpinion(id, delaySeconds = 0) {
  await sleep(delaySeconds);
  const opinion = await findOpinionById(id);
  if (opinion) {
    opinion.votes += 1;
  }
  return opinion;
}

export async function downvoteOpinion(id, delaySeconds = 0) {
  await sleep(delaySeconds);
  const opinion = await findOpinionById(id);
  if (opinion) {
    opinion.votes -= 1;
  }
  return opinion;
}

async function sleep(seconds) {
  return await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
