import React from 'react';
import WindowedSelect from 'react-windowed-select';

import PokemonList from 'components/PokemonList';
import { pokemonOptions } from 'data/pokemon';

import * as S from './styles';

const Home: React.FC = () => {
  return (
    <S.Container>
      <S.SelectContainer>
        <WindowedSelect isClearable options={pokemonOptions} />
      </S.SelectContainer>
      <PokemonList />
    </S.Container>
  );
};

export default Home;
