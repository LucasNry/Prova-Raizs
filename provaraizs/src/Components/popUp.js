import React from "react";
import close from "./Images/baseline_close_black_18dp.png";

const PopUp = props => {
  return (
    <div className={props.show ? "display-block" : "display-none"}>
      <img
        className="close-popup"
        src={close}
        onClick={props.handleClose}
        alt=""
      />
      <div className="popUp"></div>
      <div className="content">
        <img className="popup-image" src={props.src} />
        <h1 className="popup-title">{props.title}</h1>
        <span className="popup-description">{props.description}</span>
        <div className="popup-info-cont">
          <span className="game-platform">Plataforma: {props.platform}</span>
          <span className="game-platform">Gênero: {props.genre}</span>
          <span className="game-release">Lançamento: {props.release}</span>
        </div>
        <h1 className="popup-title">{props.price}</h1>
      </div>
    </div>
  );
};

export default PopUp;
