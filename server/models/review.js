'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Recipe)
      Review.belongsTo(models.User)
    }
  }
  Review.init({
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'RecipeId is required'
        },
        notNull:{
          msg : 'RecipeId is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
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
    rating: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'rating is required'
        },
        notNull:{
          msg : 'rating is required'
        }
      }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'comment is required'
        },
        notNull:{
          msg : 'comment is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};