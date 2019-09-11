import React, { Component } from "react";
import "../../styles.css";
import friends from "./Images/friends.jpg";

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <img className="friends" src={friends} />
        <div className="about-container">
          <h1>Sobre a Iniciativa</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            malesuada, sem non pellentesque tristique, ante leo mollis metus,
            sed viverra diam lacus sed massa. Etiam volutpat venenatis mattis.
            Vivamus in facilisis nunc. Quisque vitae varius nunc, at laoreet
            diam. Donec faucibus ex in tellus interdum vehicula. Sed maximus
            dolor at erat molestie, bibendum lacinia mauris hendrerit. Morbi
            lacinia lorem at tortor efficitur, nec sodales velit mollis. Quisque
            eget facilisis nisi, nec congue augue. Proin malesuada lobortis
            tellus, ut fringilla nisi luctus nec. Vivamus egestas gravida augue.
            Curabitur condimentum euismod interdum. Cras faucibus, sem sed
            auctor euismod, nisi turpis posuere massa, nec eleifend sem ex vitae
            felis. Sed imperdiet egestas aliquam. Quisque lacus felis, faucibus
            a erat vitae, molestie rutrum nisl. Nam nunc diam, congue non auctor
            vel, ornare sed eros. Maecenas bibendum lectus odio, non sagittis mi
            finibus quis. Fusce ut tellus dolor. Donec mi tellus, tempor
            pharetra lectus non, consectetur sodales ex. Duis feugiat sem odio,
            at sodales ipsum ornare in. Sed ullamcorper tincidunt diam, a
            ullamcorper libero posuere in. Vivamus congue augue a mi hendrerit,
            in venenatis diam dictum. Mauris posuere aliquam lectus ac tempus.
            Nullam dapibus ante eu turpis facilisis, nec finibus mi
            sollicitudin. Duis ac eleifend.
          </p>
        </div>
      </div>
    );
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    this.scrollValue = window.scrollY;
    if (this.scrollValue > 1100) {
      document.querySelector(".friends").style.opacity = 0.5;
    } else {
      document.querySelector(".friends").style.opacity = 0;
    }
  };
}
