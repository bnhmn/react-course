import eventData from '../events.json' with { type: "json" };

import { randomUUID } from 'crypto';

const events = eventData.events;

export async function findAllEvents(sleepSeconds = 0.5) {
  await sleep(sleepSeconds);
  return events;
}

export async function findEventById(eventId, sleepSeconds = 0.5) {
  await sleep(sleepSeconds);
  return events.find((event) => event.id === eventId);
}

export async function addEvent(eventData, sleepSeconds = 0.5) {
  await sleep(sleepSeconds);
  const newEvent = createEvent(eventData);
  events.unshift(newEvent);
  return newEvent;
}

export async function deleteEventById(eventId, sleepSeconds = 0.5) {
  await sleep(sleepSeconds);
  const [event, eventIndex] = findEvent(eventId);
  if (!event) {
    return null;
  }
  events.splice(eventIndex, 1);
  return event;
}

export async function replaceEvent(eventId, eventData, sleepSeconds = 0.5) {
  await sleep(sleepSeconds);
  const [event, eventIndex] = findEvent(eventId);
  if (!event) {
    return null;
  }
  const newEvent = createEvent(eventData);
  events[eventIndex] = newEvent;
  return newEvent;
}

function createEvent(eventData) {
  return { id: randomUUID(), ...eventData };
}

function findEvent(eventId) {
  const eventIndex = events.findIndex((event) => event.id === eventId);
  const event = events[eventIndex];
  return [event, eventIndex];
}

async function sleep(seconds) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
