import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'src/common/response';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { RegisterRequestDto } from './dto/auth.request';
import {
  AutoLoginResponseDto,
  LoginResponseDto,
  RegisterResponseDto,
} from './dto/auth.response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterRequestDto,
  ): Promise<Response<RegisterResponseDto>> {
    try {
      const { name, email, username, password } = registerDto;

      // Kiểm tra email hoặc username đã tồn tại chưa
      const existingUser = await this.userRepository.findOne({
        where: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() },
        ],
      });

      if (existingUser) {
        throw new BadRequestException(
          'Email hoặc username đã được sử dụng. Vui lòng chọn email hoặc username khác.',
        );
      }
      if (!password) {
        throw new BadRequestException('Mật khẩu không được để trống');
      }

      // Hash password
      const hashPassword = await bcrypt.hash(password, 10);

      // Tạo user mới
      const user = await this.userRepository.save({
        name,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        hashPassword,
      });

      return new Response(HttpStatus.CREATED, 'Đăng ký thành công', {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          contactNumber: user.contactNumber,
        },
      });
    } catch (error) {
      throw new BadRequestException('Đăng ký không thành công');
    }
  }

  async login(
    emailOrUsername: string,
    password: string,
  ): Promise<Response<LoginResponseDto>> {
    try {
      // Tìm user theo email hoặc username
      const user = await this.userRepository.findOne({
        where: [
          { email: emailOrUsername.toLowerCase() },
          { username: emailOrUsername.toLowerCase() },
        ],
      });

      if (!user) {
        return new Response(
          HttpStatus.UNAUTHORIZED,
          'Tài khoản hoặc mật khẩu không đúng',
        );
      }

      // So sánh password
      const isMatch = await bcrypt.compare(password, user.hashPassword);
      if (!isMatch) {
        return new Response(
          HttpStatus.UNAUTHORIZED,
          'Tài khoản hoặc mật khẩu không đúng',
        );
      }

      // Sinh accessToken, refreshToken thực tế
      const payload = { id: user.id, username: user.username, email: user.email };
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload);

      return new Response(HttpStatus.OK, 'Đăng nhập thành công', {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          contactNumber: user.contactNumber,
        },
      });
    } catch (error) {
      throw new BadRequestException('Đăng nhập không thành công');
    }
  }

  async autoLogin(userPayload: any): Promise<Response<AutoLoginResponseDto>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userPayload.id },
      });

      if (!user) {
        return new Response(HttpStatus.UNAUTHORIZED, 'Không tìm thấy người dùng');
      }

      return new Response(HttpStatus.OK, 'Lấy thông tin người dùng thành công', {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          contactNumber: user.contactNumber,
          role: (user as any).role, // nếu có trường role
        },
      });
    } catch (error) {
      throw new BadRequestException('Lấy thông tin người dùng không thành công');
    }
  }
}
