import express from "express";
import cors from "cors";
import corsList from "./src/common/helpers/cors.helper.js";
import rootRouter from "./src/routers/root.router.js";

const app = express();

// sử dụng middledware để chuyển JSON sang đối tượng js (object,...)
// sử dụng với body khi truyền dữ liệu
app.use(express.json());

// quản lý chặn cors
app.use(cors({ origin: corsList }));

// chuyển qua quản lý router
app.use(rootRouter);

// =========[Tạo cổng kết nối cho hệ thống BackEnd của dự án]=========
const PORT = 3070;
app.listen(PORT, () => {
  console.log(`Server online at port ${PORT}`);
});
