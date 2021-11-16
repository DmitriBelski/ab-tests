export enum Status {
  DRAFT = 'DRAFT',
  ONLINE = 'ONLINE',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
}

type StatusFormatArray<T extends string> = Array<T>

export const StatusOrder: StatusFormatArray<Status> = [
  Status.ONLINE,
  Status.PAUSED,
  Status.STOPPED,
  Status.DRAFT
]
