import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'backend/schemas/user.dto';
import { User } from '@sz/interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() user: CreateUserDTO): Promise<User> {
    const newUser = this.userService.createOne(user);
    return newUser;
  }
}
