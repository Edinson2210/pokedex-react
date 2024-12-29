import axios from "axios";
import { useEffect, useState } from "react";
import { URL_POKEMON } from "../api/apiRest";

export const usePokemonData = (pokemonName) => {
  const [itemPokemon, setItemPokemon] = useState({});

  useEffect(() => {
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${pokemonName}`);
      setItemPokemon(api.data);
    };
    dataPokemon();
  }, [pokemonName]);

  return itemPokemon;
};
