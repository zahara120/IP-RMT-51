"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.hasMany(models.Review);
      Recipe.belongsTo(models.User);
    }
    static async getAllData(search, keyword, sort, page) {
      const limit = 10;
      let pageNumber = 1;
      let queryWhere = {};
      let query = {
        include: [
          {
            model: sequelize.models.User,
            attributes: { exclude: ["password"] },
          },
          {
            model: sequelize.models.Review,
            include: [
              {
                model: sequelize.models.User,
                attributes: { exclude: ["password"] },
              },
            ],
          },
        ],
        where: queryWhere,
        limit: limit,
      };

      if (keyword) {
        queryWhere[search] = {
          [Op.iLike]: `%${keyword}%`,
        };
      }

      if (sort) {
        const sorting = sort[0] === "-" ? "DESC" : "ASC";
        const column = sorting === "DESC" ? sort.slice(1) : sort;
        query.order = [[column, sorting]];
      }

      if (page) {
        if (page.number) {
          pageNumber = +page.number;
          query.offset = (pageNumber - 1) * limit;
        }
      }
      console.log(search, '<<< search');
      
      console.log(queryWhere, '<<< queryWhere');
      

      const { count, rows } = await Recipe.findAndCountAll(query);
      return {
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      };
    }
  }
  Recipe.init(
    {
      UserId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "UserId is required",
          },
          notNull: {
            msg: "UserId is required",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "title is required",
          },
          notNull: {
            msg: "title is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "description is required",
          },
          notNull: {
            msg: "description is required",
          },
        },
      },
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "ingredients is required",
          },
          notNull: {
            msg: "ingredients is required",
          },
        },
      },
      steps: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "steps is required",
          },
          notNull: {
            msg: "steps is required",
          },
        },
      },
      cookTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "cookTime is required",
          },
          notNull: {
            msg: "cookTime is required",
          },
        },
      },
      viewsCount: {
        type: DataTypes.INTEGER,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};
