'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.hasMany(models.Review)
      Recipe.belongsTo(models.User)
    }
  }
  Recipe.init({
    UserId: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'UserId is required'
        },
        notNull:{
          msg : 'UserId is required'
        }
      }
    },
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'title is required'
        },
        notNull:{
          msg : 'title is required'
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'description is required'
        },
        notNull:{
          msg : 'description is required'
        }
      }
    },
    ingredients: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'ingredients is required'
        },
        notNull:{
          msg : 'ingredients is required'
        }
      }
    },
    steps: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'steps is required'
        },
        notNull:{
          msg : 'steps is required'
        }
      }
    },
    cookTime: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'cookTime is required'
        },
        notNull:{
          msg : 'cookTime is required'
        }
      }
    },
    viewsCount: {
      type:DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};