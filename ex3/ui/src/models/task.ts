import { Immerable, OmitImmerable } from './immerable';

export class Task extends Immerable {
  public readonly name: string;

  public constructor(data: TaskInitArgs) {
    super();
    this.name = data.name;
  }
}

type TaskInitArgs = OmitImmerable<Task>;
