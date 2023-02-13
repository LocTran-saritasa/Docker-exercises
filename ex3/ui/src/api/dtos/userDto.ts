/** User DTO. */
export interface UserDto {

  userProfile: {

    /** Id. */
    readonly id: number;

    /** First name. */
    readonly firstname: string;

    /** Last name. */
    readonly lastname: string;

    /** Email. */
    readonly email: string;
  }

}
