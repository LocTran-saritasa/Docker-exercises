export interface GroupDto {
  readonly id: number;
  readonly name: string;
}

export interface AllGroupsDto {
  readonly allGroups: {
    readonly nodes: readonly GroupDto[]
  }
}
