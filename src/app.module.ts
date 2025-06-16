import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot(typeOrmConfig()),
    ConfigModule.forRoot({
      isGlobal: true, // Cho phép config dùng toàn cục mà không cần import lại ở module khác
      envFilePath: '.env', // Đường dẫn file env (mặc định là '.env' rồi)
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => typeOrmConfig(),
    }),
    ...SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
