import React, { useState, useEffect } from 'react';
import './OneButtonRandomProtocol.css';

function OneButtonRandomProtocol({ 
  sendGameAction,
  protocol,
}) {
  // get custom info from the protocol object
  const {
    buttonActions,
    timed,
  } = protocol;

  const getRandomButtonState = () => Object.entries(buttonActions)[Math.floor(Math.random() * Object.keys(buttonActions).length)];
  const [randomButtonState, setRandomButtonState] = useState(getRandomButtonState());

  // change the randmButtonState every 2 seconds
  useEffect(() => {
    let interval;

    if (timed) {
      interval = setInterval(() => {
        setRandomButtonState(getRandomButtonState());
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [buttonActions]);

  const handleSendGameAction = () => {
    sendGameAction(randomButtonState[1]);

    // reset button state
    setRandomButtonState(getRandomButtonState());
  }

  return (
    <div className="game-container">
      <button className="action-button" onClick={handleSendGameAction}>{ randomButtonState[0] }</button>
    </div>
  );
};

export default OneButtonRandomProtocol;
