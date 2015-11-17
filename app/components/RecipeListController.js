import React, { Component } from "react";

import RecipeList from "./RecipeList.js";

class RecipeListController extends Component {
  onRecipeClick(recipe) {
    this.props.history.pushState(null, `/recipe/${recipe.id}`, null);
  }

  render() {
    return (
      <RecipeList recipes={this.props.store.getRecipes()} onRecipeClick={this.onRecipeClick.bind(this)} />
    )
  }
}

export default RecipeListController;