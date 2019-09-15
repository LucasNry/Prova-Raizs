import React, { Component } from "react";
import GenreContainer from "../../Components/GenreContainer";
import "../../styles.css";
import xone from "./Images/xone.png";
import ps4 from "./Images/ps4.png";
import nSwitch from "./Images/nSwitch.png";

export default class Destaque extends Component {
  render() {
    return (
      <div className="main">
        <span className="destaque-title">Plataformas</span>
        <div className="genres-container">
          <GenreContainer ref="platforms" name="PS4" image={ps4} />
          <GenreContainer ref="platforms" name="Xbox One" image={xone} />
          <GenreContainer ref="platforms" name="Switch" image={nSwitch} />
        </div>
      </div>
    );
  }
}
