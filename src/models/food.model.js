import { DataTypes, NOW } from "sequelize";
import sequelize from "../common/sequelize/connectdb.sequelize.js";

// food-type
export const foodTypeModel = sequelize.define(
  "foodTypes",
  {
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  { tableName: "food_types", timestamps: false } // đã có 'created_at' và 'updated_at' -> false
);

// food
export const foodModel = sequelize.define(
  "Foods",
  {
    food_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    food_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    food_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    food_price: {
      type: DataTypes.FLOAT,
    },
    food_desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "food_types",
        type: "type_id",
      },
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
      onUpdate: NOW,
    },
  },
  { tableName: "food", timestamps: false } // đã có 'created_at' và 'updated_at' -> false
);
