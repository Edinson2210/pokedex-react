import css from "./cardList.module.scss";
import { useNavigate } from "react-router-dom";
import { usePokemonData, usePokemonSpecies } from "../../../hooks";

export default function CardList({ card }) {
  const itemPokemon = usePokemonData(card?.name);
  const especiePokemon = usePokemonSpecies(card?.url);

  let pokeID = itemPokemon?.id?.toString();
  if (pokeID?.length === 1) {
    pokeID = `00${pokeID}`;
  } else if (pokeID?.length === 2) {
    pokeID = `0${pokeID}`;
  }

  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <div key={itemPokemon.id} className={css.card}>
      <div className={`bg-${especiePokemon?.color} ${css.sub_card}`}>
        <div className={css.div_id}>
          <strong className={css.id_card}>#{pokeID}</strong>
        </div>
        <div className={css.div_img}>
          <img
            className={css.img_poke}
            src={
              itemPokemon?.sprites?.other["dream_world"]?.front_default ||
              itemPokemon?.sprites?.other["official-artwork"]?.front_default
            }
            alt="pokemon"
            onClick={() => handleNavigate(itemPokemon.id)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={css.div_name}>
          <strong className={css.name_card}>{itemPokemon?.name}</strong>
        </div>
      </div>
    </div>
  );
}
