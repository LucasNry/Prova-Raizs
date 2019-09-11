import React from "react";
import "../styles.css";
import Destaque from "./Sections/destaque";
import About from "./Sections/about";
import Contato from "./Sections/Contato";

function Home() {
  return (
    <div>
      <Destaque />
      <Contato />
      <About />
    </div>
  );
}

export default Home;
