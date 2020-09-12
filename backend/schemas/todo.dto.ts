import { Schema } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  todo: string;
  completed: boolean;
  userName: string;
}

export const TodoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: { type: Boolean, default: false },
  userName: { type: String, index: true },
}).loadClass(CreateTodoDTO);
