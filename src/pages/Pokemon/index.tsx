import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as ForwardIcon } from 'assets/icons/forward.svg';
import { usePokemon } from 'hooks/use-pokemon';
import { normalizeText } from 'utils/text';
import PokemonType from 'components/PokemonType';
import Loading from 'components/Loading';

import * as S from './styles';

type Params = {
  pokemonId: string;
};

const PokemonPage: React.FC = () => {
  const { pokemonId } = useParams<Params>();
  const { pokemon, types, weaknesses, chain, setPokemonId } = usePokemon();

  useEffect(() => {
    setPokemonId(parseInt(pokemonId, 10));
  }, [pokemonId]);

  return pokemon ? (
    <S.Container>
      <S.TitleContainer>{pokemon?.name}</S.TitleContainer>
      <S.ImageContainer color={pokemon?.color || 'white'}>
        <img src={pokemon?.image} alt={pokemon?.name} />
      </S.ImageContainer>
      <S.DescriptionContainer>
        <h2>Description</h2>
        <div>
          <h3>Type</h3>
          {types.length ? (
            <div>
              {types.map((type) => (
                <PokemonType key={type} type={type} />
              ))}
            </div>
          ) : (
            <Loading isLoading />
          )}
        </div>
        <div>
          <h3>Weaknesses</h3>
          {types.length ? (
            <div>
              {weaknesses.map((type) => (
                <PokemonType key={`weakness-${type}`} type={type} />
              ))}
            </div>
          ) : (
            <Loading isLoading />
          )}
        </div>
      </S.DescriptionContainer>
      <S.StatsContainer>
        <h2>Stats</h2>
        <ul>
          {pokemon?.stats.map((stat) => (
            <li key={stat.name}>
              <h3>{normalizeText(stat.name)}</h3>
              <S.StatBar value={stat.value} />
            </li>
          ))}
        </ul>
      </S.StatsContainer>
      <S.AttributesContainer>
        <h2>Attributes</h2>
        <ul>
          <li>
            <h3>Height</h3>
            <span>{pokemon.height / 10}m</span>
          </li>
          <li>
            <h3>Weight</h3>
            <span>{pokemon.weight / 10}kg</span>
          </li>
          <li>
            <h3>Abilities</h3>
            {pokemon.abilities.map((ability) => (
              <span key={ability}>{normalizeText(ability)}</span>
            ))}
          </li>
        </ul>
      </S.AttributesContainer>
      <S.EvolutionsContainer>
        <h2>Evolutions</h2>
        {chain.length ? (
          <ul>
            {chain.map(({ id, image, name }) => (
              <li key={`evolution-${name}`}>
                <Link to={`/pokemon/${id}`}>
                  <img src={image} alt={`evolution-${name}`} />
                  <h3>{name}</h3>
                </Link>
                <ForwardIcon />
              </li>
            ))}
          </ul>
        ) : (
          <Loading isLoading />
        )}
      </S.EvolutionsContainer>
    </S.Container>
  ) : null;
};

export default PokemonPage;
