import { useEffect, useState } from "react";
import { URL_ESPECIES } from "../api/apiRest";
import axios from "axios";

export const usePokemonSpecies = (urlPokemon) => {
  const [especiePokemon, setEspeciePokemon] = useState({
    habitat: null,
    color: null,
    url_especies: null,
    data: null,
  });

  useEffect(() => {
    if (!urlPokemon) return;
    const dataEspecies = async () => {
      const url = urlPokemon?.split("/");

      const api = await axios.get(`${URL_ESPECIES}/${url[6]}`);
      setEspeciePokemon({
        habitat: api.data.habitat?.name,
        color: api.data.color?.name,
        url_especies: api.data?.evolution_chain,
        data: api?.data,
      });
    };
    dataEspecies();
  }, [urlPokemon]);

  return especiePokemon;
};
