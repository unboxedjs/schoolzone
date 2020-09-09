import { Document } from 'mongoose';

export interface Todo extends Document {
  todo: string;
  completed?: boolean;
  userName?: string;
}
