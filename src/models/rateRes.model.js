import { DataTypes, NOW } from "sequelize";
import sequelize from "../common/sequelize/connectdb.sequelize.js";

const rateResModel = sequelize.define(
  "rateRes",
  {
    rate_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    res_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "restaurant",
        key: "res_id",
      },
    },
    rate_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    rate_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: NOW,
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
  {
    tableName: "rate_res",
    timestamps: false, // đã có 'created_at' và 'updated_at' -> false
  }
);

export default rateResModel;
