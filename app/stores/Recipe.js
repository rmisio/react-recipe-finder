class RecipeStore {
  constructor() {
    try {
      this._recipes = JSON.parse(localStorage.getItem(RecipeStore.localStorageName));
    } catch (e) {
      // pass
    }

    this._recipes = this._recipes || [];
  }

  getRecipes() {
    return this._recipes;    
  }

  getRecipe(id) {
    if (!id) return;

    return this._recipes.find((recipe) => {
      return recipe.id === id;
    });
  }

  deleteRecipe(id) {
    this._recipes = this._recipes.filter((recipe) => {
      return recipe.id !== id;
    });

    this._saveRecipes();
  }

  saveRecipe(recipe) {
    let curRecipeIndex;

    if (!recipe) {
      return;
    }

    if (recipe.id) {
      curRecipeIndex = this._recipes.findIndex((rec) => {
        return recipe.id === rec.id;
      });

      if (curRecipeIndex !== -1) {
        this._recipes[curRecipeIndex] = recipe;
        this._saveRecipes();

        return recipe;
      } else {
        throw new Error('Unable to find the recipe with the given id, ' + recipe.id);
      }
    } else {
      let savedRecipe = { ...recipe, id: (new Date().getTime()).toString() };

      this.meatballs = savedRecipe;

      this._recipes = [ ...this._recipes, savedRecipe];
      this._saveRecipes();

      return savedRecipe;
    }    
  }

  _saveRecipes() {
    localStorage.setItem(RecipeStore.localStorageName, JSON.stringify(this._recipes));
  }
}

RecipeStore.localStorageName = 'recipes';

export default RecipeStore;
