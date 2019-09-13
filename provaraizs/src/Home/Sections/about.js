import React, { Component } from "react";
import "../../styles.css";
import lamp from "./Images/lamp.png";

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <div className="about-container">
          <h1>Sobre a Iniciativa</h1>
          <img className="lamp" src={lamp} />
          <p>
            Todos nós temos aquele jogo velho pegando poeira na prateleira.Porém
            o que não percebemos é que esses mesmos jogos podem fazer outra
            pessoa feliz e ainda nos ajudar a comprar o jogo do momento.E é isso
            que fazemos, nós ajudamos você a desapegar do seu velho e levar a
            alguém que vá fazer dele o seu jogo novo
          </p>
        </div>
      </div>
    );
  }
}
