import { DataTypes, NOW } from "sequelize";
import sequelize from "../common/sequelize/connectdb.sequelize.js";

const orderModel = sequelize.define(
  "Order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    promo_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    arr_sub_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        type: "user_id",
      },
    },
    food_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "food",
        type: "food_id",
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
  { tableName: "orders", timestamps: false } // đã có 'created_at' và 'updated_at' -> false
);

export default orderModel;
