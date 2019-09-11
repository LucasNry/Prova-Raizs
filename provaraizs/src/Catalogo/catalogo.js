import React, { Component } from "react";
import GameCard from "../Components/GameCard";
import d_arrow from "./Images/d_arrow.png";
import PopUp from "../Components/popUp";
const firebase = require("firebase/app");

require("firebase/firestore");
let nOfResults = 0;
let popUp;
let gameFilter = "";
let gameCards = [];
var firebaseConfig = {
  apiKey: "AIzaSyAWdWj7-1qR5jnzXFBobV1Af4jvFwaEOBE",
  projectId: "raizs-9225d",
  appID: "1:287525215273:web:cdabcb0b7000ee7a609038"
};
firebase.initializeApp(firebaseConfig);
let games = [];

export default class Catalogo extends Component {
  constructor(props) {
    super(props);
    this.state = { openPopUp: false, loaded: false };
  }

  componentDidMount() {
    games = [];
    const DB = firebase.firestore();
    DB.collection("Games")
      .get()
      .then(query => {
        query.forEach(game => {
          games.push({
            image: game.data().url,
            title: game.data().Title,
            platform: game.data().Platform,
            release: game.data().release,
            price: game.data().Price,
            genre: game.data().genre
          });
        });
        this.sort(games, true);
        console.log(games);
        gameCards = [];
        if (gameFilter === "") {
          games.forEach(game => {
            gameCards.push(
              <GameCard
                key={Math.min(Math.random() * 999999)}
                image={game.image}
                price={game.price}
                title={game.title}
                release={game.release}
                platform={game.platform}
              />
            );
          });
          nOfResults = games.length;
        }
        this.setState({ loaded: true });
      });
    document.querySelectorAll(".filter-arrow").forEach(arrow => {
      let openDropdown = false;
      arrow.addEventListener("click", event => {
        openDropdown = !openDropdown;
        let parent = arrow.parentElement;
        let dropdown = parent.childNodes[2];
        if (openDropdown) {
          dropdown.style.height =
            dropdown.childNodes.length.toString() * 1.1 + "em";
          dropdown.childNodes.forEach(child => {
            child.style.opacity = "1";
            child.style.visibility = "visible";
          });
          arrow.style.transform = "rotate(180deg)";
        } else {
          dropdown.childNodes.forEach(child => {
            child.style.opacity = "0";
            child.style.visibility = "hidden";
          });
          dropdown.style.height = "0em";
          arrow.style.transform = "rotate(0deg)";
        }
      });
    });

    document.querySelectorAll(".filter-name").forEach(filter => {
      filter.addEventListener("click", () => {
        gameFilter = filter.innerHTML;
        this.Filter(gameFilter);
      });
    });
    document.querySelector(".search-button").addEventListener("click", () => {
      gameFilter = document.querySelector(".search-bar").value;
      document.querySelector(".search-bar").value = "";
      this.doSearch(gameFilter);
    });
    document.querySelector(".clear-button").addEventListener("click", () => {
      this.clearFilters();
    });
    // document.querySelector(".close-popup").addEventListener("click", () => {
    //   this.setState({ openPopUP: true });
    //   popUp = "";
    // });
    document.querySelectorAll(".game-image").forEach(image => {
      image.addEventListener("click", () => {
        let siblings = image.parentElement.childNodes;
        popUp = <PopUp title={siblings[1].innerHTML} src="" description="a" />;
        console.log(popUp);
        this.forceUpdate();
      });
    });
  }
  sort(games, crescente) {
    if (!crescente) {
      for (let i = 0; i < games.length; i++) {
        for (let j = i + 1; j < games.length; j++) {
          if (games[i].price < games[j].price) {
            let intermediate = games[i];
            games[i] = games[j];
            games[j] = intermediate;
          }
        }
      }
    }
    if (crescente) {
      for (let i = 0; i < games.length; i++) {
        for (let j = i + 1; j < games.length; j++) {
          if (games[i].price > games[j].price) {
            let intermediate = games[i];
            games[i] = games[j];
            games[j] = intermediate;
          }
        }
      }
    }
  }
  Filter(searchParam) {
    nOfResults = 0;
    gameCards = [];
    let range = [];
    try {
      range = searchParam.match(/\d+/g).map(Number);
    } catch (error) {
      range = [];
    }
    if (range.length >= 2) {
      games.forEach(game => {
        let values = Object.values(game);
        values.forEach(value => {
          if (value > range[0] && value < range[1]) {
            console.log("Works");
            gameCards.push(
              <GameCard
                key={Math.min(Math.random() * 999999)}
                image={game.image}
                price={game.price}
                title={game.title}
                release={game.release}
                platform={game.platform}
              />
            );
            nOfResults++;
          }
        });
      });
      this.forceUpdate();
    }
    if (range.length <= 1) {
      console.log("Doesn't");
      nOfResults = 0;
      gameCards = [];
      games.forEach(game => {
        let values = Object.values(game);
        values.forEach(value => {
          if (value == searchParam) {
            gameCards.push(
              <GameCard
                key={Math.min(Math.random() * 999999)}
                image={game.image}
                price={game.price}
                title={game.title}
                release={game.release}
                platform={game.platform}
              />
            );
            nOfResults++;
          }
        });
      });
      this.forceUpdate();
    }
  }
  doSearch(searchParam) {
    if (!window.location.href.includes("catalogo")) {
      window.location.href += "catalogo";
      setTimeout(() => {
        if (searchParam !== "") {
          games.forEach(game => {
            let values = Object.values(game);
            values.forEach(value => {
              if (value.toLowerCase().includes(searchParam.toLowerCase())) {
                gameCards.push(
                  <GameCard
                    key={Math.min(Math.random() * 999999)}
                    image={game.image}
                    price={game.price}
                    title={game.title}
                    release={game.release}
                    platform={game.platform}
                  />
                );
                nOfResults++;
              }
            });
          });
        }
      }, 1000);
    } else {
      if (searchParam !== "") {
        nOfResults = 0;
        gameCards = [];
        games.forEach(game => {
          let values = Object.values(game);
          values.forEach(value => {
            if (typeof value == "string") {
              if (value.toLowerCase().includes(searchParam.toLowerCase())) {
                gameCards.push(
                  <GameCard
                    key={Math.min(Math.random() * 999999)}
                    image={game.image}
                    price={game.price}
                    title={game.title}
                    release={game.release}
                    platform={game.platform}
                  />
                );
                nOfResults++;
              }
            }
          });
        });
      }
    }

    this.forceUpdate();
  }
  clearFilters() {
    gameFilter = "";
    gameCards = [];
    games.forEach(game => {
      gameCards.push(
        <GameCard
          key={Math.min(Math.random() * 999999)}
          image={game.image}
          price={game.price}
          title={game.title}
          release={game.release}
          platform={game.platform}
        />
      );
    });
    nOfResults = games.length;
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        {popUp}
        <div className="results-number">
          <span className="results">
            <span className="highlight">{nOfResults}</span> JOGOS ENCONTRADOS
          </span>
        </div>
        <div className="catalogo-bg">
          <div className="filter-column">
            <div className="filter-line">
              <span className="filter-category">Plataforma</span>
              <img className="filter-arrow" src={d_arrow} />
              <div className="filters-dropdown">
                <span className="filter-name">PC</span>
                <span className="filter-name">Playstation 4</span>
                <span className="filter-name">Xbox One</span>
                <span className="filter-name">Nintendo Switch</span>
              </div>
            </div>
            <div className="filter-line">
              <span className="filter-category">Preco</span>
              <img className="filter-arrow" src={d_arrow} />
              <div className="filters-dropdown">
                <span className="filter-name">R$0 - R$50</span>
                <span className="filter-name">R$50 - R$100</span>
                <span className="filter-name">R$100 - R$150</span>
                <span className="filter-name">R$150 - R$200</span>
                <span className="filter-name">R$200 - R$250</span>
                <span className="filter-name">R$250 ou + </span>
              </div>
            </div>
            <div className="filter-line">
              <span className="filter-category">Genero</span>
              <img className="filter-arrow" src={d_arrow} />
              <div className="filters-dropdown">
                <span className="filter-name">Acao</span>
                <span className="filter-name">Puzzle</span>
                <span className="filter-name">Corrida</span>
                <span className="filter-name">Aventura</span>
                <span className="filter-name">FPS</span>
                <span className="filter-name">RPG</span>
                <span className="filter-name">Open World</span>
              </div>
            </div>
            <button className="clear-button">Limpar</button>
          </div>
          <div className="card-container">{gameCards}</div>
        </div>
      </div>
    );
  }
}
