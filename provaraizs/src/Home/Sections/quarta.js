import React, { Component } from "react";
import GameDisplay from "../../Components/gameDisplay";
const firebase = require("firebase/app");
require("firebase/firestore");

let gameDisplays = [];
let games = [];
let gamesData = [];
export default class Quarta extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    gameDisplays = [];
  }

  componentDidMount() {
    gamesData = [];
    const DB = firebase.firestore();
    DB.collection("Games")
      .get()
      .then(query => {
        query.forEach(game => {
          console.log(game.data());
          gamesData.push({
            key: Math.min(Math.random * 999999),
            image: game.data().url,
            title: game.data().title
          });
        });
        gamesData.forEach(data => {
          if (gameDisplays.length < 5) {
            gameDisplays.push(
              <GameDisplay image={data.image} title={data.title} />
            );
          }
        });
        this.setState({ loaded: true });
      });
  }

  render() {
    return (
      <div className="quarta">
        <h1 className="quarta-title">Jogos recem chegados</h1>
        <div className="quarta-text">{gameDisplays}</div>
      </div>
    );
  }
}
