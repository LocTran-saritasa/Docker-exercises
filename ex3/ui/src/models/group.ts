import { Immerable, OmitImmerable } from './immerable';

export class Group extends Immerable {
  public readonly name: string;

  public constructor(data: GroupInitArgs) {
    super();
    this.name = data.name;
  }
}

type GroupInitArgs = OmitImmerable<Group>;
