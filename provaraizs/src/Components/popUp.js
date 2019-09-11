import React from "react";
import close from "./Images/close.png";
// import { Container } from './styles';

const PopUp = props => {
  return (
    <div className="popUp">
      <img className="close-popup" src={close} />
      <div className="content">
        <img className="game-image" src={props.src} />
        <br />
        <br />
        <h1 className="popup-title">{props.title}</h1>
        <br />
        <br />
        <span className="popup-description">{props.description}</span>
        <br />
        <br />
        <div className="popup-info-cont">
          <span className="game-platform">{props.platform}</span>
          <span>|</span>
          <span className="game-release">Lancamento: {props.release}</span>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
