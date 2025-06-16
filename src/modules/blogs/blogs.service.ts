import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/common/response';
import { Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
  ) {}

  async create(data: CreateBlogDto, user: any): Promise<Response> {
    try {
      const { image, title, content, categories, tags } = data;

      const blog = await this.blogRepository.save({
        image: image ? image.join(',') : null,
        title: title,
        content,
        categories: categories ? categories.join(',') : null,
        tags: tags ? tags.join(',') : null,
        authorId: user?.id,
        createAt: new Date(),
        createBy: user?.id,
      });

      return new Response(HttpStatus.CREATED, 'Tạo mới thành công', blog);
    } catch (error) {
      throw Error(error);
    }
  }

  async findAll(): Promise<Response> {
    try {
      const query = this.blogRepository
        .createQueryBuilder('blog')
        .leftJoinAndSelect('blog.user', 'user')
        .addSelect(['user.id', 'user.name', 'user.email'])
        .orderBy('blog.createdAt', 'DESC');
      const blogs = await query.getMany();
      return new Response(HttpStatus.OK, 'Lấy danh sách thành công', blogs);
    } catch (error) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'Lấy danh sách thất bại');
    }
  }

  async findById(id: string): Promise<Response> {
    try {
      const blog = await this.blogRepository
        .createQueryBuilder('blog')
        .leftJoinAndSelect('blog.user', 'user')
        .addSelect(['user.id', 'user.name', 'user.email'])
        .where('blog.id = :id', { id })
        .getOne();

      if (!blog) {
        return new Response(HttpStatus.NOT_FOUND, 'Blog không tồn tại');
      }

      return new Response(HttpStatus.OK, 'Lấy thông tin thành công', blog);
    } catch (error) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'Lấy thông tin thất bại');
    }
  }

  async updateById(data: UpdateBlogDto, user: any): Promise<Response> {
    try {
      const { id, image, content, categories, tags } = data;
      if (!id) {
        return new Response(HttpStatus.BAD_REQUEST, 'ID không được để trống');
      }

      const blog = await this.blogRepository.findOne({ where: { id } });

      if (!blog) {
        return new Response(HttpStatus.NOT_FOUND, 'Blog không tồn tại');
      }

      const updatedBlog = await this.blogRepository.save({
        ...blog,
        ...data,
        image: data.image ? data.image.join(',') : blog.image,
        categories: data.categories ? data.categories.join(',') : blog.categories,
        tags: data.tags ? data.tags.join(',') : blog.tags,
        updateAt: new Date(),
        updatedBy: user.id,
      });

      return new Response(HttpStatus.OK, 'Cập nhật thành công', updatedBlog);
    } catch (error) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'Cập nhật thất bại');
    }
  }

  async deleteById(id: string): Promise<Response> {
    try {
      if (!id) {
        return new Response(HttpStatus.BAD_REQUEST, 'ID không được để trống');
      }

      const blog = await this.blogRepository.findOne({ where: { id } });

      if (!blog) {
        return new Response(HttpStatus.NOT_FOUND, 'Blog không tồn tại');
      }

      await this.blogRepository.save({
        ...blog,
        isDeleted: true,
        deleteAt: new Date(),
      });

      return new Response(HttpStatus.OK, 'Xoá thành công');
    } catch (error) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'Xoá thất bại');
    }
  }
}
