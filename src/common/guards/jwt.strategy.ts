/**
 * hàm này định nghĩa chiến lược xác thực JWT cho Passport trong NestJS.
 * Nó sử dụng thư viện passport-jwt để trích xuất token từ header của request
 * và xác thực nó bằng secret key đã được định nghĩa.
 * Khi token hợp lệ, hàm validate sẽ trả về thông tin người dùng
 * được giải mã từ token, cho phép NestJS sử dụng thông tin này trong các route bảo vệ.
 * --> lấy thông tin user từ token JWT
 */
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(
      //   {
      //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lấy token từ header
      //   ignoreExpiration: false, // không bỏ qua hạn token
      //   secretOrKey: process.env.JWT_SECRET,
      // }
      {
        jwtFromRequest: (req) => {
          const authHeader = req.headers['authorization'];
          return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        },
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET,
      },
    );
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload);
    // trả về thông tin user
    return {
      id: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
