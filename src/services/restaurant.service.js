import { where } from "sequelize";
import {
  userModel,
  restaurantModel,
  rateResModel,
  likeResModel,
} from "../models/models.js";

const restaurantService = {
  // for like
  likeRes: async function (req, res, next) {
    const { userId, resId } = req.query;
    // check if liked
    const isLiked = await likeResModel.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
    });
    if (isLiked) {
      return {
        data: null,
        message: "User đã like nhà hàng này",
        code: 409,
        status: "Existed",
      };
    }

    await likeResModel.create({
      user_id: userId,
      res_id: resId,
    });

    const resData = await likeResModel.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
      attributes: [
        ["like_id", "likeId"],
        ["user_id", "userId"],
        ["res_id", "resId"],
        ["like_date", "likeDate"],
      ],
    });

    return {
      data: resData,
      message: "Like thành công",
      code: 200,
    };
  },
  unlikeRes: async function (req) {
    const { userId, resId } = req.query;
    // check if liked
    const isLiked = await likeResModel.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
    });
    if (!isLiked) {
      return {
        data: null,
        message: "User chưa like nhà hàng này",
        code: 404,
        status: "Not found",
      };
    }

    await likeResModel.destroy({
      where: { user_id: userId, res_id: resId },
    });

    return {
      data: null,
      message: "Unlike thành công",
      code: 200,
    };
  },
  getLikeByResId: async function (req) {
    const { resId } = req.params;
    const likes = await likeResModel.findAll({
      where: {
        res_id: resId,
      },
      include: [
        {
          model: restaurantModel,
          as: "restaurant",
          attributes: [
            ["res_id", "resId"],
            ["res_name", "resName"],
            ["res_image", "resImg"],
          ],
        },
        {
          model: userModel,
          as: "userLiked",
          attributes: [
            ["user_id", "id"],
            ["full_name", "name"],
            ["email", "email"],
          ],
        },
      ],
      attributes: [
        ["like_id", "likeId"],
        ["like_date", "likeDate"],
      ],
    });

    if (!likes.length) {
      return {
        message: "Không tìm thấy lượt like cho nhà hàng này",
        code: 404,
        status: "Not Found",
      };
    }
    const { restaurant } = likes[0].dataValues;
    const newArrLikes = [...likes];
    const resData = {
      likedRes: restaurant,
      likedStat: newArrLikes.map((item) => {
        const { likeId, likeDate, userLiked } = item.dataValues;
        return {
          likeId: likeId,
          likeDate: likeDate,
          userLiked: userLiked,
        };
      }),
    };
    return {
      data: resData,
      message: `Lấy danh sách like nhà hàng '${restaurant.dataValues.resName}' thành công`,
      code: 200,
    };
  },

  getLikeByUserId: async function (req) {
    const { userId } = req.params;
    const likes = await likeResModel.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: userModel,
          as: "userLiked",
          attributes: [
            ["user_id", "id"],
            ["full_name", "name"],
            ["email", "email"],
          ],
        },
        {
          model: restaurantModel,
          as: "restaurant",
          attributes: [
            ["res_id", "resId"],
            ["res_name", "resName"],
            ["res_image", "resImg"],
          ],
        },
      ],
      attributes: [
        ["like_id", "likeId"],
        ["like_date", "likeDate"],
      ],
    });

    if (!likes.length) {
      return {
        message: "Không tìm thấy lượt like của user này",
        code: 404,
        status: "Not Found",
      };
    }
    const { userLiked } = likes[0].dataValues;
    const newArrLikes = [...likes];
    const resData = {
      userLiked: userLiked,
      likedStat: newArrLikes.map((item) => {
        const { likeId, likeDate, restaurant } = item.dataValues;
        return {
          likeId: likeId,
          likeDate: likeDate,
          restaurant: restaurant,
        };
      }),
    };
    return {
      data: resData,
      message: `Lấy danh sách like của user '${userLiked.dataValues.name}' thành công`,
      code: 200,
    };
  },

  // for rate
  rateRes: async function (req, res, next) {
    const { userId, resId, rateAmount } = req.body;
    // check request body
    if (!userId || !resId || !rateAmount) {
      return {
        data: null,
        message: "Thiếu dữ liệu request",
        code: 400,
        status: "Missing request",
      };
    }

    // check if rated
    const isRated = await rateResModel.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
    });
    if (isRated) {
      return {
        data: null,
        message: "User đã rate nhà hàng này",
        code: 409,
        status: "Existed",
      };
    }

    await rateResModel.create({
      user_id: userId,
      res_id: resId,
      rate_amount: rateAmount,
    });

    const resData = await rateResModel.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
      attributes: [
        ["rate_id", "rateId"],
        ["user_id", "userId"],
        ["res_id", "resId"],
        ["rate_amount", "rateAmount"],
        ["rate_date", "rateDate"],
      ],
    });

    return {
      data: resData,
      message: "Rate thành công",
      code: 200,
    };
  },

  getRateByResId: async function (req) {
    const { resId } = req.params;
    const rates = await rateResModel.findAll({
      where: {
        res_id: resId,
      },
      include: [
        {
          model: restaurantModel,
          as: "rateRestaurant",
          attributes: [
            ["res_id", "resId"],
            ["res_name", "resName"],
            ["res_image", "resImg"],
          ],
        },
        {
          model: userModel,
          as: "userRated",
          attributes: [
            ["user_id", "id"],
            ["full_name", "name"],
            ["email", "email"],
          ],
        },
      ],
      attributes: [
        ["rate_id", "rateId"],
        ["rate_amount", "rateAmount"],
        ["rate_date", "rateDate"],
      ],
    });

    if (!rates.length) {
      return {
        message: "Không tìm thấy đánh giá cho nhà hàng này",
        code: 404,
        status: "Not Found",
      };
    }
    const { rateRestaurant } = rates[0].dataValues;
    const newArrRates = [...rates];
    const resData = {
      ratedRes: rateRestaurant,
      ratedStat: newArrRates.map((item) => {
        const { rateId, rateDate, userRated, rateAmount } = item.dataValues;
        return {
          rateId: rateId,
          rateAmount: rateAmount,
          rateDate: rateDate,
          userRated: userRated,
        };
      }),
    };
    return {
      data: resData,
      message: `Lấy danh sách đánh giá nhà hàng '${rateRestaurant.dataValues.resName}' thành công`,
      code: 200,
    };
  },

  getRateByUserId: async function (req) {
    const { userId } = req.params;
    const rates = await rateResModel.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: userModel,
          as: "userRated",
          attributes: [
            ["user_id", "id"],
            ["full_name", "name"],
            ["email", "email"],
          ],
        },
        {
          model: restaurantModel,
          as: "rateRestaurant",
          attributes: [
            ["res_id", "resId"],
            ["res_name", "resName"],
            ["res_image", "resImg"],
          ],
        },
      ],
      attributes: [
        ["rate_id", "rateId"],
        ["rate_amount", "rateAmount"],
        ["rate_date", "rateDate"],
      ],
    });

    if (!rates.length) {
      return {
        message: "Không tìm thấy đánh giá của user này",
        code: 404,
        status: "Not Found",
      };
    }
    const { userRated } = rates[0].dataValues;
    const newArrRates = [...rates];
    const resData = {
      userRated: userRated,
      ratedStat: newArrRates.map((item) => {
        const { rateId, rateDate, rateRestaurant, rateAmount } =
          item.dataValues;
        return {
          rateId,
          rateAmount,
          rateDate,
          restaurant: rateRestaurant,
        };
      }),
    };
    return {
      data: resData,
      message: `Lấy danh sách rate của user '${userRated.dataValues.name}' thành công`,
      code: 200,
    };
  },
};

export default restaurantService;
