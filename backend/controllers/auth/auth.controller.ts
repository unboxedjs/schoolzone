import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthResponse } from '@sz/interface';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Public } from 'backend/handlers/decorators/role.decorator';
import { LoginDTO } from 'backend/schemas/user.dto';
import { ErrorCode } from '@sz/enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post()
  async login(@Body() { userName, password }: LoginDTO): Promise<AuthResponse> {
    const { passwordHash, _id } =
      (await this.userService.getByUsername(userName)) || {};

    if (_id) {
      if (await this.userService.compareHash(password, passwordHash)) {
        return await this.authService.createToken(_id);
      } else {
        throw new ForbiddenException({ message: ErrorCode.A002 });
      }
    } else {
      throw new NotFoundException();
    }
  }
}
