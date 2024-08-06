const { Recipe, User } = require("../models");
class RecipeController {
  static async getRecipe(req, res, next) {
    try {
      let data = await Recipe.findAll({
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getRecipeById(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Recipe.findOne({
        where: { id },
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      if (!data) throw { name: "notFound" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createRecipe(req, res, next) {
    try {
      const UserId = req.user.id;

      let { title, description, ingredients, steps, cookTime } = req.body;
      let data = await Recipe.create({
        title,
        description,
        ingredients,
        steps,
        cookTime,
        UserId,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateRecipe(req, res, next) {
    try {
      let { id } = req.params;
      let { title, description, ingredients, steps, cookTime } = req.body;

      let recipe = await Recipe.findByPk(id);
      if (!recipe) throw { name: "notFound" };

      let data = await recipe.update({
        title,
        description,
        ingredients,
        steps,
        cookTime,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteRecipe(req, res, next) {
    try {
      const { id } = req.params;
      let data = await Recipe.findByPk(id);

      if (!data) throw { name: "notFound" };

      await data.destroy()

      res.status(200).json({ message: "Recipe has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RecipeController;
