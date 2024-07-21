import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './Game.css';

const gameSocketUrl = 'wss://gmmz97ol82.execute-api.us-east-1.amazonaws.com/production/';

function Game() {
  const { gameId, playerId } = useParams();

  const socketUrl = `${gameSocketUrl}?gameId=${gameId}&clientType=player&clientId=${playerId}`;
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  console.log('socket connection info:', {
    socketUrl,
    lastMessage,
    readyState,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(() => sendMessage(JSON.stringify({
    action: 'send-game-action',
    gameAction: {
      character: {
        move: {
          direction: 'UP',
        },
      },
    },
  })), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
      UP
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
};

export default Game;
