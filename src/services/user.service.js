import { userModel } from "../models/models.js";

export const userService = {
  // xử lý logic
  getAllUsers: async () => {
    const result = await userModel.findAll({
      //   attributes: { exclude: ["password"] },
      attributes: [["user_id", "userId"], "email", ["full_name", "fullName"]],
    });

    return result;
  },
};
