import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends Immerable {
  /** User id. */
  public readonly id: number;

  /** First name. */
  public readonly firstname: string;

  /** Last name. */
  public readonly lastname: string;

  /** Name. */
  public readonly email: string;

  public constructor(data: UserInitArgs) {
    super();
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
  }
}

type UserInitArgs = OmitImmerable<User>;
