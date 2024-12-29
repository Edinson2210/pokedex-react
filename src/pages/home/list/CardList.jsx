import css from "./cardList.module.scss";
import { useNavigate } from "react-router-dom";
import {
  usePokemonData,
  usePokemonEvolutions,
  usePokemonSpecies,
} from "../../../hooks";

export default function Card({ card }) {
  const itemPokemon = usePokemonData(card.name);
  const especiePokemon = usePokemonSpecies(card.url);
  const evoluciones = usePokemonEvolutions(especiePokemon);

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
      <img
        className={css.img_poke}
        src={itemPokemon?.sprites?.other["home"]?.front_default}
        alt="pokemon"
        onClick={() => handleNavigate(itemPokemon.id)}
        style={{ cursor: "pointer" }}
      />
      <div className={`bg-${especiePokemon?.color} ${css.sub_card}`}>
        <strong className={css.id_card}>#{pokeID}</strong>
        <strong className={css.name_card}>{itemPokemon.name}</strong>
        <h4 className={css.altura_poke}>Altura: {itemPokemon.height} cm</h4>
        <h4 className={css.peso_poke}>Peso: {itemPokemon.weight} Kg</h4>
        <h4 className={css.habitat_poke}>Habitat: {especiePokemon?.habitat}</h4>
        <div className={css.div_stats}>
          {itemPokemon?.stats?.map((stat, index) => {
            return (
              <h6 key={index} className={css.item_stats}>
                <span className={css.name}>{stat.stat.name}</span>
                <progress value={stat.base_stat} max={110}></progress>
                <span className={css.numero}>{stat.base_stat}</span>
              </h6>
            );
          })}
        </div>
        <div className={css.div_type_color}>
          {itemPokemon?.types?.map((type, index) => {
            return (
              <h6
                key={index}
                className={`color-${type.type.name} ${css.color_type}`}
              >
                {type.type.name}
              </h6>
            );
          })}
        </div>
        <div className={css.div_evolucion}>
          {evoluciones?.map((evo, index) => {
            return (
              <div key={index} className={css.item_evo}>
                <img
                  src={evo.img}
                  alt="evo"
                  className={css.img}
                  onClick={() => handleNavigate(evo.id)}
                  style={{ cursor: "pointer" }}
                />
                <h6>{evo.name}</h6>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
