import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AuthResponse } from '@sz/interface';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Public } from 'backend/handlers/decorators/role.decorator';
import { LoginDTO } from 'backend/schemas/user.dto';

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
        throw new HttpException(
          { status: HttpStatus.FORBIDDEN, message: 'passwords do not match' },
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new NotFoundException();
    }
  }
}
