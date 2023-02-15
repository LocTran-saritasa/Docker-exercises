export interface TaskDto {
  readonly id: number;
  readonly name: string;
}

export interface SentTaskDto extends TaskDto {
  readonly groupId: number | undefined;
  readonly sentAt: string | undefined;
}

export interface SentTasksDto {
  readonly sentTasks: {
    readonly nodes: readonly SentTaskDto[]
  }
}
