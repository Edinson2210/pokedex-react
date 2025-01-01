import axios from "axios";

export const getPokeByType = async (type) => {
  const url = `https://pokeapi.co/api/v2/type/${type}`;
  const response = await axios(url);
  return response.data;
};
