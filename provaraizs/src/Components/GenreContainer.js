import React from "react";

export default class GenreContainer extends React.Component {
  componentDidMount() {
    this.filter.addEventListener("click", () => {
      if (!window.location.href.includes("catalogo")) {
        if (this.props.name == "PS4") {
          localStorage.setItem("searchParam", "Playstation 4");
          localStorage.setItem("searchType", "filter");
          window.location.href += "catalogo";
        } else if (this.props.name == "Switch") {
          localStorage.setItem("searchParam", "Nintendo " + this.props.name);
          localStorage.setItem("searchType", "filter");
          window.location.href += "catalogo";
        } else {
          localStorage.setItem("searchParam", this.props.name);
          localStorage.setItem("searchType", "filter");
          window.location.href += "catalogo";
        }
      }
    });
  }

  render() {
    return (
      <div ref={a => (this.filter = a)} className="genre-container">
        <img className="genre-icon" src={this.props.image} />
        <span className="genre-title">{this.props.name}</span>
      </div>
    );
  }
}
