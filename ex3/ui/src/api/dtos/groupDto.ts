/** Group dto. */
export interface GroupDto {

  /** Id. */
  readonly id: number;

  /** Name. */
  readonly name: string;
}

/** All groups dto. */
export interface AllGroupsDto {

  /** All groups. */
  readonly allGroups: {

    /** Nodes. */
    readonly nodes: readonly GroupDto[];
  };
}
