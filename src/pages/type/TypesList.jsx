import React, { useState } from "react";
import css from "./typesList.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { Header } from "../home/header/Header";
import { useFilteredPokemon, usePokemonData } from "../../hooks";
import CardList from "../home/list/CardList";

export default function TypesList() {
  const { type } = useParams();
  const [search, setSearch] = useState("");
  const [tpage, setTpage] = useState(1);
  const filteredPokemon = useFilteredPokemon(type);

  const filterPokemon =
    search.length > 0
      ? filteredPokemon?.filter((pokemon) =>
          pokemon?.data?.name?.includes(search)
        )
      : filteredPokemon?.slice((tpage - 1) * 25, tpage * 25);

  const obtenerSearch = (e) => {
    const texto = e.toLowerCase();
    setSearch(texto);
    setTpage(tpage);
  };
  const arrayPage = Array.from(
    { length: filteredPokemon.length / 25 },
    (_, i) => i + 1
  );
  const selectPage = arrayPage.map((page) => {
    return <option key={page}>{page}</option>;
  });
  const showError = filterPokemon.length === 0 && search.length > 0;
  const navigate = useNavigate();

  return (
    <div className={css.layout}>
      <Header obtenerSearch={obtenerSearch} />
      <div className={css.div_content}>
        <div className={css.card_content}>
          {filterPokemon?.map((pokemon) => (
            <CardList key={pokemon.id} card={pokemon.data.species} />
          ))}
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
                setTpage(1);
                navigate(`/type/${type}?page=${1}`);
                scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <FaIcons.FaAngleDoubleLeft />
            </span>
            <span
              className={css.item_izquierdo}
              onClick={() => {
                if (tpage > 1) {
                  setTpage(tpage - 1);
                  navigate(`/type/${type}?page=${tpage - 1}`);
                }
                scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <FaIcons.FaAngleLeft />
            </span>
            <select
              className={css.item}
              value={tpage}
              onClick={scrollTo({ top: 0, behavior: "smooth" })}
              onChange={(e) => {
                setTpage(Number(e.target.value));
                navigate(`/type/${type}?page=${e.target.value}`);
              }}
            >
              {" "}
              {selectPage}
            </select>
            <span className={css.item}> DE </span>
            <span className={css.item}>
              {" "}
              {Math.floor(filteredPokemon.length / 25)}{" "}
            </span>
            <span
              className={css.item_derecho}
              onClick={() => {
                if (tpage < filteredPokemon.length / 25) {
                  setTpage(tpage + 1);
                  navigate(`/type/${type}?page=${tpage + 1}`);
                }
                scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <FaIcons.FaAngleRight />
            </span>
            <span
              className={css.item_derecho}
              onClick={() => {
                setTpage(Math.floor(filteredPokemon.length / 25));
                navigate(
                  `/type/${type}?page=${Math.floor(
                    filteredPokemon.length / 25
                  )}`
                );
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
