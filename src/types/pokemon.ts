export type Pokemon = {
  id: number;
  name: string;
  weight: number;
  height: number;
  color: string;
  image: string;
  evolutionChainUrl: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: string[];
  stats: {
    name: string;
    value: number;
  }[];
};

export type PokemonTypes =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy';

export type PokemonChain = {
  id: number;
  name: string;
  image: string;
};
