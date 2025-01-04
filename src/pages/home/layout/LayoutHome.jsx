import React, { useState } from "react";
import css from "./layout.module.scss";
import { Header } from "../header/Header";
import * as FaIcons from "react-icons/fa";
import CardList from "../list/CardList";
import { useGlobalPokemons } from "../../../hooks/useGlobalPokemons";
import { useNavigate } from "react-router-dom";
import { FilterBar } from "../../../components/FilterBar";

export default function LayoutHome() {
  const [search, setSearch] = useState("");
  const { globalPokemon, xpage, setXpage, arrayPokemon } = useGlobalPokemons();

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
  const navigate = useNavigate();

  return (
    <div className={css.layout}>
      <Header obtenerSearch={obtenerSearch} />
      <FilterBar />
      <div className={css.div_content}>
        <div className={css.card_content}>
          {filterPokemon.map((card, index) => {
            return <CardList key={index} card={card} />;
          })}
        </div>
        <div
          className={css.div_error}
          style={{ display: showError ? "" : "none" }}
        >
          Haz fallado como entrenador Pokemon porque <b> "{search}" </b> no
          existe.
        </div>
        <section className={css.section_pagination}>
          <div className={css.div_pagination}>
            <span
              className={css.item_izquierdo}
              onClick={() => {
                setXpage(1);
                navigate(`/?page=${1}`);
                scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <FaIcons.FaAngleDoubleLeft />
            </span>
            <span
              className={css.item_izquierdo}
              onClick={() => {
                if (xpage > 1) {
                  setXpage(xpage - 1);
                  navigate(`/?page=${xpage - 1}`);
                }
                scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <FaIcons.FaAngleLeft />
            </span>
            <select
              className={css.item}
              value={xpage}
              onClick={scrollTo({ top: 0, behavior: "smooth" })}
              onChange={(e) => {
                setXpage(Number(e.target.value));
                navigate(`/?page=${e.target.value}`);
              }}
            >
              {" "}
              {selectPage}
            </select>
            <span className={css.item}> DE </span>
            <span className={css.item}> {41} </span>
            <span
              className={css.item_derecho}
              onClick={() => {
                if (xpage < 41) {
                  setXpage(xpage + 1);
                  navigate(`/?page=${xpage + 1}`);
                }
                scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <FaIcons.FaAngleRight />
            </span>
            <span
              className={css.item_derecho}
              onClick={() => {
                setXpage(41);
                navigate(`/?page=${41}`);
                scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <FaIcons.FaAngleDoubleRight />
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
