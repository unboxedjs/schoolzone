// dtos: class - transfer object in the post,put,delete request

import { Role } from '@sz/enum';
import { Schema } from 'mongoose';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Compare } from 'backend/handlers/decorators/compare.decorator';

export class LoginDTO {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}

export class CreateUserDTO extends LoginDTO {
  @IsNotEmpty()
  @Compare('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @IsEnum(Role)
  role: Role;
}

// schemas - db blueprint
export const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: Role,
    default: Role.STUDENT,
    required: true,
  },
}).loadClass(CreateUserDTO);

// interfaces - typescript, make scoding easier
