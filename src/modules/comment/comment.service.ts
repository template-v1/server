import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/enum/user.enum';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetAllCommentDto } from './dto/getAll-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const { title, content, blogId, name, email } = createCommentDto;

      // Kiểm tra các trường bắt buộc
      if (!title || !content || !blogId || !name || !email) {
        throw new Error(
          'Các trường title, content, blogId, name và email là bắt buộc.',
        );
      }

      // kiểm tra xem người dùng đã tồn tại chưa
      let existingUser = await this.userRepository.findOne({
        where: { email: email.toLowerCase() },
        select: ['id', 'email', 'name'],
      });
      if (!existingUser) {
        // Tạo người dùng mới nếu chưa tồn tại
        existingUser = this.userRepository.create({
          name,
          email: email.toLowerCase(),
          role: UserRole.GUEST,
          createdAt: new Date(),
        });
        existingUser = await this.userRepository.save(existingUser);
      }

      // Tạo comment mới
      const newComment = await this.commentRepository.save({
        title,
        content,
        blogId: String(blogId),
        user: existingUser,
      });

      return newComment;
    } catch (error) {
      throw new Error('Failed to create comment');
    }
  }

  // lấy tất cả comment theo điều kiện
  async findAllByCondition(condition: GetAllCommentDto) {
    try {
      const { blogId } = condition;

      const query = this.commentRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .where('blogId = :blogId', { blogId })
        .orderBy('comment.createdAt', 'DESC');

      return await query.getMany();
    } catch (error) {
      throw new Error('Failed to fetch comments by condition');
    }
  }
}
