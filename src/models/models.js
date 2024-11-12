import { foodModel, foodTypeModel } from "./food.model.js";
import likeResModel from "./likeRes.model.js";
import orderModel from "./order.model.js";
import rateResModel from "./rateRes.model.js";
import restaurantModel from "./restaurant.model.js";
import userModel from "./user.model.js";

// Set mối quan hệ model food_types và food (1-N)
foodTypeModel.hasMany(foodModel, { foreignKey: "type_id" });
foodModel.belongsTo(foodTypeModel, { foreignKey: "type_id" });

// Set mối quan hệ model users và orders (1-N)
userModel.hasMany(orderModel, { foreignKey: "user_id" });
orderModel.belongsTo(userModel, { foreignKey: "user_id" });

// Set mối quan hệ model orders và food (1-N)
foodModel.hasMany(orderModel, { foreignKey: "food_id" });
orderModel.belongsTo(foodModel, { foreignKey: "food_id" });

// Set mối quan hệ model users và rate_res (1-N)
userModel.hasMany(rateResModel, { foreignKey: "user_id", as: "userRated" });
rateResModel.belongsTo(userModel, { foreignKey: "user_id", as: "userRated" });

// Set mối quan hệ model restaurant và rate_res (1-N)
restaurantModel.hasMany(rateResModel, {
  foreignKey: "res_id",
  as: "rateRestaurant",
});
rateResModel.belongsTo(restaurantModel, {
  foreignKey: "res_id",
  as: "rateRestaurant",
});

// Set mối quan hệ model users và like_res (1-N)
userModel.hasMany(likeResModel, { foreignKey: "user_id", as: "userLiked" });
likeResModel.belongsTo(userModel, { foreignKey: "user_id", as: "userLiked" });

// Set mối quan hệ model restaurant và like_res (1-N)
restaurantModel.hasMany(likeResModel, {
  foreignKey: "res_id",
  as: "restaurant",
});
likeResModel.belongsTo(restaurantModel, {
  foreignKey: "res_id",
  as: "restaurant",
});

export {
  userModel,
  foodTypeModel,
  foodModel,
  orderModel,
  restaurantModel,
  rateResModel,
  likeResModel,
};
