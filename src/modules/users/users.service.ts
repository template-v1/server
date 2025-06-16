import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/enum/user.enum';
import { CreateUserGuestDto } from '../auth/dto/auth.request';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async createUserGuest(data: CreateUserGuestDto) {
    try {
      const { name, email, username, contactNumber } = data;

      // Kiểm tra các trường bắt buộc
      if (!name || !email || !username) {
        throw new Error('Các trường tên, email và tên đăng nhập là bắt buộc.');
      }

      const existingUser = await this.userRepository.findOne({
        where: [ { email: email.toLowerCase() }, { username: username.toLowerCase() } ],
        select: ['id', 'email', 'username'],
      });
      // Kiểm tra xem người dùng đã tồn tại chưa
      if (existingUser) {
        return existingUser;
      }

      // Tạo user mới
      const user = await this.userRepository.save({
        name,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        contactNumber,
        hashPassword: '',
        role: UserRole.GUEST,
        createdAt: new Date(),
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
