import { responseSuccess } from "../common/helpers/response.helper.js";
import { orderService } from "../services/order.service.js";

export const orderController = {
  newOrder: async function (req, res, next) {
    try {
      const result = await orderService.newOrder(req);
      const response = responseSuccess(
        result.data,
        result.message,
        result.code,
        result.status
      );
      res.status(response.code).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Lỗi máy chủ khi xử lý Tạo đơn hàng mới" });
    }
  },
};
