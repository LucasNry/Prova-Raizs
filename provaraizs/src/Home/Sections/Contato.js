import React from "react";
import "../../styles.css";

let queryString =
  "http://www.gamespot.com/api/articles/?api_key=22a51724c27f8fd4c189c8f6a565eafa0ed7b1a0";

function Contato() {
  return (
    <div className="contato">
      <h1>Filosofia da Empresa</h1>
      <p>
        Acreditamos que todo jogo usado está a um passo de se tornar o jogo novo
        de alguém, por isso nos esforçamos diariamente pra trazer o melhor
        serviço possível
      </p>
    </div>
  );
}

export default Contato;
