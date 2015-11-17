import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'

import App from "./components/App";
import RecipeListController from "./components/RecipeListController";
import RecipeController from "./components/RecipeController";
import RecipeFormController from "./components/RecipeFormController";

import "normalize.css/normalize.css";

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={RecipeListController} />
      <Route path="/recipe/add" component={RecipeFormController} />
      <Route path="/recipe/:id" component={RecipeController} />
      <Route path="/recipe/edit/:id" component={RecipeFormController} />
    </Route>
  </Router>
), document.getElementById("app"));