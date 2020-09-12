import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from 'backend/schemas/todo.dto';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'todos', schema: TodoSchema }])],
  controllers: [TodoController, NotificationController],
  providers: [TodoService, NotificationService],
})
export class MicroModule {}
