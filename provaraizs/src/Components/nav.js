import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import gamepad from "./Images/gamepad.png";
const Nav = () => {
  return (
    <nav>
      <div className="logo-container">
        <div className="Logo">
          <img className="gamepad" src={gamepad} alt=""></img>
          <span className="logo-title">MyGameStore</span>
        </div>
      </div>
      <div className="input-styles">
        <input
          className="search-bar"
          placeholder="Busque o seu jogo favorito"
        />
        <div className="search-button">
          <img className="search" />
          <span className="search-button-text">Search</span>
        </div>
      </div>
      <div>
        <Link to="/">
          <span className="nav-link">Home</span>
        </Link>
        <Link to="/catalogo">
          <span className="nav-link">Catálogo</span>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
