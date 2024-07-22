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

  const handleSendGameAction = useCallback(() => sendMessage(JSON.stringify({
    action: 'send-game-action',
    gameAction: {
      character: {
        move: {
          direction: 'UP',
        },
      },
    },
  })), []);

  if (readyState === ReadyState.OPEN) {
    return (
      <div className="game-container">
        <button className="action-button" onClick={handleSendGameAction}>UP</button>
      </div>
    );
  } else {
    return (
      <div className="loading-container">
        <div className="loading-animation">Loading...</div>
      </div>
    );
  }
};

export default Game;
