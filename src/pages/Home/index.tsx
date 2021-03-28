import React from 'react';

import PokemonList from 'components/PokemonList';

import * as S from './styles';

const Home: React.FC = () => {
  return (
    <S.Container>
      <PokemonList />
    </S.Container>
  );
};

export default Home;
