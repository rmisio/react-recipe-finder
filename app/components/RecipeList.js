import React, { Component } from "react";

import RecipeListItem from "./RecipeListItem.js";

import "../styles/recipe-list.scss";

class RecipeList extends Component {
  constructor(props) {
    super(props);
  }

  onRecipeClick(recipe) {
    this.props.onRecipeClick(recipe);
  }

  render() {
    return (
      <ul className="recipe-list">
        {this.props.recipes.map((recipe) => {
          return <RecipeListItem key={recipe.id} recipe={recipe} onClick={this.props.onRecipeClick} />
        })}
      </ul>
    )
  }
}

export default RecipeList;