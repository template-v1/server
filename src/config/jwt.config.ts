export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRATION, // Thời gian hết hạn của JWT
    // algorithm: "HS256", // Thuật toán mã hóa JWT
    // issuer: "your-issuer", // Người phát hành JWT
  }
}