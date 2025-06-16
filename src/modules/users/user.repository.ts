import { Repository, DataSource, In } from 'typeorm';
import { UserEntity } from './user.entity';

export class UserRepository extends Repository<UserEntity> {
  // Thêm các hàm custom truy vấn ở đây nếu cần
}