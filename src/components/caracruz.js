import { Button } from '@chakra-ui/core';
import React, { useState } from 'react';

const CaraCruz = () => {
  const [cara, setCara] = useState('😐');
  const [numero, setNumero] = useState(0);

  const probarSuerte = () => {
    setNumero(Math.floor(Math.random() * 10) + 1);
    numero > 5 ? setCara('😁') : setCara('😛');
  }

  return (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button mx={3} py={0} onClick={probarSuerte}>Probar suerte</Button>
      <span style={{ fontSize: '1.5rem' }} role="img" aria-label="Cara">{cara}</span>
    </span>
  )
}

export default CaraCruz