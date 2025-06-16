import { Body, Controller, Get, Param, Post, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Public } from 'src/common/guards/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post('create')
  @Public()
  async create(@Body() data: CreateBlogDto, @Req() req: Request) {
    const user = req.user;
    return this.blogsService.create(data, user);
  }

  @Get('get-all')
  @Public()
  async findAll() {
    return this.blogsService.findAll();
  }

  @Get('get/:id')
  @Public()
  async findById(@Param('id') id: string) {
    return this.blogsService.findById(id);
  }

  @Post('update')
  async updateById(@Body() data: UpdateBlogDto, @Req() req: Request) {
    const user = req.user;
    return this.blogsService.updateById(data, user);
  }

  @Post('delete')
  async deleteById(@Body() id: string) {
    return this.blogsService.deleteById(id);
  }
}
