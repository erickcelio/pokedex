import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as ForwardIcon } from 'assets/icons/forward.svg';
import { Pokemon, PokemonTypes } from 'types/pokemon';
import { usePokemons } from 'hooks/use-pokemons';
import { normalizeText } from 'utils/text';
import PokemonType from 'components/PokemonType';
import Loading from 'components/Loading';
import {
  getPokemonEvolutionChain,
  getPokemonWeaknessesAndFormatTypes,
} from 'services/pokemon';

import * as S from './styles';

type PokemonTypesAndWeaknesses = {
  types: PokemonTypes[];
  weaknesses: PokemonTypes[];
};

type PokemonChain = {
  id: number;
  name: string;
  image: string;
};

const PokemonPage: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonChain, setPokemonChain] = useState<PokemonChain[] | null>(null);
  const [
    pokemonTypesAndWeaknesses,
    setPokemonTypesAndWeaknesses,
  ] = useState<PokemonTypesAndWeaknesses | null>(null);

  const { getPokemonById } = usePokemons();

  const { pokemonId } = useParams<{
    pokemonId: string;
  }>();

  const getTypeAndWeaknesses = useCallback(async () => {
    if (pokemon) {
      const { types, weaknesses } = await getPokemonWeaknessesAndFormatTypes({
        types: pokemon.types,
      });

      if (types && weaknesses) {
        setPokemonTypesAndWeaknesses({
          types,
          weaknesses,
        });
      }
    }
  }, [pokemon]);

  const getPokemon = useCallback(async () => {
    setPokemon(null);

    const fetchedPokemon = await getPokemonById(parseInt(pokemonId, 10));

    if (fetchedPokemon) {
      setPokemon(fetchedPokemon);
    }
  }, [getPokemonById, pokemonId]);

  const getPokemonChain = useCallback(async () => {
    if (pokemon) {
      const chain = await getPokemonEvolutionChain(pokemon.evolutionChainUrl);

      setPokemonChain(chain);
    }
  }, [pokemon]);

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  useEffect(() => {
    getTypeAndWeaknesses();
  }, [getTypeAndWeaknesses]);

  useEffect(() => {
    getPokemonChain();
  }, [getPokemonChain]);

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
          <div>
            {pokemonTypesAndWeaknesses?.types.map((type) => (
              <PokemonType key={type} type={type} />
            ))}
          </div>
        </div>
        <div>
          <h3>Weaknesses</h3>
          <div>
            {pokemonTypesAndWeaknesses?.weaknesses.map((type) => (
              <PokemonType key={`weakness-${type}`} type={type} />
            ))}
          </div>
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
        {pokemonChain ? (
          <ul>
            {pokemonChain.map(({ id, image, name }) => (
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
