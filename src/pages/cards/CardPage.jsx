import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import css from "./cardPage.module.scss";
import Card from "../home/list/CardList";
import axios from "axios";
import { URL_POKEMON } from "../../api/apiRest";
import {
  usePokemonData,
  usePokemonEvolutions,
  usePokemonSpecies,
} from "../../hooks";
import * as FaIcons from "react-icons/fa";
import { Header } from "../home/header/Header";
import GenerationDescription from "../../components/GenerationDescription";

export default function CardPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const itemPokemon = usePokemonData(id);
  const especiePokemon = usePokemonSpecies(itemPokemon?.species?.url);
  const evoluciones = usePokemonEvolutions(especiePokemon);

  useEffect(() => {
    const getPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${id}`);
      setPokemon(api.data);
    };
    getPokemon();
  }, [id]);

  let pokeID = itemPokemon?.id?.toString();
  if (pokeID?.length === 1) {
    pokeID = `00${pokeID}`;
  } else if (pokeID?.length === 2) {
    pokeID = `0${pokeID}`;
  }

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };
  const onNavigateHome = () => {
    navigate("/");
  };
  const handleNavigate = (id) => {
    const pokeActive = itemPokemon?.id === Number(id);
    if (!pokeActive) navigate(`/pokemon/${id}`);
  };
  const typeNavigate = (type) => {
    navigate(`/type/${type}`);
  };
  console.log(especiePokemon);

  return (
    <div className={css.container}>
      <div className={css.div_return}>
        <button className={css.button_return} onClick={onNavigateBack}>
          <FaIcons.FaChevronLeft />
        </button>
        <button className={css.button_return} onClick={onNavigateHome}>
          <FaIcons.FaHome />
        </button>
      </div>
      <div key={itemPokemon.id} className={css.card}>
        <img
          className={css.img_poke}
          src={itemPokemon?.sprites?.other["home"]?.front_default}
          alt="pokemon"
        />
        <div className={`bg-${especiePokemon?.color} ${css.sub_card}`}>
          <strong className={css.id_card}>#{pokeID}</strong>
          <strong className={css.name_card}>{itemPokemon.name}</strong>
          <h4 className={css.altura_poke}>Altura: {itemPokemon.height} cm</h4>
          <h4 className={css.peso_poke}>Peso: {itemPokemon.weight} Kg</h4>
          <h4 className={css.habitat_poke}>
            Habitat: {especiePokemon?.habitat}
          </h4>
          <h4 className={css.peso_poke}>
            {especiePokemon.data?.generation.name}
          </h4>
          <h4 className={css.description_poke}>
            Descripción:{" "}
            <GenerationDescription
              generacion={especiePokemon.data?.generation.name}
            />{" "}
          </h4>
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
                  style={{ cursor: "pointer" }}
                  onClick={() => typeNavigate(type.type.name)}
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
                    style={{
                      filter:
                        Number(evo?.id) === itemPokemon?.id
                          ? "brightness(0.5)"
                          : "brightness(1)",
                      cursor: "pointer",
                    }}
                  />
                  <h6>{evo.name}</h6>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
