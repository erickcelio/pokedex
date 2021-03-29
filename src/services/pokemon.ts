import axios from 'axios';
import { Pokemon, PokemonTypes } from 'types/pokemon';
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
  const { data } = await pokemonApi.get<PokemonListResult>('pokemon', {
    params: {
      limit: 50,
      offset: 0,
    },
  });

  return data;
};

type PokemonInfoResult = {
  id: number;
  name: string;
  weight: number;
  height: number;
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
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
};

type PokemonSpeciesResult = {
  color: {
    name: string;
  };
  evolution_chain: {
    url: string;
  };
};

type getPokemonInfoParams = {
  url?: string;
  idOrName?: number | string;
};

export const getPokemonInfo = async ({
  url,
  idOrName,
}: getPokemonInfoParams) => {
  try {
    let pokemonInfo;

    if (url) {
      pokemonInfo = await axios.get<PokemonInfoResult>(url);
    }

    if (idOrName) {
      pokemonInfo = await pokemonApi.get<PokemonInfoResult>(
        `pokemon/${idOrName}`,
      );
    }

    if (pokemonInfo) {
      const {
        data: {
          id,
          name,
          sprites,
          stats,
          species,
          types,
          weight,
          height,
          abilities,
        },
      } = pokemonInfo;

      const {
        data: { color, evolution_chain },
      } = await axios.get<PokemonSpeciesResult>(species.url);

      const formattedStats = stats.map(({ stat, base_stat }) => ({
        name: stat.name,
        value: base_stat,
      }));

      const filteredAbilities = abilities.filter(({ is_hidden }) => !is_hidden);

      const formattedAbilities = filteredAbilities.map(
        ({ ability }) => ability.name,
      );

      return {
        id,
        name,
        types,
        weight,
        height,
        color: color.name,
        stats: formattedStats,
        abilities: formattedAbilities,
        evolutionChainUrl: evolution_chain.url,
        image: sprites.other.dream_world.front_default,
      };
    }

    return null;
  } catch {
    return null;
  }
};

const getPokemonsInfoFromList = async (pokemonList: PokemonListResult) => {
  const pokemonsInfo = await Promise.all(
    pokemonList.results.map(getPokemonInfo),
  );

  return pokemonsInfo.filter((item) => item !== null) as Pokemon[];
};

const getPokemonFromName = async (pokemonName: string) => {
  const {
    data: { id, name, sprites },
  } = await pokemonApi.get<PokemonInfoResult>(`/pokemon/${pokemonName}`);

  return {
    id,
    name,
    image: sprites.other.dream_world.front_default,
  };
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

type PokemonTypeResult = {
  damage_relations: {
    double_damage_from: {
      name: string;
      url: string;
    }[];
  };
};

export const getPokemonWeaknessesAndFormatTypes = async ({
  types,
}: Pick<Pokemon, 'types'>) => {
  const mainType = types.find((type) => type.slot === 1);
  const formattedTypes = types.map<PokemonTypes>(
    ({ type }) => type.name as PokemonTypes,
  );

  if (mainType) {
    const mainTypeUrl = mainType.type.url;

    const { data } = await axios.get<PokemonTypeResult>(mainTypeUrl);

    const weaknesses = data.damage_relations.double_damage_from.map<PokemonTypes>(
      (type) => type.name as PokemonTypes,
    );

    return {
      weaknesses,
      types: formattedTypes,
    };
  }

  return {};
};

type species = {
  name: string;
  url: string;
};

type evolvesTo = {
  evolves_to: evolvesTo[];
  species: species;
};

type pokemonEvolutionChainResponse = {
  chain: {
    evolves_to: evolvesTo[];
    species: species;
  };
};

const getPokemonFromEvolvesTo = (
  evolvesToChain: evolvesTo[],
  pokemonChainName: string[] = [],
): string[] => {
  const [evolveTo] = evolvesToChain;

  if (!evolveTo) {
    return pokemonChainName;
  }

  pokemonChainName.push(evolveTo.species.name);
  return getPokemonFromEvolvesTo(evolveTo.evolves_to, pokemonChainName);
};

export const getPokemonEvolutionChain = async (evolutionChainUrl: string) => {
  const {
    data: { chain },
  } = await axios.get<pokemonEvolutionChainResponse>(evolutionChainUrl);
  let pokemonsChainNames = [];

  pokemonsChainNames.push(chain.species.name);

  const pokemonsFromEvolvesTo = getPokemonFromEvolvesTo(chain.evolves_to);
  pokemonsChainNames = [...pokemonsChainNames, ...pokemonsFromEvolvesTo];

  return Promise.all(pokemonsChainNames.map(getPokemonFromName));
};
