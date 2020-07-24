import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Register, User } from '@sz/interface';
import { CreateUserDTO } from 'backend/schemas/user.dto';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private saltRounds = 10;
  constructor(@InjectModel('users') private userModel: Model<Register>) {}

  async createOne(user: CreateUserDTO): Promise<User> {
    user['passwordHash'] = await this.createHash(user.password);
    // clear passwords
    delete user.password;
    delete user.confirmPassword;
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select(['-passwordHash']);
  }

  async findOne(_id: string): Promise<User> {
    return this.userModel.findById(_id, { passwordHash: 0 });
  }

  async getByUsername(userName: string): Promise<User> {
    return this.userModel.findOne({ userName });
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private createHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
}
