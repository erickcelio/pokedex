import pokemonNames from './json/pokemon-names.json';

export const pokemonOptions = pokemonNames.map((pokemonName) => ({
  label: pokemonName,
  value: pokemonName.toLowerCase(),
}));
