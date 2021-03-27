import React from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from 'types/pokemon';

import * as S from './styles';

type PokemonListProps = {
  pokemons: Pokemon[];
};

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  console.log({ pokemons });

  return (
    <S.Container>
      {pokemons.map(({ image, name, color, id }) => (
        <Link to={`pokemon/${id}`} key={id}>
          <S.Pokemon color={color}>
            <img src={image} alt={`Pokemon ${name}`} />
            <span>{name}</span>
          </S.Pokemon>
        </Link>
      ))}
    </S.Container>
  );
};

export default PokemonList;
