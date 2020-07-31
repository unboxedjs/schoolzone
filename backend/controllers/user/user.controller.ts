import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'backend/schemas/user.dto';
import { User, AuthResponse } from '@sz/interface';
import { AuthService } from '../auth/auth.service';
import { Role, Controls, CRUD } from '@sz/enum';
import { ApiTags } from '@nestjs/swagger';
import { Api } from 'backend/handlers/decorators/api.decorators';

const name = Controls.Users;

@ApiTags(name)
@Controller(name)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @Api(name, CRUD.CREATEONE)
  async register(@Body() user: CreateUserDTO): Promise<AuthResponse> {
    const { _id } = await this.userService.createOne(user);
    return this.authService.createToken(_id);
  }

  @Get()
  @Api(name, CRUD.READALL, { allow: [Role.ADMIN] })
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @Api(name, CRUD.READONE, { allow: [] })
  async getProfile(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }
}
