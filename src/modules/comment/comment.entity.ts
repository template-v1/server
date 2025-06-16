import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { BlogEntity } from '../blogs/blog.entity';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    comment: 'Tiêu đề bình luận',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'text',
    comment: 'Nội dung bình luận',
  })
  content: string;

  @Column({
    name: 'blog_id',
    type: 'uuid',
    comment: 'ID bài blog',
  })
  blogId: string;

  @ManyToOne(() => BlogEntity, (blog) => blog.comments, { nullable: false })
  @JoinColumn({ name: 'blog_id' })
  blog: BlogEntity;
}
