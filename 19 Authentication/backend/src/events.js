import eventData from '../events.json' with { type: "json" };

const events = eventData.events;
const watchlist = new Set(['e1', 'e3']);
let eventId = events.length;
const delaySeconds = 0.5;

export async function findAllEvents(sleepSeconds = delaySeconds) {
  await sleep(sleepSeconds);
  return events
    .map((event) => ({ ...event, watching: watchlist.has(event.id) }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function findEventById(eventId, sleepSeconds = delaySeconds) {
  await sleep(sleepSeconds);
  return events.find((event) => event.id === eventId);
}

export async function addEvent(eventData, sleepSeconds = delaySeconds) {
  await sleep(sleepSeconds);
  const newEvent = createEvent(eventData);
  events.unshift(newEvent);
  return newEvent;
}

export async function deleteEventById(eventId, sleepSeconds = delaySeconds) {
  await sleep(sleepSeconds);
  const [event, eventIndex] = findEvent(eventId);
  if (!event) {
    return null;
  }
  events.splice(eventIndex, 1);
  return event;
}

export async function replaceEvent(eventId, newEventData, sleepSeconds = delaySeconds) {
  await sleep(sleepSeconds);
  const [event, eventIndex] = findEvent(eventId);
  if (!event) {
    return null;
  }
  events[eventIndex] = { ...event, ...newEventData };
  return events[eventIndex];
}

export async function addToWatchlist(eventId) {
    await sleep(delaySeconds);
    watchlist.add(eventId);
}

export async function removeFromWatchlist(eventId) {
    await sleep(delaySeconds);
    watchlist.delete(eventId);
}

function createEvent(eventData) {
  return { id: `e${++eventId}`, ...eventData };
}

function findEvent(eventId) {
  const eventIndex = events.findIndex((event) => event.id === eventId);
  const event = events[eventIndex];
  return [event, eventIndex];
}

async function sleep(seconds) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
