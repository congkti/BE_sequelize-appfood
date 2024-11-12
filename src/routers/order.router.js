import express from "express";
import { orderController } from "../controllers/order.controller.js";

const orderRouter = express.Router();

// route đơn hàng
orderRouter.post("/newOrder", orderController.newOrder);

export default orderRouter;
