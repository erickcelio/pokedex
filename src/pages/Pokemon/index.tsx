import React from 'react';
import { useParams } from 'react-router-dom';

// import { Container } from './styles';

const Pokemon: React.FC = () => {
  const { pokemonId } = useParams<{
    pokemonId: string;
  }>();

  console.log({ pokemonId });

  return <div>Pokemon</div>;
};

export default Pokemon;
