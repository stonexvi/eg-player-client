import React, { useEffect } from 'react';
import throttle from 'lodash.throttle';
import './OneButtonProtocol.css';
import SteeringWheel from '../components/SteeringWheel';


function SteerProtocol({ sendGameAction, protocol }) {
  const handleSteer = throttle((angle) => {
    const radians = (angle * Math.PI) / 180;
    const direction = {
      x: Math.cos(radians),
      y: Math.sin(radians),
    };
    console.log('Steering:', direction, angle);
    sendGameAction(protocol.characterId, {
      type: 'SET_HEADING',
      heading: direction,
      angle,
    });
  }, 500);

  return (
    <div className="protocol-container">
      <SteeringWheel onSteer={handleSteer} range={65}/>
    </div>
  );
}

export default SteerProtocol;