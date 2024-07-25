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

  const [playerProtocol, setPlayerProtocol] = useState(null);
  const [characterId, setCharacterId] = useState(null);

  useEffect(() => {
    // JSON parse the last message as a protocol message
    if (lastMessage !== null) {
      try {
        const protocol = JSON.parse(lastMessage.data);
        console.log('Revceived Protocol: ', protocol);
        setCharacterId(protocol.characterId);

        console.log('Updating Player Protocol:', protocol);

        switch (protocol?.type) {
          case 'one-button-random':
            setPlayerProtocol(<OneButtonRandomProtocol
              sendGameAction={sendGameAction}
              protocol={protocol}
            />);
            break;
          default:
            console.error('Unknown protocol type:', protocol.type);
            break;
        }
      } catch (error) {
        console.error('Error parsing last message:', error);
      }
    }
  }, [lastMessage]);

  const sendGameAction = useCallback((gameAction) => sendMessage(JSON.stringify({
    action: 'send-game-action',
    characterId: characterId,
    gameAction,
  })), [sendMessage, characterId]);

  if (
    readyState === ReadyState.OPEN
    && playerProtocol
    && characterId
  ) {
    return (
      <div className='container'>
        <h1 className='playing-as'>You're playing as...</h1>
        <p className='character-id'>{ characterId }</p>
        <div className='game-container'>
          { playerProtocol }
        </div>
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
