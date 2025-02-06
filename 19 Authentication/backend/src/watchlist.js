const watchlist = new Set(['e1', 'e3']);
const delaySeconds = 0.5;

export async function findAllWatchlistItems() {
  await sleep(delaySeconds);
  return [...watchlist];
}

export async function addToWatchlist(eventId) {
  await sleep(delaySeconds);
  watchlist.add(eventId);
}

export async function removeFromWatchlist(eventId) {
  await sleep(delaySeconds);
  watchlist.delete(eventId);
}

async function sleep(seconds) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
