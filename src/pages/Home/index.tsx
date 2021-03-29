import React, { useEffect } from 'react';

import PokemonList from 'components/PokemonList';
import { usePokemons } from 'hooks/use-pokemons';

import * as S from './styles';

const Home: React.FC = () => {
  const { fetchPokemons } = usePokemons();

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <S.Container>
      <PokemonList />
    </S.Container>
  );
};

export default Home;
