export interface GroupDto {
  readonly name: string;
}

export interface AllGroupsDto {
  readonly allGroups: {
    readonly nodes: readonly GroupDto[]
  }
}
