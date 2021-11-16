import { Site } from './Site'
import { Status } from './Status'
import { Type } from './Type'

export interface Test {
  id: number;
  name: string;
  type: Type;
  status: Status;
  siteId: Site['id'];
}

export type FullTest = Test & {site?: string}

export enum TestTableHeaders {
  name = 'name',
  type = 'type',
  status = 'status',
  site = 'site'
}

export type TestHeaders = keyof Pick<FullTest, `${TestTableHeaders}`>
