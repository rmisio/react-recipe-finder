import React, { Component } from "react";

import RecipeForm from "./RecipeForm.js";

class RecipeFormController extends Component {
  onRecipeSave(recipe) {
    this.props.store.saveRecipe(recipe);
    this.props.history.pushState(null, '/', null);
  }

  render() {
    let recipeForm = this.props.params.id ?
      <RecipeForm recipe={this.props.store.getRecipe(this.props.params.id)}
        onRecipeSave={this.onRecipeSave.bind(this)} /> :
      <RecipeForm onRecipeSave={this.onRecipeSave.bind(this)} />;

    return (
      <div>
        {recipeForm}
      </div>
    )
  }
}

export default RecipeFormController;