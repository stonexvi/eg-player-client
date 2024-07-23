import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import OneButtonRandomProtocol from './protocols/OneButtonRandomProtocol';

import './Game.css';

const gameSocketUrl = 'wss://gmmz97ol82.execute-api.us-east-1.amazonaws.com/production/';

function Game() {
  const { gameId, playerId } = useParams();
  const gameIdFormatted = gameId.toUpperCase();

  const socketUrl = `${gameSocketUrl}?gameId=${gameIdFormatted}&clientType=player&clientId=${playerId}`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  console.log('socket connection info:', {
    socketUrl,
    lastMessage,
    readyState,
  });
  
  const sendGameAction = useCallback((gameAction) => sendMessage(JSON.stringify({
    action: 'send-game-action',
    gameAction,
  })), []);

  const [playerProtocol, setPlayerProtocol] = useState(null);
  
  const updatePlayerProtocol = (protocol) => {
    let updatedPlayerProtocol = null;

    console.log('Updating Player Protocol:', protocol);

    switch (protocol.type) {
      case 'one-button-random':
        updatedPlayerProtocol = <OneButtonRandomProtocol
          sendGameAction={sendGameAction}
          protocol={protocol}
        />;
        break;
    }

    console.log('Setting Player Protocol:', updatedPlayerProtocol);
    
    setPlayerProtocol(updatedPlayerProtocol);
  }

  useEffect(() => {
    // JSON parse the last message as a protocol message
    let protocol;
    
    if (lastMessage !== null) {
      try {
        protocol = JSON.parse(lastMessage.data);
        console.log('Revceived Protocol: ', protocol);
      } catch (error) {
        console.error('Error parsing last message:', error);
      }
    }

    if (protocol?.type) {
      updatePlayerProtocol(protocol);
    }

  }, [lastMessage]);

  if (
    readyState === ReadyState.OPEN
    && playerProtocol
  ) {
    return (
      playerProtocol
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
