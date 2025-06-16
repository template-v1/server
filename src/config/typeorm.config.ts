import { TypeOrmModuleOptions } from '@nestjs/typeorm';


// Docker command to run MySQL container
// docker run --name mysql-container \            ----- Đặt tên cho container là mysql-container
//   -e MYSQL_ROOT_PASSWORD=my-secret-pw \        ----- Đặt mật khẩu root cho MySQL
//   -e MYSQL_DATABASE=mydb \                     ----- Tạo database mặc định là mydb  
//   -e MYSQL_USER=myuser \                       ----- Tạo user myuser
//   -e MYSQL_PASSWORD=mypassword \               ----- Tạo user myuser với mật khẩu mypassword  
//   -v mysql-data:/var/lib/mysql \               ----- Lưu trữ dữ liệu MySQL trên volume mysql-data(-v [tên_volume hoặc đường_dẫn_host]:[đường_dẫn_trong_container])
//   -p 3306:3306 \                               ----- Mở cổng 3306 để truy cập MySQL
//   -d mysql                                     ----- Chạy container ở chế độ nền
// docker run --name mysql-logistic -e MYSQL_ROOT_PASSWORD=root -v mysql_data:/var/lib/mysql -p 3306:3306 -d mysql

// Các lệnh để quản lý MySQL container
// docker exec -it mysql-container mysql -u root -p     ----- Truy cập vào MySQL container
// docker exec -it mysql-container bash                 ----- Truy cập vào bash của MySQL container

// Các lệnh truy cập MySQL
// docker exec -it mysql-container mysql -u root -p     ----- Truy cập vào MySQL từ container
// mysql -h localhost -P 3306 -u root -p            ----- Truy cập vào MySQL từ máy chủ (localhost)
// mysql -u root -p                                     ----- Truy cập vào MySQL từ máy chủ

// gen module users
// nest generate resource users

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // false nếu production
  logging: true, // 👈 bật log
});
