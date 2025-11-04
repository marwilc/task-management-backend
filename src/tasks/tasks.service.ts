import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Task as PrismaTask } from 'generated/prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

const prisma = new PrismaClient();

@Injectable()
export class TasksService {
  async findAll(): Promise<PrismaTask[]> {
    return await prisma.task.findMany();
  }

  async findOne(id: string): Promise<PrismaTask> {
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async create(data: CreateTaskDto): Promise<PrismaTask> {
    return await prisma.task.create({ data });
  }

  async update(id: string, data: UpdateTaskDto): Promise<PrismaTask> {
    return await prisma.task.update({ where: { id }, data });
  }

  async delete(id: string): Promise<PrismaTask> {
    return await prisma.task.delete({ where: { id } });
  }
}
