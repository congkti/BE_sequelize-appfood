import { DataTypes, NOW } from "sequelize";
import sequelize from "../common/sequelize/connectdb.sequelize.js";

const restaurantModel = sequelize.define(
  "Restaurant",
  {
    res_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    res_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    res_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    res_desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
  { tableName: "restaurant", timestamps: false } // đã có 'created_at' và 'updated_at' -> false
);

export default restaurantModel;
