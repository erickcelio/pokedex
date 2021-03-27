import axios from 'axios';
import { Pokemon } from 'types/pokemon';
import { pokemonApi } from './axios';

type PokemonListResult = {
  count: number;
  next: string;
  previous: null;
  results: {
    name: string;
    url: string;
  }[];
};

const getPokemonsList = async () => {
  const { data } = await pokemonApi.get<PokemonListResult>(
    'pokemon?limit=100&offset=0',
    {
      params: {
        limit: 20,
        offset: 0,
      },
    },
  );

  return data;
};

type PokemonInfoResult = {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  species: {
    name: string;
    url: string;
  };
};

type PokemonSpeciesResult = {
  color: {
    name: string;
  };
};

const getPokemonsInfoFromList = async (pokemonList: PokemonListResult) => {
  const pokemonsInfo = await Promise.all(
    pokemonList.results.map(async (pokemon) => {
      try {
        const {
          data: { id, name, sprites, species },
        } = await axios.get<PokemonInfoResult>(pokemon.url);

        const {
          data: { color },
        } = await axios.get<PokemonSpeciesResult>(species.url);

        return {
          id,
          name,
          color: color.name,
          image: sprites.other.dream_world.front_default,
        };
      } catch (e) {
        console.log({ e });
        return null;
      }
    }),
  );

  return pokemonsInfo.filter((item) => item !== null) as Pokemon[];
};

export const getInitialPokemons = async () => {
  const pokemonsList = await getPokemonsList();
  const pokemonsInfo = await getPokemonsInfoFromList(pokemonsList);

  return {
    nextPokemonsUrl: pokemonsList.next,
    pokemons: pokemonsInfo,
  };
};

export const getNextPokemons = async (url: string) => {
  const { data } = await axios.get<PokemonListResult>(url);
  const pokemonsInfo = await getPokemonsInfoFromList(data);

  return {
    nextPokemonsUrl: data.next,
    pokemons: pokemonsInfo,
  };
};
