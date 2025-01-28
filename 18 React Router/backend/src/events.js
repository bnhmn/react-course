import eventData from "../events.json" with { type: "json" };

import { randomUUID } from 'crypto';

const events = eventData.events;

export async function findAllEvents() {
  return events;
}

export async function findEventById(eventId) {
  return events.find((event) => event.id === eventId);
}

export async function addEvent(eventData) {
  const newEvent = createEvent(eventData);
  events.unshift(newEvent);
  return newEvent;
}

export async function deleteEventById(eventId) {
  const [event, eventIndex] = findEvent(eventId);
  if (!event) {
    return null;
  }
  events.splice(eventIndex, 1);
  return event;
}

export async function replaceEvent(eventId, eventData) {
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
