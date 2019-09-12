import React from "react";

const PopUp = props => {
  return (
    <div>
      <div className="popUp"></div>
      <div className="content">
        <img className="popup-image" src={props.src} />
        <br />
        <br />
        <h1 className="popup-title">{props.title}</h1>
        <br />
        <br />
        <span className="popup-description">{props.description}</span>
        <br />
        <br />
        <div className="popup-info-cont">
          <span className="game-platform">Plataforma: {props.platform}</span>
          <span className="game-platform">Genero: {props.genre}</span>
          <span className="game-release">Lancamento: {props.release}</span>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
