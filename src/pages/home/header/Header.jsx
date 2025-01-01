import React from "react";
import * as FaIcons from "react-icons/fa";
import css from "./header.module.scss";
import logo from "../../../assets/pokemon.png";
import Input from "../../../styles/buttonSearch";
import { useNavigate } from "react-router-dom";

export const Header = ({ obtenerSearch }) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <img
            src={logo}
            alt="logo"
            onClick={goHome}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={css.div_search}>
          <Input obtenerSearch={obtenerSearch} />
        </div>
      </div>
    </nav>
  );
};
