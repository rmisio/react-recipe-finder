import React, { Component } from "react";

import "../styles/recipe.scss";

class Recipe extends Component {
  constructor(props) {
    super(props);
  }

  onEditClick(e) {
    this.props.onEdit(this.props.id);
  }

  onDeleteClick(e) {
    this.props.onDelete(this.props.id);
  }  

  render() {
    return (
      <article className="recipe">
        <h1>{this.props.title}</h1>
        <button onClick={this.onEditClick.bind(this)}>Edit</button>
        <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
        <img src={this.props.photo.src} />
        <p>{this.props.description}</p>
      </article>
    )
  }
}

export default Recipe;