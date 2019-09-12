import React from "react";
import "../../styles.css";

let queryString =
  "http://www.gamespot.com/api/articles/?api_key=22a51724c27f8fd4c189c8f6a565eafa0ed7b1a0";

function Contato() {
  return (
    <div className="contato">
      <h1>Sem taxas!</h1>
      <p>
        Todos nos temos aquele jogo velho pegando poeira na prateleira.Porem o
        que nao percebemos e que esses mesmos jogos podem fazer outra pessoa
        feliz e ainda nos ajudar a comprar o jogo do momento.E e isso que
        fazemos, nos ajudamos voce a desapegar do seu velho e levar a alguem que
        va fazer dele o seu jogo novo
      </p>
    </div>
  );
}

export default Contato;
