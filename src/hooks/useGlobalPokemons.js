import { useEffect, useState } from "react";
import { URL_POKEMON } from "../api/apiRest";
import axios from "axios";
import queryString from "query-string";

export const useGlobalPokemons = () => {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [xpage, setXpage] = useState(1);

  useEffect(() => {
    const api = async () => {
      const limit = 25;
      const xp = (xpage - 1) * limit;
      const apiPoke = await axios.get(
        `${URL_POKEMON}/?offset=${xp}&limit=${limit}`
      );

      setArrayPokemon(apiPoke.data.results);
    };

      const page = queryString.parse(window.location.search).page;
      // console.log(page);
      const statePage = () => {
        if (page) {
          setXpage(Number(page));
        }
      };
      statePage();
    api();
    getGlobalPokemons();
  }, [xpage]);

  const getGlobalPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1300`);
    const promises = res.data.results.map((pokemon) => {
      return pokemon;
    });
    const results = await Promise.all(promises);
    setGlobalPokemon(results);
  };
  return { globalPokemon, xpage, setXpage, arrayPokemon };
};
