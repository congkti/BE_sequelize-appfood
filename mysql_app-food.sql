-- =====================================================
-- Bài tập MySQL buổi 3: app-food
-- Handler: Bùi Hữu Công - NodeJS 45
-- Yêu cầu:
-- 1. Tạo CSDL và các table, column liên quan theo sơ đồ => insert dữ liệu vào Table
-- 2. Thực hiện các yêu cầu:
-- 2.1. Tìm 5 người đã like nhà hàng nhiều nhất
-- 2.2. Tìm 2 nhà hàng có lượt like nhiều nhất
-- 2.3. Tìm người đã đặt hàng nhiều nhất
-- 2.4. Tìm người dùng không hoạt động trong hệ thống (không đặt hàng, không like, không đánh giá nhà hàng)
-- =====================================================

-- 1. XÂY DỰNG CSDL & NHẬP DỮ LIỆU VÀO BẢNG:

-- 1.1. Tạo Database app_food
CREATE DATABASE IF NOT EXISTS app_food;
 
USE app_food

-- 1.2. Tạo bảng user và nhập liệu
CREATE TABLE IF NOT EXISTS users (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	full_name VARCHAR(100) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- 1.3. Tạo bảng food_types, food, sub_food
CREATE TABLE IF NOT EXISTS food_types (
	type_id INT PRIMARY KEY AUTO_INCREMENT,
	type_name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS food (
	food_id INT PRIMARY KEY AUTO_INCREMENT,
	food_name VARCHAR(255),
	food_image VARCHAR(255),
	food_price FLOAT,
	food_desc VARCHAR(255),
	
	type_id INT,
	FOREIGN KEY (type_id) REFERENCES food_types (type_id),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sub_food (
	sub_id INT PRIMARY KEY AUTO_INCREMENT,
	sub_name VARCHAR(255),
	sub_price FLOAT,
	
	food_id INT,
	FOREIGN KEY (food_id) REFERENCES food (food_id),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

-- 1.4. Bảng orders
CREATE TABLE IF NOT EXISTS orders (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
	order_amount INT,
	promo_code VARCHAR(255),
	arr_sub_id VARCHAR(255),
	
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users (user_id),
	
	food_id INT,
	FOREIGN KEY (food_id) REFERENCES food (food_id),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng restaurant, rate_res, like_res
CREATE TABLE IF NOT EXISTS restaurant (
	res_id INT PRIMARY KEY AUTO_INCREMENT,
	res_name VARCHAR(255) NOT NULL,
	res_image VARCHAR(255),
	res_desc VARCHAR(255),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rate_res (
	rate_id INT PRIMARY KEY AUTO_INCREMENT,
	
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users (user_id),
	res_id INT,
	FOREIGN KEY (res_id) REFERENCES restaurant(res_id),
	
	rate_amount INT CHECK (rate_amount BETWEEN 1 AND 5),
	rate_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS like_res (
	like_id INT PRIMARY KEY AUTO_INCREMENT,
	
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users (user_id),
	res_id INT,
	FOREIGN KEY (res_id) REFERENCES restaurant (res_id),
	
	like_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);




-- NHẬP DỮ LIỆU:

-- users
INSERT INTO users (full_name, email, password) VALUES
('John Doe', 'john.doe@gmail.com', 'password123'),
('Jane Smith', 'jane.smith@yahoo.com', 'jsmith456'),
('Michael Johnson', 'michael.johnson@outlook.com', 'mjohnson789'),
('Emily Davis', 'emily.davis@protonmail.com', 'edavis987'),
('Daniel Brown', 'daniel.brown@hotmail.com', 'dbrown321'),
('Jessica Wilson', 'jessica.wilson@aol.com', 'jwilson654'),
('David Taylor', 'david.taylor@gmail.com', 'dtaylor852'),
('Sophia Martinez', 'sophia.martinez@yahoo.com', 'smartinez753'),
('James Anderson', 'james.anderson@outlook.com', 'janderson159'),
('Olivia Thompson', 'olivia.thompson@protonmail.com', 'othompson486'),
('Robert Moore', 'robert.moore@hotmail.com', 'rmoore258'),
('Isabella Lee', 'isabella.lee@aol.com', 'ilee963'),
('William White', 'william.white@gmail.com', 'wwhite654'),
('Mia Harris', 'mia.harris@yahoo.com', 'mharris753'),
('Charles Clark', 'charles.clark@outlook.com', 'cclark852'),
('Amelia Lewis', 'amelia.lewis@protonmail.com', 'alewis321'),
('Henry Walker', 'henry.walker@hotmail.com', 'hwalker987'),
('Ava Hall', 'ava.hall@aol.com', 'ahall159'),
('Jack Allen', 'jack.allen@gmail.com', 'jallen456'),
('Lily Young', 'lily.young@yahoo.com', 'lyoung258');

-- food_types > food
INSERT IGNORE INTO food_types(type_name) VALUES
('Vietnamese'),
('European'),
('Asian'),
('Chinese'),
('Japanese'),
('Thai'),
('Street'),
('Seafood'),
('Grains'),
('Protein'),
('Vegetarian'),
('Fat');

INSERT INTO food (food_name, food_image, food_price, food_desc, type_id) VALUES
('Pho', 'pho.jpg', 5.99, 'Vietnamese noodle soup with beef and herbs', 1),
('Banh Mi', 'banh_mi.jpg', 2.50, 'Vietnamese sandwich with pork and vegetables', 1),
('Spaghetti Carbonara', 'spaghetti_carbonara.jpg', 10.00, 'Italian pasta with eggs and pancetta', 2),
('Sushi', 'sushi.jpg', 18.00, 'Assorted Japanese sushi rolls', 5),
('Tempura', 'tempura.jpg', 15.00, 'Japanese deep-fried seafood and vegetables', 5),
('Pad Thai', 'pad_thai.jpg', 6.00, 'Stir-fried noodles with shrimp and peanuts', 6),
('Croissant', 'croissant.jpg', 2.00, 'Buttery French pastry', 2),
('Sweet and Sour Pork', 'sweet_sour_pork.jpg', 7.50, 'Chinese fried pork in sweet sauce', 4),
('Grilled Chicken Skewers', 'grilled_chicken_skewers.jpg', 5.00, 'Street-style grilled chicken', 7),
('Peking Duck', 'peking_duck.jpg', 15.00, 'Chinese roast duck served with pancakes', 4),
('Tom Yum Soup', 'tom_yum_soup.jpg', 4.50, 'Spicy Thai shrimp soup', 6),
('Fried Calamari', 'fried_calamari.jpg', 8.50, 'Deep-fried squid with marinara sauce', 8),
('Grilled Chicken Breast', 'grilled_chicken_breast.jpg', 13.99, 'Grilled chicken with vegetables', 10),
('Quinoa Salad', 'quinoa_salad.jpg', 6.00, 'Healthy quinoa and greens salad', 9),
('Salmon Sashimi', 'salmon_sashimi.jpg', 22.00, 'Sliced raw salmon with soy sauce', 5),
('Beef Steak', 'beef_steak.jpg', 20.00, 'Grilled beef steak with potatoes', 10),
('Vegan Burger', 'vegan_burger.jpg', 7.50, 'Plant-based burger with lettuce and tomato', 11),
('Avocado Toast', 'avocado_toast.jpg', 4.00, 'Toast with mashed avocado', 11),
('Cheese Plate', 'cheese_plate.jpg', 9.00, 'European cheese selection with fruit', 2),
('Tempura Shrimp', 'tempura_shrimp.jpg', 7.00, 'Lightly battered deep-fried shrimp', 5);

INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES
-- sub __ "Pho"
('Beef Pho', 6.50, 1),
('Chicken Pho', 6.00, 1),
('Seafood Pho', 7.00, 1),

-- sub __ "Banh Mi"
('Pork Banh Mi', 2.75, 2),
('Chicken Banh Mi', 2.85, 2),
('Vegetarian Banh Mi', 2.50, 2),

-- sub __ "Spaghetti Carbonara"
('Bacon Carbonara', 10.50, 3),
('Mushroom Carbonara', 11.00, 3),
('Seafood Carbonara', 12.00, 3),

-- sub __ "Sushi"
('Salmon Sushi', 18.50, 4),
('Tuna Sushi', 19.00, 4),
('Eel Sushi', 20.00, 4),

-- sub __ "Tempura"
('Vegetable Tempura', 14.00, 5),
('Shrimp Tempura', 7.50, 5),
('Chicken Tempura', 15.50, 5),

-- sub __ "Pad Thai"
('Chicken Pad Thai', 6.50, 6),
('Shrimp Pad Thai', 7.00, 6),
('Tofu Pad Thai', 6.25, 6),

-- sub __ "Croissant"
('Chocolate Croissant', 2.50, 7),
('Almond Croissant', 2.75, 7),
('Butter Croissant', 2.00, 7),

-- sub __ "Sweet and Sour Pork"
('Pineapple Pork', 8.00, 8),
('Orange Pork', 7.75, 8),
('Spicy Pork', 8.25, 8),

-- sub __ "Grilled Chicken Skewers"
('Spicy Chicken Skewers', 5.50, 9),
('Teriyaki Chicken Skewers', 6.00, 9),
('Honey Chicken Skewers', 5.75, 9),

-- sub __ "Peking Duck"
('Duck Pancake Rolls', 16.00, 10),
('Duck with Hoisin Sauce', 15.50, 10),
('Crispy Duck', 16.50, 10);


-- orders
INSERT INTO orders (order_amount, promo_code, arr_sub_id, user_id, food_id) VALUES
(3, 'DISCOUNT10', '1,2', 11, 1),
(2, 'DISCOUNT10', '3', 1, 2),
(1, NULL, '4,5', 2, 3),
(4, 'SALE20', '6,7', 3, 4),
(1, 'SALE20', '8', 3, 5),
(2, NULL, '9,10', 4, 6),
(1, NULL, '11', 5, 7),
(5, 'DISCOUNT10', '12,13', 6, 8),
(2, 'SALE20', '14,15', 7, 9),
(3, 'SALE20', '16,17', 8, 10),
(4, 'DISCOUNT10', '18', 9, 11),
(2, NULL, '19,20', 10, 12),
(1, 'SALE20', '21', 11, 13),
(3, 'DISCOUNT10', '22,23', 11, 14),
(2, NULL, '24', 12, 15),
(3, NULL, '25,26', 2, 16),
(1, 'SALE20', '27', 6, 17),
(4, 'DISCOUNT10', '28,29', 8, 18),
(3, NULL, '30,31', 1, 19),
(5, 'SALE20', '32,33', 4, 20),
(2, 'DISCOUNT10', '34,35', 9, 3),
(1, NULL, '36', 7, 5),
(3, 'SALE20', '37,38', 12, 2),
(4, 'DISCOUNT10', '39', 11, 8),
(1, NULL, '40', 8, 15),
(2, 'SALE20', '41,42', 5, 14),
(1, NULL, '43', 10, 12),
(2, 'SALE20', '44,45', 3, 6),
(4, 'DISCOUNT10', '46,47', 6, 11),
(1, 'SALE20', '48', 5, 9),
(3, 'DISCOUNT10', '49', 2, 13),
(5, NULL, '50,51', 7, 10),
(2, 'SALE20', '52,53', 1, 16),
(4, 'DISCOUNT10', '54', 4, 18),
(2, NULL, '55,56', 11, 7),
(1, 'SALE20', '57', 9, 1),
(3, NULL, '58,59', 12, 19),
(2, 'DISCOUNT10', '60', 10, 4);


-- restaurant, like, rate
INSERT INTO restaurant (res_name, res_image, res_desc) VALUES
('Pho 24', 'pho24.jpg', 'Traditional Vietnamese Pho'),
('Banh Mi Cafe', 'banh_mi_cafe.jpg', 'Delicious Vietnamese Banh Mi'),
('Pasta House', 'pasta_house.jpg', 'Best Italian Pasta in Town'),
('Sushi World', 'sushi_world.jpg', 'Authentic Japanese Sushi'),
('Tempura Heaven', 'tempura_heaven.jpg', 'Crispy Tempura for All'),
('Pad Thai Delight', 'pad_thai_delight.jpg', 'Thai Noodle Masterpiece'),
('French Bakery', 'french_bakery.jpg', 'Freshly Baked Croissants'),
('Seafood Shack', 'seafood_shack.jpg', 'Fried and Grilled Seafood'),
('Beef and Beyond', 'beef_and_beyond.jpg', 'Premium Beef Steaks'),
('Salad Dreams', 'salad_dreams.jpg', 'Healthy and Delicious Salads'),
('Quinoa Kingdom', 'quinoa_kingdom.jpg', 'Best Vegan and Vegetarian Foods'),
('Grill Master', 'grill_master.jpg', 'Master of Grilled Dishes'),
('Duck Dynasty', 'duck_dynasty.jpg', 'World’s Best Duck Dishes'),
('Eel Emporium', 'eel_emporium.jpg', 'Specialist in Eel Sushi and Tempura');


INSERT INTO rate_res (user_id, res_id, rate_amount) VALUES
(1, 1, 5),
(2, 3, 4),
(3, 5, 3),
(4, 2, 4),
(5, 6, 5),
(6, 7, 5),
(7, 4, 3),
(8, 8, 4),
(9, 9, 2),
(10, 10, 5),
(11, 11, 4),
(12, 12, 5),
(1, 5, 4),
(2, 4, 5),
(3, 3, 3),
(4, 2, 4),
(5, 6, 5),
(6, 1, 4),
(7, 4, 3),
(8, 2, 5),
(9, 7, 3),
(10, 8, 4),
(11, 9, 5),
(12, 10, 5),
(1, 11, 3);


INSERT INTO like_res (user_id, res_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(1, 6),
(1, 7),
(1, 8),
(5, 9),
(3, 10),
(5, 11),
(3, 12),
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4),
(4, 5),
(2, 6),
(3, 7),
(1, 8),
(2, 1),
(3, 10),
(1, 4),
(1, 12),
(2, 13),
(3, 14),
(4, 1),
(5, 2),
(6, 3),
(7, 4),
(8, 5),
(9, 6),
(10, 7),
(11, 8),
(2, 9),
(1, 10),
(2, 11),
(3, 12),
(4, 13),
(5, 14);


-- 2. THỰC HIỆN CÁC YÊU CẦU BÀI TẬP:

-- 2.1. Tìm 5 người đã like nhà hàng nhiều nhất
SELECT users.user_id, users.full_name, COUNT(like_res.like_id) AS total_likes
FROM users
LEFT JOIN like_res ON users.user_id = like_res.user_id
GROUP BY users.user_id, users.full_name
ORDER BY total_likes DESC
LIMIT 5;

-- 2.2. Tìm 2 nhà hàng có lượt like nhiều nhất
SELECT restaurant.res_id, restaurant.res_name, COUNT(like_res.like_id) AS total_likes
FROM restaurant
LEFT JOIN like_res ON restaurant.res_id = like_res.res_id
GROUP BY restaurant.res_id, restaurant.res_name
ORDER BY total_likes DESC
LIMIT 2;

-- 2.3. Tìm người đã đặt hàng nhiều nhất
SELECT users.user_id, users.full_name, users.email, COUNT(orders.order_id) AS total_orders
FROM users
LEFT JOIN orders ON users.user_id = orders.user_id
GROUP BY users.user_id, users.full_name, users.email
ORDER BY total_orders DESC
LIMIT 1;

-- 2.4. Tìm người dùng không có hoạt động trong hệ thống (không đặt hàng, không like, không đánh giá nhà hàng)
SELECT users.user_id, users.full_name, 
		COUNT(orders.order_id) AS "Tổng đơn", 
		COUNT(like_res.like_id) AS "Tổng like", 
		COUNT(rate_res.rate_id) AS "Tổng rate"
FROM users
LEFT JOIN orders ON users.user_id = orders.user_id
LEFT JOIN like_res ON users.user_id = like_res.user_id
LEFT JOIN rate_res ON users.user_id = rate_res.user_id
GROUP BY users.user_id, users.full_name
HAVING `Tổng đơn` = 0
   AND `Tổng like` = 0
   AND `Tổng rate` = 0;



-- DS hoạt động trên hệ thống của tất cả users
	SELECT users.user_id, users.full_name, 
			COUNT(orders.order_id) AS "Tổng đơn", 
			COUNT(like_res.like_id) AS "Tổng like", 
			COUNT(rate_res.rate_id) AS "Tổng rate"
	FROM users
	LEFT JOIN orders ON users.user_id = orders.user_id
	LEFT JOIN like_res ON users.user_id = like_res.user_id
	LEFT JOIN rate_res ON users.user_id = rate_res.user_id
	GROUP BY users.user_id, users.full_name
	ORDER BY `Tổng đơn` ASC








