export interface TaskDto {
  readonly name: string;
}

export interface AllTasksDto {
  readonly allTasks: {
    readonly nodes: readonly TaskDto[]
  }
}
