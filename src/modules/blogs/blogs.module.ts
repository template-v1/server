import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './blog.entity';
import { JwtStrategy } from 'src/common/guards/jwt.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity]), AuthModule],
  controllers: [BlogController],
  providers: [BlogsService,JwtStrategy],
})
export class BlogsModule {}
