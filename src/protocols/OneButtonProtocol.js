import React, { useState, useEffect, useCallback } from 'react';
import './OneButtonProtocol.css';

const actionTypeToSprite = {
  'move-left': 'sprite-button-move-left',
  'move-right': 'sprite-button-move-right',
  'move-up': 'sprite-button-move-up',
  'move-down': 'sprite-button-move-down',
};

function OneButtonProtocol({ 
  sendGameAction,
  protocol,
}) {
  // get custom info from the protocol object
  const {
    buttonActions = {},
    timed = false,
  } = protocol;

  const getRandomButtonState = () => {
    // get a random button state
    const actionTypes = Object.keys(buttonActions);
    const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];
    const gameAction = buttonActions[actionType];
    const sprite = actionTypeToSprite[actionType];

    // get the random state
    return {
      gameAction,
      sprite,
    }
  };

  const initialRandomButtonState = getRandomButtonState();
  const [randomButtonAction, setRandomButtonAction] = useState(initialRandomButtonState.gameAction);
  const [randomButtonSprite, setRandomButtonSprite] = useState(initialRandomButtonState.sprite);
  const [buttonAnimation, setButtonAnimation] = useState(initialRandomButtonState.sprite);

  // change the randmButtonState every 2 seconds
  useEffect(() => {
    let interval;

    if (timed) {
      interval = setInterval(() => {
        setRandomButtonState();
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [buttonActions, timed]);

  const setRandomButtonState = () => {
    // get a random button state
    const {
      gameAction,
      sprite,
    } = getRandomButtonState();

    console.log('Setting Random Button State:', {gameAction, sprite});
    
    // set the button state
    setRandomButtonAction(gameAction);
    setRandomButtonSprite(sprite);
  };

  const handleButtonPressed = () => {
    setButtonAnimation('sprite-button-pressed');
  }

  const handleButtonReleased = () => {
    setButtonAnimation('sprite-button-released');

    console.log('Sending Game Action:', randomButtonAction);

    // send the game
    sendGameAction(protocol.characterId, randomButtonAction);

    // reset button state
    setRandomButtonState();
  };

  return (
    <div className="protocol-container">
      <button className={`sprite-button ${buttonAnimation} ${randomButtonSprite}`} onTouchStart={handleButtonPressed} onTouchEnd={handleButtonReleased} ></button>
    </div>
  );
};

export default OneButtonProtocol;
