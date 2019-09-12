import React from "react";
import GenreContainer from "../../Components/GenreContainer";
import "../../styles.css";
import xone from "./Images/xone.png";
import ps4 from "./Images/ps4.png";
import nSwitch from "./Images/nSwitch.png";

export default class Destaque extends React.Component {
  componentDidMount() {
    // fetch(
    //   "http://www.gamespot.com/api/articles/?api_key=22a51724c27f8fd4c189c8f6a565eafa0ed7b1a0&format=json",
    //   {
    //     method: "GET",
    //     mode: "no-cors"
    //   }
    // ).then(res => );
    console.log(this.refs.platforms);
    this.refs.platforms.addEventListener("click", () => {
      if (window.location.href[20] == "0") {
        localStorage.setItem(
          "searchParam",
          this.refs.platforms.childNodes[1].innerHTML
        );
        window.location.href += "catalogo";
      }
    });
  }

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
