import React from "react";

// import { Container } from './styles';

export default class GameDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.myDiv.addEventListener("click", () => {
      if (!window.location.href.includes("catalogo")) {
        localStorage.setItem("searchParam", this.props.title);
        localStorage.setItem("searchType", "search");
        window.location.href += "catalogo";
      }
    });
  }

  render() {
    return (
      <div className="game-display" ref={c => (this.myDiv = c)}>
        <img src={this.props.image} className="game-preview-image" />
        <span>{this.props.title}</span>
      </div>
    );
  }
}
