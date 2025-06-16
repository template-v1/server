import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/common/response';
import { CreateUserGuestDto } from '../auth/dto/auth.request';
import { UsersService } from '../users/users.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { ContactMessageEntity } from './contact-message.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ContactMessageService {
  constructor(
    @InjectRepository(ContactMessageEntity)
    private contactMessageRepository: Repository<ContactMessageEntity>,
    private userService: UsersService,
  ) {}

  async create(createContactMessageDto: CreateContactMessageDto) {
    try {
      const { name, email, subject, message, contactNumber } =
        createContactMessageDto;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        throw new Error('Các trường tên, email, chủ đề và tin nhắn là bắt buộc.');
      }

      const userReq: CreateUserGuestDto = {
        name,
        email: email.toLowerCase(),
        username: email.toLowerCase(),
        contactNumber,
      };

      // Tạo người dùng khách nếu chưa tồn tại
      const user = await this.userService.createUserGuest(userReq);

      // tạo mới tin nhắn liên hệ
      await this.contactMessageRepository.save({
        subject,
        message,
        createdAt: new Date(),
        userId: user.id,
      });

      return new Response(
        HttpStatus.CREATED,
        'Tạo tin nhắn liên hệ thành công',
        null,
      );
    } catch (error) {
      return new Response(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || 'Đã xảy ra lỗi khi tạo tin nhắn liên hệ',
        null,
      );
    }
  }

  async getAll(data: any, user: any) {
    try {
      const { userId } = data;
      const query = this.contactMessageRepository.createQueryBuilder('contactMessage')
        .leftJoinAndSelect('contactMessage.user', 'user')
        .addSelect(['user.id', 'user.name', 'user.email'])
        .orderBy('contactMessage.createdAt', 'DESC');

      if (userId && userId.length > 0) {
        query.where('contactMessage.userId IN (:...userId)', { userId });
      }

      const contactMessages = await query.getMany();

      return new Response(
        HttpStatus.OK,
        'Lấy danh sách tin nhắn liên hệ thành công',
        contactMessages,
      );
    } catch (error) {
      return new Response(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || 'Đã xảy ra lỗi khi lấy danh sách tin nhắn liên hệ',
        null,
      );
    }
  }
}