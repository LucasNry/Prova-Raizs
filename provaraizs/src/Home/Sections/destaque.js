import React from "react";
import GenreContainer from "../../Components/GenreContainer";
import "../../styles.css";
import xone from "./Images/xone.png";
import ps4 from "./Images/ps4.png";
import nSwitch from "./Images/nSwitch.png";

export default class Destaque extends React.Component {
  componentDidMount() {
    fetch(
      "http://www.gamespot.com/api/articles/?api_key=22a51724c27f8fd4c189c8f6a565eafa0ed7b1a0&format=json",
      {
        method: "GET",
        mode: "no-cors"
      }
    ).then(res => console.log(res));
  }

  render() {
    return (
      <div className="main">
        <span className="destaque-title">Plataformas</span>
        <div className="genres-container">
          <GenreContainer name="PS4" image={ps4} />
          <GenreContainer name="Xbox One" image={xone} />
          <GenreContainer name="Switch" image={nSwitch} />
        </div>
      </div>
    );
  }
}
