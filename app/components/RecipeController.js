import React, { Component } from "react";

import Recipe from "./Recipe.js";

class RecipeController extends Component {
  constructor(props) {
    super(props);
  }

  onRecipeEdit(id) {
    this.props.history.pushState(null, `/recipe/edit/${this.props.params.id}`, null);
  }

  onRecipeDelete(id) {
    this.props.store.deleteRecipe(id);
    this.props.history.pushState(null, '/', null);
  }

  setRecipeInState(id) {
    const recipe = this.props.store.getRecipe(id);

    if (!recipe) {
      window.sorry = this.props;
      alert('Sorry Yo, that recipe does not exist.');
      this.props.history.replaceState(null, '/', null);
    } else {
      this.setState({ recipe });
    }
  }

  componentWillMount() {
    this.setRecipeInState(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setRecipeInState(nextProps.params.id);
  }

  render() {
    const recipe = this.state && this.state.recipe ?
      <Recipe {...this.state.recipe}
        onEdit={this.onRecipeEdit.bind(this)}
        onDelete={this.onRecipeDelete.bind(this)} /> :
      '';

    return (
      <div>{recipe}</div>
    )
  }
}

export default RecipeController;