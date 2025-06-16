import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @Column({
    name: 'created_by',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Người tạo',
  })
  createdBy?: string;

  @Column({
    name: 'updated_by',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Người cập nhật',
  })
  updatedBy?: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Ngày tạo',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: 'Ngày cập nhật',
  })
  updatedAt?: Date;

  @Column({
    name: 'is_delete',
    type: 'boolean',
    default: false,
    comment: 'Đánh dấu xóa mềm',
  })
  isDelete?: boolean;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Ngày xóa',
  })
  deletedAt?: Date;
}