import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loading from 'components/Loading';
import { usePokemons } from 'hooks/use-pokemons';

import * as S from './styles';

const PokemonList: React.FC = () => {
  const { pokemons, findNextPokemons, hasNextPokemons } = usePokemons();

  return (
    <S.Container>
      {!pokemons.length && <Loading />}

      <InfiniteScroll
        dataLength={pokemons.length}
        next={findNextPokemons}
        hasMore={hasNextPokemons}
        loader={<Loading />}
      >
        <S.PokemonsContainer>
          {pokemons.map(({ image, name, color, id }) => (
            <Link to={`pokemon/${id}`} key={id}>
              <S.Pokemon color={color}>
                <img src={image} alt={`Pokemon ${name}`} />
                <span>{name}</span>
              </S.Pokemon>
            </Link>
          ))}
        </S.PokemonsContainer>
      </InfiniteScroll>
    </S.Container>
  );
};

export default PokemonList;
