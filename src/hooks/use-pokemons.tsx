import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getInitialPokemons, getNextPokemons } from 'services/pokemon';

import { Pokemon } from 'types/pokemon';

export type PokemonsContextData = {
  pokemons: Pokemon[];
  isLoading: boolean;
  hasLoaded: boolean;
  hasNextPokemons: boolean;
  findNextPokemons: () => void;
  getPokemonById: (id: number) => Promise<Pokemon | undefined>;
};

export const PokemonsContext = createContext<PokemonsContextData>({
  pokemons: [],
  isLoading: false,
  hasLoaded: false,
  hasNextPokemons: false,
  findNextPokemons: () => {},
  getPokemonById: async () => undefined,
});

export type PokemonsProviderProps = {};

const PokemonsProvider: React.FC<PokemonsProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextPokemonsUrl, setNextPokemonsUrl] = useState<null | string>(null);

  const fetchPokemons = useCallback(async () => {
    setIsLoading(true);

    try {
      const intialPokemons = await getInitialPokemons();

      setPokemons(intialPokemons.pokemons);
      setNextPokemonsUrl(intialPokemons.nextPokemonsUrl);
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const hasNextPokemons = useMemo(() => !!nextPokemonsUrl, [nextPokemonsUrl]);

  const findNextPokemons = useCallback(async () => {
    if (nextPokemonsUrl) {
      setIsLoading(true);

      try {
        const nextPokemons = await getNextPokemons(nextPokemonsUrl);
        setPokemons((currentPokemons) => [
          ...currentPokemons,
          ...nextPokemons.pokemons,
        ]);
        setNextPokemonsUrl(nextPokemons.nextPokemonsUrl);
      } finally {
        setIsLoading(false);
      }
    }
  }, [nextPokemonsUrl]);

  const getPokemonById = useCallback(
    async (id: number) => {
      const findedPokemon = pokemons.find(
        (pokemonItem) => pokemonItem.id === id,
      );

      return findedPokemon;
    },
    [pokemons],
  );

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <PokemonsContext.Provider
      value={{
        isLoading,
        hasLoaded,
        pokemons,
        hasNextPokemons,
        findNextPokemons,
        getPokemonById,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};

const usePokemons = () => useContext(PokemonsContext);

export { PokemonsProvider, usePokemons };
