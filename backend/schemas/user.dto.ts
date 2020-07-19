// dtos: class - transfer object in the post,put,delete request

import { Role } from '@sz/enum';
import { Schema } from 'mongoose';

export class CreateUserDTO {
  userName: string;
  password: string;
  confirmPassword: string;
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
