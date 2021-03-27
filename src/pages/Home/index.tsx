import React from 'react';
import WindowedSelect from 'react-windowed-select';

import PokemonList from 'components/PokemonList';
import { pokemonOptions } from 'data/pokemon';
import { Pokemon } from 'types/pokemon';

import * as S from './styles';

const pokemons: Pokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    color: 'pink',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  },
  {
    id: 2,
    name: 'Bulbasaur',
    color: 'white',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  },
  {
    id: 3,
    name: 'Bulbasaur',
    color: 'gray',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  },
  {
    id: 4,
    name: 'Bulbasaur',
    color: 'green',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  },
  {
    id: 5,
    name: 'Bulbasaur',
    color: 'purple',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  },
  {
    id: 6,
    name: 'Bulbasaur',
    color: 'yellow',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  },
  {
    id: 7,
    name: 'Bulbasaur',
    color: 'brown',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  },
  {
    id: 8,
    name: 'Bulbasaur',
    color: 'black',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  },
  {
    id: 9,
    name: 'Bulbasaur',
    color: 'blue',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  },
  {
    id: 10,
    name: 'Bulbasaur',
    color: 'red',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  },
];

const Home: React.FC = () => {
  return (
    <S.Container>
      <S.SelectContainer>
        <WindowedSelect isClearable options={pokemonOptions} />
      </S.SelectContainer>
      <PokemonList pokemons={pokemons} />
    </S.Container>
  );
};

export default Home;
