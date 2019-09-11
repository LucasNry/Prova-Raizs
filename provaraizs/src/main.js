import React, { Component } from "react";
import Home from "./Home/home";
import Nav from "./Components/nav";
import Catalogo from "./Catalogo/catalogo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/catalogo" component={Catalogo} />
          </Switch>
        </div>
      </Router>
    );
  }
}
