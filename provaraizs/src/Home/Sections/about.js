import React, { Component } from "react";
import "../../styles.css";
import friends from "./Images/friends.jpg";

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <div className="about-container">
          <h1>Sobre a Iniciativa</h1>
          <p>
            Todos nos temos aquele jogo velho pegando poeira na prateleira.Porem
            o que nao percebemos e que esses mesmos jogos podem fazer outra
            pessoa feliz e ainda nos ajudar a comprar o jogo do momento.E e isso
            que fazemos, nos ajudamos voce a desapegar do seu velho e levar a
            alguem que va fazer dele o seu jogo novo
          </p>
        </div>
      </div>
    );
  }
}
