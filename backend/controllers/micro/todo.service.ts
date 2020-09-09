import { Injectable } from '@nestjs/common';
import { Todo } from '@sz/interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel('todos') private todoModel: Model<Todo>) {}

  async findAll(userName: string): Promise<Todo[]> {
    return this.todoModel.find({ userName }).exec();
  }

  async createOne(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = new this.todoModel(todo);
    return newTodo.save();
  }

  async updateOne(id: string): Promise<Todo> {
    return this.todoModel.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true },
    );
  }

  async deleteOne(id: string): Promise<Todo> {
    return this.todoModel.findByIdAndDelete(id);
  }
}
