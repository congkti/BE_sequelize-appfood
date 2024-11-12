### Hướng dẫn cài đặt:

- Chép source code vô thư mục dự án
- Tạo database cho dự án: dùng file SQL **mysql_app-food.sql**
- Mở terminal tạo thư mục root của dự án, Chạy lệnh: **npm i** -> để cài Node package module
- Start server: **npm run start**

### Base URL: http://localhost:3070

### Danh sách các API:

- API người dùng:

  - Lấy danh sách tất cả người dùng: [GET]: **/user/getAllUsers**

- API xử lý Nhà hàng:

  - Like nhà hàng: [POST]: **restaurant/likeRes?userId=##&resId=##**
  - Unlike nhà hàng: [DELETE]: **/restaurant/unlikeRes?userId=##&resId=##**
  - Lấy danh sách like theo nhà hàng: [GET]: **/restaurant/getLikeByResId/:resId**
  - Lấy danh sách like theo user: [GET]: **/restaurant/getLikeByUserId/:userId**

- API đánh giá Nhà hàng:

  - Thêm đánh giá mới: [POST]: **restaurant/rateRes**

    => truyền Body:

    ```
    {
    "userId":#,
    "resId":#,
    "rateAmount": #
    }
    ```

  - Lấy danh sách đánh giá theo nhà hàng: [GET]: **/restaurant/getRateByResId/:resId**
  - Lấy danh sách đánh giá theo user: [GET]: **/restaurant/getRateByUserId/:userId**

- API Đơn hàng:

  - Tạo mới đơn hàng đặt món: [POST]: **/order//newOrder**

    => truyền Body:

    ```
    {
    "userId": #,
    "foodId": #,
    "orderAmount": #,
    "promoCode": "DISCOUT01",
    "arrSubId": null
    }
    ```

  - ...
