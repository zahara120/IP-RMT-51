'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Donation.belongsTo(models.Recipe)
      Donation.belongsTo(models.User)
    }
  }
  Donation.init({
    RecipeId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'RecipeId is required'
        },
        notEmpty:{
          msg: 'RecipeId is required'
        }
      }
    },
    UserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'UserId is required'
        },
        notEmpty:{
          msg: 'UserId is required'
        }
      }
    },
    amount: {
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'amount is required'
        },
        notEmpty:{
          msg: 'amount is required'
        }
      }
    },
    paymentStatus: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg : 'paymentStatus is required'
        },
        notEmpty:{
          msg: 'paymentStatus is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Donation',
  });
  return Donation;
};