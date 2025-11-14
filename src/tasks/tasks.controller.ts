import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskStatus } from 'generated/prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  // delete all tasks with status DONE
  // delete: /tasks?status=DONE
  @Delete()
  deleteByStatus(@Query('status') status: TaskStatus) {
    return this.tasksService.deleteByStatus(status);
  }

  @Put(':id/cycle')
  cycleTaskStatus(@Param('id') id: string) {
    return this.tasksService.cycleTaskStatus(id);
  }
}
