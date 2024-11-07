import { DataTypes, NOW } from "sequelize";
import sequelize from "../common/sequelize/connectdb.sequelize.js";

const usersModel = sequelize.define(
  "Users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
  { tableName: "users", timestamps: false } // đã có 'created_at' và 'updated_at' -> false
);

export default usersModel;
