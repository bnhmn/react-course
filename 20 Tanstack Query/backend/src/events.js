import eventData from '../events.json' with { type: "json" };
import { findWatchlist } from './watchlist.js';

const events = eventData.events;
let eventId = events.length;
const delaySeconds = 0.5;

export async function findAllEvents(userId, sleepSeconds = delaySeconds) {
  await sleep(sleepSeconds);
  const watchlist = await findWatchlist(userId);
  return events
    .map((event) => ({ ...event, watching: watchlist?.has(event.id) }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function findEventById(eventId, sleepSeconds = delaySeconds) {
  await sleep(sleepSeconds);
  return events.find((event) => event.id === eventId);
}

export async function addEvent(eventData, sleepSeconds = delaySeconds) {
  await sleep(sleepSeconds);
  const newEvent = { id: `e${++eventId}`, ...eventData };
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

function findEvent(eventId) {
  const eventIndex = events.findIndex((event) => event.id === eventId);
  const event = events[eventIndex];
  return [event, eventIndex];
}

async function sleep(seconds) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
