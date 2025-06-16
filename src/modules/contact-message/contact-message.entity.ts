import { BaseEntity } from 'src/common/base.entity';
import { UserEntity } from 'src/modules/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'contact_messages' })
export class ContactMessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'subject',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Chủ đề liên hệ',
  })
  subject: string;

  @Column({
    name: 'message',
    type: 'text',
    comment: 'Nội dung tin nhắn',
    nullable: false,
  })
  message: string;

  @Column({
    name: 'user_id',
    type: 'varchar',
    nullable: true,
  })
  userId: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
