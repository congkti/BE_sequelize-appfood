import {
  userModel,
  foodTypeModel,
  foodModel,
  orderModel,
} from "../models/models.js";

export const orderService = {
  newOrder: async function (req) {
    // {user_id, food_id, order_amount, promo_code, arr_sub_id}
    const { userId, foodId, orderAmount, promoCode, arrSubId } = req.body;
    // check request body
    if (!userId || !foodId || !orderAmount) {
      return {
        data: null,
        message: "Thiếu dữ liệu request",
        code: 400,
        status: "Missing request",
      };
    }

    const newOrder = await orderModel.create({
      user_id: userId,
      food_id: foodId,
      order_amount: orderAmount,
      promo_code: promoCode || "",
      arr_sub_id: arrSubId || null,
    });
    const resData = await orderModel.findOne({
      where: {
        user_id: userId,
        food_id: foodId,
        order_id: newOrder.order_id,
      },
      attributes: [
        ["order_id", "orderId"],
        ["user_id", "userId"],
        ["promo_code", "promoCode"],
        ["food_id", "foodId"],
        ["arr_sub_id", "arrSubId"],
        ["order_amount", "orderAmount"],
        ["created_at", "createdDate"],
        ["updated_at", "updatedDate"],
      ],
    });

    return {
      data: resData,
      message: `Tạo đơn hàng thành công`,
      code: 201,
    };
  },
};
