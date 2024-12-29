import axios from "axios";
import { useEffect, useState } from "react";
import { URL_EVOLUCIONES, URL_POKEMON } from "../api/apiRest";

export const usePokemonEvolutions = (especiePokemon) => {
  const [evoluciones, setEvoluciones] = useState([]);

  useEffect(() => {
    async function getPokemonImg(id) {
      const response = await axios.get(`${URL_POKEMON}/${id}`);
      return response?.data?.sprites?.other["home"]?.front_default;
    }

    if (especiePokemon?.url_especies) {
      const obtenerEvoluciones = async () => {
        const arrayEvoluciones = [];
        const URL = especiePokemon?.url_especies?.url?.split("/");

        const api = await axios.get(`${URL_EVOLUCIONES}/${URL[6]}`);
        const URL2 = api?.data?.chain?.species?.url?.split("/");
        const img1 = await getPokemonImg(URL2[6]);

        arrayEvoluciones.push({
          img: img1,
          name: api?.data?.chain?.species?.name,
          id: URL2[6],
        });

        if (api?.data?.chain?.evolves_to?.length !== 0) {
          const DATA2 = api?.data?.chain?.evolves_to[0]?.species;
          const ID = DATA2?.url?.split("/");
          const img2 = await getPokemonImg(ID[6]);

          arrayEvoluciones.push({
            img: img2,
            name: DATA2?.name,
            url: DATA2?.url,
            id: ID[6],
          });

          if (api?.data?.chain?.evolves_to[0]?.evolves_to?.length !== 0) {
            const DATA3 =
              api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species;
            const ID = DATA3?.url?.split("/");
            const img3 = await getPokemonImg(ID[6]);

            arrayEvoluciones.push({
              img: img3,
              name: DATA3?.name,
              id: ID[6],
            });
          }
        }
        setEvoluciones(arrayEvoluciones);
      };
      obtenerEvoluciones();
    }
  }, [especiePokemon]);

  return evoluciones;
};
