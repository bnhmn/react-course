import useWebSocket, { ReadyState } from 'react-use-websocket';

import { MessageType } from '../types/Message';

export function useBackend(): { message?: MessageType; sendMessage: (message: object) => void } {
  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(getWebSocketUrl());
  const message = lastJsonMessage as MessageType | null;

  if (readyState <= ReadyState.CONNECTING || message === null) {
    // Wait for first message from backend
    return { sendMessage: () => null };
  }

  if (
    readyState >= ReadyState.CLOSING &&
    (message.type !== 'game' || (message.type === 'game' && message.state === 'running'))
  ) {
    // Lost connection to backend mid game
    window.location.reload();
  }

  function sendMessage(message: object) {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage(message);
    } else {
      window.location.reload();
    }
  }

  return { message, sendMessage };
}

function getWebSocketUrl(): string {
  return (
    import.meta.env.VITE_BACKEND_URL ||
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host
  );
}
