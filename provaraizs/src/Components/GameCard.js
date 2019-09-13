import React from "react";
import PopUp from "../Components/popUp";
const firebase = require("firebase/app");
require("firebase/firestore");

export default class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, description: "", genre: "" };
  }

  componentDidMount() {
    //Opens pop-up
    this.main.addEventListener("click", () => {
      this.setState({
        show: true
      });
      const DB = firebase.firestore();
      DB.collection("Games")
        .get()
        .then(query => {
          query.forEach(game => {
            if (this.props.title === game.data().title) {
              this.setState({
                genre: game.data().genre,
                description: game.data().description
              });
            }
          });
        });
    });
  }
  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div ref={e => (this.main = e)} className="game-card">
        <PopUp
          src={this.props.image}
          title={this.props.title}
          description={this.state.description}
          platform={this.props.platform}
          release={this.props.release}
          genre={this.state.genre}
          handleClose={this.handleClose}
          show={this.state.show}
          price={"R$ " + this.props.price}
        />
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
          {/* <span className="game-release">Lancamento: {this.props.release}</span> */}
        </div>
        <br />
        <br />
        <span className="game-price">R$ {this.props.price}</span>
      </div>
    );
  }
}
