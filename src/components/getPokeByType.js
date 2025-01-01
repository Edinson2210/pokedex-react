import { usePokemonData } from "../hooks";

export const getPokeByType = (type) => {
  const itemPokemon = usePokemonData();
  return itemPokemon.filter((pokemon) => pokemon?.type?.types?.includes(type));
};
