import React, { Component } from "react";
import { Link } from "react-router";

import RecipeStore from "../stores/Recipe.js";

import "../styles/app.scss";

class App extends Component {
  constructor() {
    super();

    this.recipeStore = new RecipeStore();
  }

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
        {React.cloneElement(this.props.children, {store: this.recipeStore })}
        </div>
      </div>
    )
  }
}

export default App;