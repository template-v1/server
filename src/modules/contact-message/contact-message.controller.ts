import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ContactMessageService } from './contact-message.service';
import {
  CreateContactMessageDto,
  GetAllContactMessageDto,
} from './dto/create-contact-message.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Public } from 'src/common/guards/public.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/guards/roles.decorator';
import { Request } from 'express';

@Controller('contact-message')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContactMessageController {
  constructor(private readonly contactMessageService: ContactMessageService) {}

  @Public()
  @Post('create')
  create(@Body() createContactMessageDto: CreateContactMessageDto) {
    return this.contactMessageService.create(createContactMessageDto);
  }

  @Public()
  // @Roles('admin')
  @Post('get-all')
  getAll(@Body() data: GetAllContactMessageDto, @Req() req: Request) {
    const user = req.user;

    return this.contactMessageService.getAll(data, user);
  }
}
