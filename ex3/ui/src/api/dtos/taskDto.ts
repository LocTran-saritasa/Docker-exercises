import { GroupDto } from './groupDto';

/** Task dto. */
export interface TaskDto {

  /** Id. */
  readonly id: number;

  /** Task's name. */
  readonly name: string;
}

/** Sent task Dto. */
export interface SentTaskDto extends TaskDto {

  /** Group's id. */
  readonly groupId: number | undefined;

  /** Sent at. */
  readonly sentAt: string | undefined;
}

/** Sent tasks dto. */
export interface SentTasksDto {

  /** Sent tasks. */
  readonly sentTasks: {

    /** Nodes. */
    readonly nodes: readonly SentTaskDto[];
  };
}

/** Send task data dto. */
export interface SendTaskDataDto {

  /** Task's id. */
  readonly taskId: TaskDto['id'];

  /** Group's id. */
  readonly groupId: GroupDto['id'];
}

/** Updated tasks after sent. */
export interface UpdatedTaskDto {

  /** GraphQL mutation's name. */
  readonly sendTaskToGroup: {

    /** Query. */
    readonly query: SentTasksDto;
  };
}
