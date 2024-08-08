const RecipeController = require("../controllers/recipeController");
const authentication = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const upload = require('../helpers/multer')
const recipe = require("express").Router();

recipe.get("/", RecipeController.getRecipe);
recipe.get("/popular", RecipeController.getPopularRecipe);
recipe.get("/my-recipe", authentication, RecipeController.getMyRecipe);
recipe.get("/:id", RecipeController.getRecipeById);

// authentication
recipe.use(authentication);
recipe.post("/", upload.single('img'), RecipeController.createRecipe);

// AI
recipe.post("/ai-search", RecipeController.getAIRecommendedRecipes);

// review
recipe.post("/:id/reviews", RecipeController.addReview);

// authorization
recipe.put("/:id", authorization, upload.single('img'), RecipeController.updateRecipe);
recipe.delete("/:id", authorization, RecipeController.deleteRecipe);

module.exports = recipe;
