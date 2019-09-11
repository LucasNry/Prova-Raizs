import React from "react";
import GenreContainer from "../../Components/GenreContainer";
import "../../styles.css";
import puzzle from "./Images/puzzle.png";
import action from "./Images/action.png";
import fps from "./Images/fps.svg";
import racing from "./Images/racing.png";

function Destaque() {
  return (
    <div className="main">
      <span className="destaque-title">Generos em alta</span>
      <div className="genres-container">
        <GenreContainer name="Action" image={action} />
        <GenreContainer name="Puzzle" image={puzzle} />
        <GenreContainer name="FPS" image={fps} />
        <GenreContainer name="Racing" image={racing} />
      </div>
    </div>
  );
}

export default Destaque;
