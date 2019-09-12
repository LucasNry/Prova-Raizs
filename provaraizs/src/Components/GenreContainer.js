import React from "react";

const GenreContainer = React.forwardRef((props, ref) => (
  <div ref={ref} className="genre-container">
    <img className="genre-icon" src={props.image} />
    <span className="genre-title">{props.name}</span>
  </div>
));

export default GenreContainer;
