//    PROVA PRATICA DE LUCAS DOMINGUES ASSUMPCAO NERY PARA A Raizs

// Imports
import React, { Component } from "react";
import GameCard from "../Components/GameCard";
import d_arrow from "./Images/baseline_arrow_drop_down_black_18dp.png";
import arrow from "./Images/arrow.png";
const firebase = require("firebase/app");
require("firebase/firestore");

// Variable Declaration

let nOfResults = 0;
let popUp;
console.log(localStorage.getItem("searchParam"));
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
let games = [];
let gamesPaginated = [];
let size = 10;
let currentPage = 0;
let searchType = localStorage.getItem("searchType");

//Initialize Firebase App
firebase.initializeApp(firebaseConfig);

export default class Catalogo extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, Cards: [] };
  }

  componentDidMount() {
    //Clear games variable to receive data from DB
    games = [];

    //Send request to Firebase and store the results
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
        //Sorts the data in ascending order by default and paginates the Games based on the established size
        this.Sort(games, true);
        //Renders all games(with the page limit) if the filter is empty, if it's not it shows the search results
        if (gameFilter === "") {
          currentPage = 0;
          gameCards = [];

          //Renders the first 10 games
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
          nOfResults = games.length;
        } else {
          if (searchType != null && searchType == "search") {
            this.doSearch(gameFilter);
          }
          if (searchType != null && searchType == "filter") {
            this.Filter();
          }
        }

        //Re-render the page with the content gathered
        this.setState({ loaded: true });
      });

    //Dropdown menus functionality
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

    //Filters bar functionality
    document.querySelectorAll(".filter-name").forEach(filter => {
      filter.addEventListener("click", () => {
        gameFilter = filter.innerHTML;
        this.Filter();
      });
    });

    //Search functionality within the catalog page
    document.querySelector(".search-button").addEventListener("click", () => {
      if (window.location.href.includes("catalogo")) {
        gameFilter = document.querySelector(".search-bar").value;
        document.querySelector(".search-bar").value = "";
        this.doSearch(gameFilter);
      }
    });

    //Clear Filters functionality
    document.querySelector(".clear-button").addEventListener("click", () => {
      this.clearFilters();
    });

    //Display games in ascending order
    document.querySelector("#up").addEventListener("click", () => {
      this.Sort(true);
      this.forceUpdate();
    });

    //Display games in descending order
    document.querySelector("#down").addEventListener("click", () => {
      this.Sort(false);
      this.forceUpdate();
    });

    //Loads the next card page
    document.querySelector("#next").addEventListener("click", () => {
      if (currentPage < gamesPaginated.length - 1) {
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
      this.setState({ Cards: gameCards });
    });

    //Loads the previous card page
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
      this.setState({ Cards: gameCards });
    });
  }

  //Sorting function, works for both ascending and descending order
  Sort = crescente => {
    currentPage = 0;
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
    this.setState({ Cards: gameCards });
  };

  //Filtering function
  Filter = () => {
    nOfResults = 0;
    gameCards = [];
    let range = [];
    try {
      range = gameFilter.match(/\d+/g).map(Number);
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
      this.setState({ Cards: gameCards });
    }
    if (range.length <= 1) {
      nOfResults = 0;
      gameCards = [];
      games.forEach(game => {
        let values = Object.values(game);
        values.forEach(value => {
          if (value == gameFilter) {
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
      this.setState({ Cards: gameCards });
    }
  };

  //Search Function
  doSearch = () => {
    if (gameFilter !== "") {
      gameCards = [];
      nOfResults = 0;
      games.forEach(game => {
        if (game.title.toLowerCase().includes(gameFilter.toLowerCase())) {
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
    }

    this.setState({ Cards: gameCards });
  };

  //Clear Filters function, resets the filters
  clearFilters = () => {
    gameFilter = "";
    gameCards = [];
    currentPage = 0;
    this.Sort(true);
    nOfResults = games.length;
  };

  render() {
    return (
      <div>
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
              <span className="filter-category">Preço</span>
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
              <span className="filter-category">Gênero</span>
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
