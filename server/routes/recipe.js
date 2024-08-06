const RecipeController = require("../controllers/recipeController");
const authentication = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const recipe = require("express").Router();

recipe.get("/", RecipeController.getRecipe);
recipe.get("/:id", RecipeController.getRecipeById);

// authentication
recipe.use(authentication);
recipe.post("/", RecipeController.createRecipe);

// authorization
recipe.put("/:id", authorization, RecipeController.updateRecipe);
recipe.delete("/:id", authorization, RecipeController.deleteRecipe);

module.exports = recipe;
