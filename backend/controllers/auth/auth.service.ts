import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from '@sz/interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(id: string): Promise<AuthResponse> {
    const payload = await this.userService.findOne(id);
    return { token: this.jwtService.sign(payload.toJSON()) };
  }
}
