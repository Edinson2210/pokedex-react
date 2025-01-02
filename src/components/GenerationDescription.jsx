import React from "react";
import { usePokemonData, usePokemonSpecies } from "../hooks";

const GenerationDescription = ({ generacion }) => {
  const url = window.location.pathname.split("/")[2];
  const itemPokemon = usePokemonData(url);
  const especiePokemon = usePokemonSpecies(itemPokemon?.species?.url);
  const kanto =
    especiePokemon?.data?.flavor_text_entries[26]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[34]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[42]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[59]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[79]?.flavor_text;
  const jotho =
    especiePokemon?.data?.flavor_text_entries[23]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[31]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[39]?.flavor_text;
  const hoenn =
    especiePokemon?.data?.flavor_text_entries[20]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[28]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[36]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[44]?.flavor_text;
  const sinnoh =
    especiePokemon?.data?.flavor_text_entries[15]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[23]?.flavor_text;
  const teselia =
    especiePokemon?.data?.flavor_text_entries[10]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[18]?.flavor_text;
  const kalos =
    especiePokemon?.data?.flavor_text_entries[4]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[12]?.flavor_text;
  const alola =
    especiePokemon?.data?.flavor_text_entries[5]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[15]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[25]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[35]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[45]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[55]?.flavor_text;
  const galar =
    especiePokemon?.data?.flavor_text_entries[5]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[15]?.flavor_text;
  const paldea =
    especiePokemon?.data?.flavor_text_entries[0]?.flavor_text +
    " " +
    especiePokemon?.data?.flavor_text_entries[1]?.flavor_text;

  const descriptions = () => {
    switch (generacion) {
      case "generation-i":
        return kanto;
        break;
      case "generation-ii":
        return jotho;
        break;
      case "generation-iii":
        return hoenn;
        break;
      case "generation-iv":
        return sinnoh;
        break;
      case "generation-v":
        return teselia;
        break;
      case "generation-vi":
        return kalos;
        break;
      case "generation-vii":
        return alola;
        break;
      case "generation-viii":
        return galar;
        break;
      case "generation-ix":
        return paldea;
        break;

      default:
        break;
    }
  };
  return <div>{descriptions()}</div>;
};

export default GenerationDescription;
