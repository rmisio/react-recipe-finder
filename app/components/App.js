import React, { Component } from "react";
import { Link } from "react-router";

// import RecipeForm from "./RecipeForm.js";
// import RecipeList from "./RecipeList.js";
// import Recipe from "./Recipe.js";
import RecipeStore from "../stores/Recipe.js";

import "../styles/app.scss";

class App extends Component {
  constructor() {
    super();

    this.recipeStore = new RecipeStore();
    // this.state = {...this.getPageState('home')};
  }

  // getRecipes() {
  //   let recipes;

  //   try {
  //     recipes = JSON.parse(localStorage.getItem('recipes'));
  //   } catch (e) {
  //     // pass
  //   }

  //   return recipes || [];    
  // }

  // getRecipe(id) {
  //   if (!id) return;

  //   return this.getRecipes().find((recipe) => {
  //     return recipe.id === id;
  //   });
  // }

  // deleteRecipe(id) {
  //   localStorage.setItem('recipes', JSON.stringify(
  //     this.getRecipes().filter((recipe) => {
  //       return recipe.id !== id;
  //     })
  //   ));
  // }

  getPageState(name, options) {
    let pageComponent;

    switch (name) {
      // case 'home':
      //   pageComponent = <RecipeList recipes={this.getRecipes()} onRecipeClick={this.onRecipeClick.bind(this)} />;
      //   break;      
      case 'add-recipe':
        pageComponent = <RecipeForm onRecipeSave={this.onRecipeSave.bind(this)} />;
        break;
      case 'edit-recipe':
        pageComponent = <RecipeForm recipe={options.recipe} onRecipeSave={this.onRecipeSave.bind(this)} />;
        break;
      // case 'recipe':
      //   pageComponent = <Recipe {...options.recipe}
      //     onEdit={this.onRecipeEdit.bind(this)}
      //     onDelete={this.onRecipeDelete.bind(this)} />;
      //   break;
    }

    return {
      activePageName: name, 
      pageComponent: pageComponent 
    };
  }

  // onHeaderLinkClick(name, e) {  
  //   e.preventDefault();

  //   this.setState({...this.getPageState(name)});    
  // }

  onRecipeEdit(recipeId) {
    this.setState({...this.getPageState('edit-recipe', {recipe: this.getRecipe(recipeId)})});
  }

  onRecipeDelete(recipeId) {
    this.deleteRecipe(recipeId);
    this.setState({...this.getPageState('home')});
  }  

  onRecipeSave(recipe) {
    let recipes = this.getRecipes();

    const index = recipes.findIndex((rec) => {
      return rec.id === recipe.id;
    });

    if (index !== -1) {
      recipes[index] = recipe;
    } else {
      recipes = [...recipes, recipe];
    }

    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    this.setState({...this.getPageState('home')});
  }

  // onRecipeClick(recipe) {
  //   this.setState({...this.getPageState('recipe', {recipe})});
  // }

  render() {
    return (
      <div>
        <header>
          <ul className="clearfix">
            {
              this.props.location.pathname !== '/' ?
                <li><Link to="/">Home</Link></li> : ''
            }
            <li>
              <Link to="/recipe/add" activeClassName="active">Add Recipe</Link>
            </li>
          </ul>
        </header>
        <div className="page-container">
        {/*this.state.pageComponent*/}
        {React.cloneElement(this.props.children, {store: this.recipeStore })}
        </div>
      </div>
    )
  }
}

export default App;