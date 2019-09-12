import React, { Component } from "react";
import GameCard from "../Components/GameCard";
import d_arrow from "./Images/d_arrow.png";
import PopUp from "../Components/popUp";
import arrow from "./Images/arrow.png";
const firebase = require("firebase/app");

require("firebase/firestore");
let nOfResults = 0;
let popUp;
let gameFilter =
  localStorage.getItem("searchParam") != null
    ? localStorage.getItem("searchParam")
    : "";
localStorage.removeItem("searchParam");
let gameCards = [];
var firebaseConfig = {
  apiKey: "AIzaSyAWdWj7-1qR5jnzXFBobV1Af4jvFwaEOBE",
  projectId: "raizs-9225d",
  appID: "1:287525215273:web:cdabcb0b7000ee7a609038"
};
firebase.initializeApp(firebaseConfig);
let games = [];
let gamesPaginated = [];
let size = 10;
let currentPage = 0;
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
            title: game.data().title,
            platform: game.data().platform,
            release: game.data().release,
            price: game.data().price,
            genre: game.data().genre
          });
        });
        this.sort(games, true);
        if (gameFilter === "") {
          gameCards = [];
          gamesPaginated[0].forEach(game => {
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
        } else {
          console.log(
            `doing Search through Pages with this keyword: ${gameFilter}`
          );
          this.doSearch(gameFilter);
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
      if (window.location.href.includes("catalogo")) {
        gameFilter = document.querySelector(".search-bar").value;
        document.querySelector(".search-bar").value = "";
        this.doSearch(gameFilter);
      }
    });
    document.querySelector(".clear-button").addEventListener("click", () => {
      this.clearFilters();
    });
    // document.querySelector(".close-popup").addEventListener("click", () => {
    //   this.setState({ openPopUP: true });
    //   popUp = "";
    // });
    document.querySelector("#up").addEventListener("click", () => {
      this.sort(true);
      this.forceUpdate();
    });
    document.querySelector("#down").addEventListener("click", () => {
      this.sort(false);
      this.forceUpdate();
    });
    document.querySelector("#next").addEventListener("click", () => {
      if (currentPage < gamesPaginated.length) {
        currentPage++;
        gameCards = [];
        gamesPaginated[currentPage].forEach(game => {
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
      }
      this.forceUpdate();
    });

    document.querySelector("#previous").addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        gameCards = [];
        gamesPaginated[currentPage].forEach(game => {
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
      }
      this.forceUpdate();
    });
    document.querySelectorAll(".game-image").forEach(image => {
      image.addEventListener("click", () => {
        let siblings = image.parentElement.childNodes;
        popUp = <PopUp title={siblings[1].innerHTML} src="" description="a" />;
        console.log(popUp);
        this.forceUpdate();
      });
    });
  }
  sort(crescente) {
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
    gameCards = [];
    gamesPaginated = [];
    for (let i = 0; i < games.length; i += size) {
      gamesPaginated.push(games.slice(i, i + size));
    }
    gamesPaginated[0].forEach(game => {
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
    this.forceUpdate();
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
          if (value >= range[0] && value <= range[1]) {
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
  doSearch() {
    if (gameFilter !== "") {
      gameCards = [];
      games.forEach(game => {
        let values = Object.values(game);
        values.forEach(value => {
          if (typeof value == "string") {
            if (value.toLowerCase().includes(gameFilter.toLowerCase())) {
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

    this.forceUpdate();
  }
  clearFilters() {
    gameFilter = "";
    gameCards = [];
    gamesPaginated[0].forEach(game => {
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
    nOfResults = gamesPaginated[0].length;
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
              <img className="arrow" id="up" src={arrow} />
              <img className="arrow" id="down" src={arrow} />
            </div>
            <br />
            <div className="filter-line">
              <span className="filter-category">Plataforma</span>
              <img className="filter-arrow" src={d_arrow} />
              <div className="filters-dropdown">
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
                <span className="filter-name">R$200 - R$300</span>
              </div>
            </div>
            <div className="filter-line">
              <span className="filter-category">Genero</span>
              <img className="filter-arrow" src={d_arrow} />
              <div className="filters-dropdown">
                <span className="filter-name">Ação</span>
                <span className="filter-name">Terror</span>
                <span className="filter-name">Puzzle</span>
                <span className="filter-name">Corrida</span>
                <span className="filter-name">Esporte</span>
                <span className="filter-name">Aventura</span>
                <span className="filter-name">FPS</span>
                <span className="filter-name">RPG</span>
                <span className="filter-name">Open World</span>
              </div>
            </div>
            <button className="clear-button">Limpar</button>
          </div>
          <div className="card-container">{gameCards}</div>
          <div className="page-navigation">
            <span className="indexes" id="previous">
              Anterior
            </span>
            <span className="indexes" id="next">
              Próxima
            </span>
          </div>
        </div>
      </div>
    );
  }
}
