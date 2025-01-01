import { useEffect, useState } from "react";
import { useGlobalPokemons } from "./useGlobalPokemons";
import axios from "axios";
import { URL_POKEMON } from "../api/apiRest";

export const useFilteredPokemon = (type) => {
  const { globalPokemon } = useGlobalPokemons();
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  useEffect(() => {
    const fetchPokemonData = async () => {
      const promises = globalPokemon?.map((pokemon) =>
        axios.get(`${URL_POKEMON}/${pokemon.name}`)
      );
      const results = await Promise.all(promises);
      const filtered = results.filter((pokemon) =>
        pokemon?.data?.types?.some((t) => t.type.name === type)
      );
      setFilteredPokemon(filtered);
    };
    fetchPokemonData();
  }, [globalPokemon, type]);
  return filteredPokemon;
};
