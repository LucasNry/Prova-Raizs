import React from "react";

// import { Container } from './styles';

const GameCard = props => {
  return (
    <div className="game-card">
      <img className="game-image" src={props.image} alt="" />
      <br />
      <br />
      <h1 className="game-title">{props.title}</h1>
      <br />
      <br />
      <div className="game-info-cont">
        <span className="game-platform">{props.platform}</span>
        <span>|</span>
        <span className="game-release">Lancamento: {props.release}</span>
      </div>
      <br />
      <br />
      <span className="game-price">Preco: R${props.price}</span>
    </div>
  );
};

export default GameCard;
