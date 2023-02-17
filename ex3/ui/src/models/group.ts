import { Immerable, OmitImmerable } from './immerable';

export class Group extends Immerable {
  public readonly id: number;
  public readonly name: string;

  public constructor(data: GroupInitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
  }
}

type GroupInitArgs = OmitImmerable<Group>;
