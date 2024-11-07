import { DataTypes, NOW } from "sequelize";
import sequelize from "../common/sequelize/connectdb.sequelize.js";

const likeResModel = sequelize.define(
  "likeRes",
  {
    like_id: {
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
    like_date: {
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
    tableName: "like_res",
    timestamps: false,
    // vì đã có "created_at" và "updated_at" nên ko cần sd timestamp => false
    // nếu db chưa có 2 field này thì để true => mặc định sẽ tạo ra 2 cột createdAt và updatedAt
  }
);

export default likeResModel;
