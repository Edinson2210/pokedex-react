import React, { useEffect, useState } from "react";
import css from "./layout.module.scss";
import { Header } from "../header/Header";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import { URL_POKEMON } from "../../../api/apiRest";
import Card from "../list/CardList";

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [xpage, setXpage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const api = async () => {
      const limit = 25;
      const xp = (xpage - 1) * limit;
      const apiPoke = await axios.get(
        `${URL_POKEMON}/?offset=${xp}&limit=${limit}`
      );

      setArrayPokemon(apiPoke.data.results);
    };

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

  const filterPokemon =
    search.length > 0
      ? globalPokemon?.filter((pokemon) => pokemon?.name?.includes(search))
      : arrayPokemon;

  const obtenerSearch = (e) => {
    const texto = e.toLowerCase();
    setSearch(texto);
    setXpage(xpage);
  };

  const arrayPage = Array.from({ length: 41 }, (_, i) => i + 1);
  const selectPage = arrayPage.map((page) => {
    return <option key={page}>{page}</option>;
  });
  const showError = filterPokemon.length === 0 && search.length > 0;

  return (
    <div className={css.layout}>
      <Header obtenerSearch={obtenerSearch} />

      <div className={css.card_content}>
        {filterPokemon.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>

      <section className={css.section_pagination}>
        <div className={css.div_pagination}>
          <span
            className={css.item_izquierdo}
            onClick={() => {
              setXpage(1);
              scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <FaIcons.FaAngleDoubleLeft />
          </span>
          <span
            className={css.item_izquierdo}
            onClick={() => {
              if (xpage > 1) setXpage(xpage - 1);
              scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <FaIcons.FaAngleLeft />
          </span>
          <select
            className={css.item}
            value={xpage}
            onClick={scrollTo({ top: 0, behavior: "smooth" })}
            onChange={(e) => setXpage(Number(e.target.value))}
          >
            {" "}
            {selectPage}
          </select>
          <span className={css.item}> DE </span>
          <span className={css.item}> {41} </span>
          <span
            className={css.item_derecho}
            onClick={() => {
              if (xpage < 41) setXpage(xpage + 1);
              scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <FaIcons.FaAngleRight />
          </span>
          <span
            className={css.item_derecho}
            onClick={() => {
              setXpage(41);
              scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <FaIcons.FaAngleDoubleRight />
          </span>
        </div>
      </section>

      <div
        className={css.div_error}
        style={{ display: showError ? "" : "none" }}
      >
        Haz fallado como entrenador Pokemon porque <b> "{search}" </b> no
        existe.
      </div>
    </div>
  );
}
