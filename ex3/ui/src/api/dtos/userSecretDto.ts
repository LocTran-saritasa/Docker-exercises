/** User secret dto. */
export interface UserSecretDto {

  /** Token dto. */
  readonly authenticate: {

    /** Access token. */
    readonly jwtToken: string;
  };
}
