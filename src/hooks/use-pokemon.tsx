import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import {
  getPokemonEvolutionChain,
  getPokemonInfo,
  getPokemonWeaknessesAndFormatTypes,
} from 'services/pokemon';
import { Pokemon, PokemonChain, PokemonTypes } from 'types/pokemon';
import { usePokemons } from './use-pokemons';

export type PokemonContextData = {
  pokemon: Pokemon | null;
  types: PokemonTypes[];
  weaknesses: PokemonTypes[];
  chain: PokemonChain[];
  setPokemonId: Dispatch<SetStateAction<number | null>>;
};

const initialState = {
  pokemon: null,
  types: [],
  weaknesses: [],
  chain: [],
};

export const PokemonContext = createContext<PokemonContextData>({
  ...initialState,
  setPokemonId: () => {},
});

export type PokemonProviderProps = {};

const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [types, setTypes] = useState<PokemonTypes[]>([]);
  const [weaknesses, setWeaknesses] = useState<PokemonTypes[]>([]);
  const [chain, setChain] = useState<PokemonChain[]>([]);

  const { getPokemonById } = usePokemons();
  const history = useHistory();

  const fetchPokemonInfo = useCallback(
    async (id: number) => {
      const findedPokemon = await getPokemonById(id);

      if (findedPokemon) {
        setPokemon(findedPokemon);
      } else {
        const fetchedPokemon = await getPokemonInfo({
          idOrName: id,
        });

        if (fetchedPokemon) {
          setPokemon(fetchedPokemon);
        } else {
          history.push('/');
        }
      }
    },
    [getPokemonById, history],
  );

  const fetchPokemonChain = useCallback(async (pokemonChainUrl: string) => {
    const pokemonChain = await getPokemonEvolutionChain(pokemonChainUrl);
    setChain(pokemonChain);
  }, []);

  const fetchPokemonTypesAndWraknesses = useCallback(
    async ({ types: pokemonTypes }: Pokemon) => {
      const fetchedTypesAndWeaknesses = await getPokemonWeaknessesAndFormatTypes(
        {
          types: pokemonTypes,
        },
      );

      if (fetchedTypesAndWeaknesses.types) {
        setTypes(fetchedTypesAndWeaknesses.types);
      }

      if (fetchedTypesAndWeaknesses.weaknesses) {
        setWeaknesses(fetchedTypesAndWeaknesses.weaknesses);
      }
    },
    [],
  );

  useEffect(() => {
    if (pokemonId) {
      fetchPokemonInfo(pokemonId);
    }
  }, [pokemonId]);

  useEffect(() => {
    if (pokemon) {
      fetchPokemonChain(pokemon.evolutionChainUrl);
      fetchPokemonTypesAndWraknesses(pokemon);
    }
  }, [pokemon, fetchPokemonChain]);

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        types,
        weaknesses,
        chain,
        setPokemonId,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

const usePokemon = () => useContext(PokemonContext);

export { PokemonProvider, usePokemon };
