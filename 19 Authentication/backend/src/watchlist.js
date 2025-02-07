const watchlists = new Map();
const delaySeconds = 0.5;

export async function findWatchlist(userId) {
  return watchlists.get(userId);
}

export async function addToWatchlist(userId, eventId) {
  await sleep(delaySeconds);
  if (!watchlists.has(userId)) {
    watchlists.set(userId, new Set());
  }
  watchlists.get(userId).add(eventId);
}

export async function removeFromWatchlist(userId, eventId) {
  await sleep(delaySeconds);
  watchlists.get(userId)?.delete(eventId);
}

async function sleep(seconds) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
