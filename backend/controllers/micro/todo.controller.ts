import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Controls, CRUD } from '@sz/enum';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { Api } from 'backend/handlers/decorators/api.decorators';
import { CreateTodoDTO } from 'backend/schemas/todo.dto';
import { Todo, JwtPayload } from '@sz/interface';
import { AuthUser } from 'backend/handlers/decorators/user.decorators';

const name = Controls.Todos;

@ApiTags(name)
@Controller(name)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':id')
  @Api(name, CRUD.READONE)
  async getTodos(@Param('id') id: string): Promise<Todo[]> {
    return await this.todoService.findAll(id);
  }

  @Post()
  @Api(name, CRUD.CREATEONE, { allow: [] })
  async createTodo(
    @Body() todo: CreateTodoDTO,
    @AuthUser() { userName }: JwtPayload,
  ): Promise<Todo> {
    return await this.todoService.createOne({ ...todo, userName });
  }

  @Put(':id')
  @Api(name, CRUD.UPDATEONE)
  async updateTodo(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.updateOne(id);
  }

  @Delete(':id')
  @Api(name, CRUD.DELETEONE)
  async deleteTodo(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.deleteOne(id);
  }
}
