import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'backend/config';
import { JwtPayload } from '@sz/interface';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ErrorCode } from '@sz/enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  async validate({ _id }: JwtPayload): Promise<JwtPayload> {
    const user = await this.userService.findOne(_id);
    if (!user) {
      throw new ForbiddenException({ message: ErrorCode.A001 });
    }
    return user;
  }
}
