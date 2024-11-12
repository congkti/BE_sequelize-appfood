import { responseSuccess } from "../common/helpers/response.helper.js";
import restaurantService from "../services/restaurant.service.js";

const restaurantController = {
  // for like
  likeRes: async function (req, res, next) {
    try {
      const result = await restaurantService.likeRes(req);
      const response = responseSuccess(
        result.data,
        result.message,
        result.code,
        result.status
      );
      res.status(response.code).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Lỗi máy chủ khi xử lý like" });
    }
  },

  unlikeRes: async function (req, res, next) {
    try {
      const result = await restaurantService.unlikeRes(req);
      const response = responseSuccess(
        result.data,
        result.message,
        result.code,
        result.status
      );
      res.status(response.code).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json("Lỗi máy chủ khi xử lý unlike");
    }
  },

  getLikeByResId: async function (req, res, next) {
    try {
      const result = await restaurantService.getLikeByResId(req);
      const response = responseSuccess(
        result.data,
        result.message,
        result.code,
        result.status
      );
      res.status(response.code).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json("Lỗi máy chủ khi xử lý lấy DS like theo nhà hàng");
    }
  },

  getLikeByUserId: async function (req, res, next) {
    try {
      const result = await restaurantService.getLikeByUserId(req);
      const response = responseSuccess(
        result.data,
        result.message,
        result.code,
        result.status
      );
      res.status(response.code).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json("Lỗi máy chủ khi xử lý lấy DS like của user");
    }
  },

  // for rate
  rateRes: async function (req, res, next) {
    try {
      const result = await restaurantService.rateRes(req);
      const response = responseSuccess(
        result.data,
        result.message,
        result.code,
        result.status
      );
      res.status(response.code).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Lỗi máy chủ khi xử lý Rate nhà hàng" });
    }
  },

  getRateByResId: async function (req, res, next) {
    try {
      const result = await restaurantService.getRateByResId(req);
      const response = responseSuccess(
        result.data,
        result.message,
        result.code,
        result.status
      );
      res.status(response.code).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json("Lỗi máy chủ khi xử lý lấy DS Rate theo nhà hàng");
    }
  },

  getRateByUserId: async function (req, res, next) {
    try {
      const result = await restaurantService.getRateByUserId(req);
      const response = responseSuccess(
        result.data,
        result.message,
        result.code,
        result.status
      );
      res.status(response.code).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json("Lỗi máy chủ khi xử lý lấy DS Rate của user");
    }
  },
};

export default restaurantController;
