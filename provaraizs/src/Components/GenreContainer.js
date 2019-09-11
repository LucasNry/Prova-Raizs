import React from "react";

// import { Container } from './styles';

const GenreContainer = props => {
  return (
    <div className="genre-container">
      <img className="genre-icon" src={props.image} />
      <span className="genre-title">{props.name}</span>
    </div>
  );
};

export default GenreContainer;
