import express from "express";
import restaurantRouter from "./restaurant.router.js";
import userRouter from "./user.router.js";
import orderRouter from "./order.router.js";

const rootRouter = express.Router();

// tạo một end-point api check server
rootRouter.get("/", (req, res, next) => {
  console.log("Kết nối server thành công");
  res.json("Call api OK");
});

// usersRouter - api cho user
rootRouter.use("/user", userRouter);

// restaurantRouter - các api nhà hàng
rootRouter.use("/restaurant", restaurantRouter);

// orderRouter - các api về đơn hàng
rootRouter.use("/order", orderRouter);

export default rootRouter;
