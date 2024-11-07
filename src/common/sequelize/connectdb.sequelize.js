import { Sequelize } from "sequelize";

// tạo connect db
const sequelize = new Sequelize("app_food", "root", "1234", {
  host: "localhost",
  port: "3307",
  dialect: "mysql",
  //logging: false, //=> bật/tắt log ra các query sql của sequelize khi tạo kết nối với db
});

// check connect
sequelize
  .authenticate()
  .then((res) => {
    console.log("Kết nối db thành công");
  })
  .catch((err) => {
    console.log("Kết nối db Không thành công:", err);
  });

export default sequelize;
