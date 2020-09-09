import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from 'backend/schemas/todo.dto';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'todos', schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class MicroModule {}
