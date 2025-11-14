export class Task {
  id: string;
  title: string;
  status: TaskStatus;
  date: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
