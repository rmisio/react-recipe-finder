import React, { Component } from "react";

import "../styles/recipe-list.scss";

class RecipeListItem extends Component {
  constructor(props) {
    super(props);
  }

  onRecipeClick(e) {
    this.props.onClick(this.props.recipe)
  }

  render() {
    const photo = this.props.recipe.photo;

    return (
      <li className="hvr-pop" onClick={this.onRecipeClick.bind(this)}>
        <img src={photo.src} className={photo.height > photo.width ? 'portrait' : 'landscape'} />
        <div>
          <h2>{this.props.recipe.title}</h2>
          <p>{this.props.recipe.description}</p>
        </div>
      </li>
    )
  }
}

export default RecipeListItem;