const { Op } = require("sequelize");
const { Recipe, User, Review } = require("../models");
const openAI = require("../helpers/openai");
const gemini = require("../helpers/gemini");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});
class RecipeController {
  static async getRecipe(req, res, next) {
    try {
      const { search, keyword, sort, page } = req.query;
      let data = await Recipe.getAllData(search, keyword, sort, page);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getPopularRecipe(req, res, next) {
    try {
      // search top tree recipe by viewsCount
      let data = await Recipe.findAll({
        where: { viewsCount: { [Op.gt]: 1000 } },
        order: [["viewsCount", "DESC"]],
        limit: 3,
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: Review,
            include: [
              {
                model: User,
                attributes: { exclude: ["password"] },
              },
            ],
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getMyRecipe(req, res, next) {
    try {
      const UserId = req.user.id;
      let data = await Recipe.findAll({
        where: { UserId },
        include: [
          {
            model: Review,
            include: [
              {
                model: User,
                attributes: { exclude: ["password"] },
              },
            ],
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

  static async getAIRecommendedRecipes(req, res, next) {
    try {
      // let responseOpenAI = await openAI();
      // console.log(responseOpenAI, '<<< responseOpenAI');
      const { ingredients } = req.body;
      if (!ingredients) throw { name: "ingredientsIsRequired" };

      let responseGemini = await gemini(ingredients);
      responseGemini = JSON.parse(responseGemini);
      res.status(200).json(responseGemini);
    } catch (error) {
      next(error);
    }
  }

  static async createRecipe(req, res, next) {
    try {
      const UserId = req.user.id;
      let result;

      if (req.file) {
        const img = req.file;
        const imgBase64 = img.buffer.toString("base64");

        result = await cloudinary.uploader.upload(
          `data:${img.mimetype};base64,${imgBase64}`
        );
      }

      let { title, description, ingredients, steps, cookTime } = req.body;
      let data = await Recipe.create({
        title,
        description,
        ingredients,
        steps,
        cookTime,
        UserId,
        imageUrl: result?.secure_url,
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
      let result;

      if (req.file) {
        const img = req.file;
        
        const imgBase64 = img.buffer.toString("base64");

        result = await cloudinary.uploader.upload(
          `data:${img.mimetype};base64,${imgBase64}`
        );
      }

      let recipe = await Recipe.findByPk(id);
      if (!recipe) throw { name: "notFound" };

      let data = await recipe.update({
        title,
        description,
        ingredients,
        steps,
        cookTime,
        imageUrl: result?.secure_url,
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

      await data.destroy();

      res.status(200).json({ message: "Recipe has been deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async addReview(req, res, next) {
    try {
      const { id } = req.params;
      const UserId = req.user.id;
      const { rating, comment } = req.body;

      let recipe = await Recipe.findByPk(id);
      if (!recipe) throw { name: "notFound" };

      await Review.create({ rating, comment, RecipeId: id, UserId });
      res.status(201).json({ message: "Review has been added" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RecipeController;
