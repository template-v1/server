import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { UserEntity } from '../users/user.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity({ name: 'blogs' })
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'ảnh tượng trưng',
  })
  image: string;

  @Column({ type: 'text'})
  title: string;

  @Column({ type: 'text', comment: 'Nội dung blog' })
  content: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Danh mục (Categories), phân cách bởi dấu phẩy',
  })
  categories: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Tags, phân cách bởi dấu phẩy',
  })
  tags: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    comment: 'ID của người tạo blog',
  })
  authorId: string;

  @OneToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'authorId' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.blog)
  comments: CommentEntity[];
}
