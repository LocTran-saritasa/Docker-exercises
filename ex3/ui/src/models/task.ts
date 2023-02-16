import { Group } from './group';
import { Immerable, OmitImmerable } from './immerable';

export class Task extends Immerable {
  public readonly name: string;
  public readonly id: number;

  public constructor(data: TaskInitArgs) {
    super();
    this.name = data.name;
    this.id = data.id;
  }
}

export class SentTask extends Task {
  public readonly groupId: number | null;
  public readonly sentAt: Date | null;
  public constructor(data: SentTaskInitArgs) {
    super(data);
    this.groupId = data.groupId;
    this.sentAt = data.sentAt;
  }
}

export interface SendTaskData {
  readonly taskId: Task['id']
  readonly groupId: Group['id']
}

type TaskInitArgs = OmitImmerable<Task>;
type SentTaskInitArgs = OmitImmerable<SentTask>;
