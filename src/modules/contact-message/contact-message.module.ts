import { Module } from '@nestjs/common';
import { ContactMessageService } from './contact-message.service';
import { ContactMessageController } from './contact-message.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessageEntity } from './contact-message.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([ContactMessageEntity]),
  ],
  controllers: [ContactMessageController],
  providers: [ContactMessageService],
})
export class ContactMessageModule {}
