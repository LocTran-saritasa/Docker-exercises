/** User secret dto. */
export interface UserSecretDto {

  readonly authenticate: {

    /** Access token. */
    readonly jwtToken: string;
  }

}
