import { foodModel, foodTypeModel } from "./food.model.js";
import likeResModel from "./likeRes.model.js";
import orderModel from "./order.model.js";
import rateResModel from "./rateRes.model.js";
import restaurantModel from "./restaurant.model.js";
import usersModel from "./user.model.js";

// Set mối quan hệ model food_types và food (1-N)
foodTypeModel.hasMany(foodModel, { foreignKey: "type_id" });
foodModel.belongsTo(foodTypeModel, { foreignKey: "type_id" });

// Set mối quan hệ model users và orders (1-N)
usersModel.hasMany(orderModel, { foreignKey: "user_id" });
orderModel.belongsTo(usersModel, { foreignKey: "user_id" });

// Set mối quan hệ model orders và food (1-N)
foodModel.hasMany(orderModel, { foreignKey: "food_id" });
orderModel.belongsTo(foodModel, { foreignKey: "food_id" });

// Set mối quan hệ model users và rate_res (1-N)
usersModel.hasMany(rateResModel, { foreignKey: "user_id" });
rateResModel.belongsTo(usersModel, { foreignKey: "user_id" });

// Set mối quan hệ model restaurant và rate_res (1-N)
restaurantModel.hasMany(rateResModel, { foreignKey: "res_id" });
rateResModel.belongsTo(restaurantModel, { foreignKey: "res_id" });

// Set mối quan hệ model users và like_res (1-N)
usersModel.hasMany(likeResModel, { foreignKey: "user_id" });
likeResModel.belongsTo(usersModel, { foreignKey: "user_id" });

// Set mối quan hệ model restaurant và like_res (1-N)
restaurantModel.hasMany(likeResModel, { foreignKey: "res_id" });
likeResModel.belongsTo(restaurantModel, { foreignKey: "res_id" });

export {
  usersModel,
  foodTypeModel,
  foodModel,
  orderModel,
  restaurantModel,
  rateResModel,
  likeResModel,
};
