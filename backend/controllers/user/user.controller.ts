import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'backend/schemas/user.dto';
import { User, AuthResponse } from '@sz/interface';
import { AuthService } from '../auth/auth.service';
import { Allow, Public } from 'backend/handlers/decorators/role.decorator';
import { Role } from '@sz/enum';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post()
  async register(@Body() user: CreateUserDTO): Promise<AuthResponse> {
    const { _id } = await this.userService.createOne(user);
    return this.authService.createToken(_id);
  }

  @Allow(Role.ADMIN)
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }
}
