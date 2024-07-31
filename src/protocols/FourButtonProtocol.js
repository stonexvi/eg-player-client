import React from 'react';
import './FourButtonProtocol.css';
import OneButtonProtocol from './OneButtonProtocol';

function FourButtonProtocol({ 
  sendGameAction,
  protocol,
}) {
  // get custom info from the protocol object
  const {
    buttons,
  } = protocol;

  const getSendGameActionForButton = (buttonId) => {
    return (...args) => {
      console.log(`Triggered Button ${buttonId}`)
      sendGameAction(...args);
    };
  };

  return (
    <div className="protocol-container">
      <div>
        { 
          buttons.length >= 1
          && <OneButtonProtocol
              sendGameAction={getSendGameActionForButton(0)}
              protocol={buttons[0]}
            />
        }
      </div>
      <div className='middle-button-container'>
      { 
          buttons.length >= 2
          && <OneButtonProtocol
              sendGameAction={getSendGameActionForButton(1)}
              protocol={buttons[1]}
            />
        }
        { 
          buttons.length >= 3
          && <OneButtonProtocol
              sendGameAction={getSendGameActionForButton(2)}
              protocol={buttons[2]}
            />
        }
      </div>
      <div>
        { 
            buttons.length >= 4
            && <OneButtonProtocol
                sendGameAction={getSendGameActionForButton(3)}
                protocol={buttons[3]}
            />
        }
      </div>
      <div className='bottom-bottom-container'>
        { 
            buttons.length >= 5
            && <OneButtonProtocol
                sendGameAction={getSendGameActionForButton(4)}
                protocol={buttons[4]}
            />
        }
        { 
            buttons.length >= 6
            && <OneButtonProtocol
                sendGameAction={getSendGameActionForButton(5)}
                protocol={buttons[5]}
            />
        }
      </div>
    </div>
  );
};

export default FourButtonProtocol;
