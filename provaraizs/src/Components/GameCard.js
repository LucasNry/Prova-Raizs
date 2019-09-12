import React from "react";
import PopUp from "../Components/popUp";
import close from "./Images/close.png";
const firebase = require("firebase/app");
require("firebase/firestore");

let popUp;
let gameFound = {};
let destroy = "";
export default class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { popUp: "" };
  }

  componentDidMount() {
    //Opens pop-up
    this.main.addEventListener("click", () => {
      window.scrollTo(0, 0);
      gameFound = {};
      const DB = firebase.firestore();
      DB.collection("Games")
        .get()
        .then(query => {
          query.forEach(game => {
            if (this.props.title === game.data().title) {
              gameFound = {
                genre: game.data().genre,
                description: game.data().description
              };
            }
          });
          popUp = (
            <PopUp
              src={this.props.image}
              title={this.props.title}
              description={gameFound.description}
              platform={this.props.platform}
              release={this.props.release}
              genre={gameFound.genre}
            />
          );

          this.forceUpdate();
        });
      // destroy = (
      //   <img
      //     ref={a => (this.close = a)}
      //     className="close-popup"
      //     src={close}
      //     alt=""
      //   />
      // );
      // this.forceUpdate();
      //
      // //Closes pop-up - closes but opens it up again - NOT WORKING
      // this.close.addEventListener("click", () => {
      //   popUp = "";
      //   destroy = "";
      //   this.forceUpdate();
      // });
    });
  }

  render() {
    return (
      <div ref={e => (this.main = e)} className="game-card">
        {popUp}
        {destroy}
        <img
          className="game-image"
          ref={img => (this.image = img)}
          src={this.props.image}
          alt=""
        />
        <br />
        <br />
        <h1 className="game-title" ref={title => (this.title = title)}>
          {this.props.title}
        </h1>
        <br />
        <br />
        <div className="game-info-cont">
          <span className="game-platform">{this.props.platform}</span>
          <span>|</span>
          <span className="game-release">Lancamento: {this.props.release}</span>
        </div>
        <br />
        <br />
        <span className="game-price">Preco: R${this.props.price}</span>
      </div>
    );
  }
}
