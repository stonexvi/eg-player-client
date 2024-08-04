import React, { useState, useEffect, useCallback } from 'react';
import { ReactComponent as Arrow } from '../svg/Arrow.svg';
import './OneButtonProtocol.css';

const actionTypeToSprite = {
  'move-left': <Arrow className='sprite-arrow-left'/>,
  'move-right': <Arrow className='sprite-arrow-right'/>,
  'move-up': <Arrow className='sprite-arrow-up'/>,
  'move-down': <Arrow className='sprite-arrow-down'/>,
  'jump':  <img src='/sprites/jump-little.png' className='sprite-img'/>,
  'press-gas': <Arrow className='sprite-arrow-left'/>,
  'interact-a': <img src='/sprites/a-button-sprite-little.png' className='sprite-img'/>,
  'interact-b': <img src='/sprites/b-button-sprite-little.png' className='sprite-img'/>,
  'gadget-wings': <img src='/sprites/a-button-sprite-little.png' className='sprite-img'/>,
  'gadget-floaties': <img src='/sprites/b-button-sprite-little.png' className='sprite-img'/>,
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

  const getButtonState = () => {
    // get a  button state
    const actionTypes = Object.keys(buttonActions);
    const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];
    const gameAction = buttonActions[actionType];
    const sprite = actionTypeToSprite[actionType];

    // get the  state
    return {
      gameAction,
      sprite,
    }
  };

  const initialButtonState = getButtonState();
  const [buttonAction, setButtonAction] = useState(initialButtonState.gameAction);
  const [buttonSprite, setButtonSprite] = useState(initialButtonState.sprite);

  // change the randmButtonState every 2 seconds
  useEffect(() => {
    let interval;

    if (timed) {
      interval = setInterval(() => {
        setButtonState();
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [buttonActions, timed]);

  const setButtonState = () => {
    // get a  button state
    const {
      gameAction,
      sprite,
    } = getButtonState();

    console.log('Setting  Button State:', {gameAction, sprite});
    
    // set the button state
    setButtonAction(gameAction);
    setButtonSprite(sprite);
  };

  const handleButtonReleased = () => {
    console.log('Sending Game Action:', buttonAction);

    // send the game
    sendGameAction(protocol.characterId, buttonAction);

    // reset button state
    setButtonState();
  };

  return (
    <div className="protocol-container">
      <div className="sprite-button" onTouchEnd={handleButtonReleased}>
        { buttonSprite }
      </div>
    </div>
  );
};

export default OneButtonProtocol;
