import React, { Component } from "react";

import Recipe from "./Recipe.js";

class RecipeController extends Component {
  onRecipeEdit(id) {
    this.props.history.pushState(null, `/recipe/edit/${this.props.params.id}`, null);
  }

  onRecipeDelete(id) {
  }  

  render() {
    return (
      <Recipe {...this.props.store.getRecipe(this.props.params.id)}
        onEdit={this.onRecipeEdit.bind(this)}
        onDelete={this.onRecipeDelete.bind(this)} />
    )
  }
}

export default RecipeController;