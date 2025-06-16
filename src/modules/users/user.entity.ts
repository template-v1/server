import { BaseEntity } from 'src/common/base.entity';
import { UserRole } from 'src/enum/user.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContactMessageEntity } from '../contact-message/contact-message.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    comment: 'Họ tên người dùng',
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    unique: true,
    comment: 'Email người dùng',
  })
  email: string;

  @Column({
    name: 'contact_number',
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: 'Số điện thoại',
  })
  contactNumber: string;

  @Column({
    name: 'gender',
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: 'Giới tính',
  })
  gender: string;

  @Column({
    name: 'date_of_birth',
    type: 'date',
    nullable: true,
    comment: 'Ngày sinh',
  })
  dateOfBirth: Date;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 100,
    unique: true,
    comment: 'Tên đăng nhập',
  })
  username: string;

  @Column({
    name: 'hash_password',
    type: 'varchar',
    length: 255,
    comment: 'Mật khẩu đã mã hóa',
    default: '',
  })
  hashPassword: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
    comment: 'Quyền người dùng',
  })
  role: UserRole;

  @Column({
    name: 'project',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Thuộc dự án',
  })
  project: string;

  @OneToMany(() => ContactMessageEntity, (message) => message.user)
  contactMessages: ContactMessageEntity[];
}
