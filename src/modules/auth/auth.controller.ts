import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Response } from 'src/common/response';
import { AuthService } from './auth.service';
import { LoginRequestDto, RegisterRequestDto } from './dto/auth.request';

// Extend Express Request interface to include 'user'
declare module 'express' {
  interface Request {
    user?: any;
  }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginRequestDto): Promise<Response> {
    return this.authService.login(loginDto.emailOrUsername, loginDto.password);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterRequestDto): Promise<Response> {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auto-login')
  async autoLogin(@Req() req: Request): Promise<Response> {
    // req.user được JwtStrategy gán vào khi xác thực thành công
    return this.authService.autoLogin(req?.user);
  }
}
