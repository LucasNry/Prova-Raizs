import React from "react";
import ReactDOM from "react-dom";
import "../styles.css";
import Destaque from "./Sections/destaque";
import About from "./Sections/about";
import Contato from "./Sections/Contato";

export default class Home extends React.Component {
  componentDidMount() {
    document.querySelector(".search-button").addEventListener("click", () => {
      if (window.location.href[20] == "0") {
        if (document.querySelector(".search-bar").value !== "") {
          localStorage.setItem(
            "searchParam",
            document.querySelector(".search-bar").value
          );
          localStorage.setItem("searchType", "search");
        } else {
          localStorage.setItem("searchParam", "");
        }
        window.location.href += "catalogo";
      }
    });
  }

  render() {
    return (
      <div>
        <Destaque />
        <Contato />
        <About />
      </div>
    );
  }
}
