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
      // TODO: use ===
      return recipe.id == id;
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
        // TODO: use ===
        return recipe.id == rec.id;
      });
    }

    if (curRecipeIndex) {
      this._recipes[curRecipeIndex] = recipe;

      return recipe;
    } else {
      let savedRecipe = { ...recipe, id: (new Date().getTime()).toString() };
      this._recipes = { ...this._recipes, savedRecipe};
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
