import {
  responseError,
  responseSuccess,
} from "../common/helpers/response.helper.js";
import { userService } from "../services/user.service.js";

const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      // lây kết quả trả về từ service
      const result = await userService.getAllUsers();
      const resData = responseSuccess(
        result,
        "Lấy danh sách người dùng thành công",
        200
      );
      // trả kết quả cho FE
      res.status(resData.code).json(resData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default userController;
