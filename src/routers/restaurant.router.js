import express from "express";
import restaurantController from "../controllers/restaurant.controller.js";

const restaurantRouter = express.Router();

// route like
restaurantRouter.post("/likeRes", restaurantController.likeRes);
restaurantRouter.delete("/unlikeRes", restaurantController.unlikeRes);
restaurantRouter.get(
  "/getLikeByResId/:resId",
  restaurantController.getLikeByResId
);
restaurantRouter.get(
  "/getLikeByUserId/:userId",
  restaurantController.getLikeByUserId
);

// route rate
restaurantRouter.post("/rateRes", restaurantController.rateRes);
restaurantRouter.get(
  "/getRateByResId/:resId",
  restaurantController.getRateByResId
);
restaurantRouter.get(
  "/getRateByUserId/:userId",
  restaurantController.getRateByUserId
);

export default restaurantRouter;
