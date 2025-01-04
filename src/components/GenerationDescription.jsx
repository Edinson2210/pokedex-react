import React from "react";
import { usePokemonData, usePokemonSpecies } from "../hooks";

const GenerationDescription = ({ generacion }) => {
  const url = window.location.pathname.split("/")[2];
  const itemPokemon = usePokemonData(url);
  const especiePokemon = usePokemonSpecies(itemPokemon?.species?.url);

  const paldea =
    especiePokemon?.data?.flavor_text_entries[0]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[1]?.flavor_text;

  const texto = especiePokemon?.data?.flavor_text_entries;
  const spanishEntries = texto?.filter((entry) => entry.language.name === "es");

  const getDescription = () => {
    if (generacion === "generation-ix") {
      return paldea;
    } else {
      return spanishEntries?.map((entry) => entry.flavor_text + " ");
    }
  };
  return <div>{getDescription()}</div>;
};

export default GenerationDescription;
