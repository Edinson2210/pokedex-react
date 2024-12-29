import React from "react";
import css from "./filterBar.module.scss";

export const FilterBar = ({ onTypeChange, onGenerationChange }) => {
  const types = [
    "grass",
    "fire",
    "water",
    "bug",
    "steel",
    "dragon",
    "electric",
    "ghost",
    "fairy",
    "ice",
    "fighting",
    "normal",
    "psychic",
    "rock",
    "dark",
    "ground",
    "poison",
    "flying",
  ];

  const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <div>
        <span>Tipo</span>
        {types.map((type) => (
          <div key={type} className={css.groupType}>
            <input
              type="checkbox"
              onChange={() => onTypeChange(type)}
              name={type}
              id={type}
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
      <div>
        <span>Generación</span>
        {generations.map((gen) => (
          <div key={gen} className={css.groupGeneration}>
            <input
              type="checkbox"
              onChange={() => onGenerationChange(gen)}
              name={`gen${gen}`}
              id={`gen${gen}`}
            />
            <label htmlFor={`gen${gen}`}>Generación {gen}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
