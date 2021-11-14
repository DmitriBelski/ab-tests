import { Site } from "./Site";
import { Status } from "./Status";
import { Type } from "./Type";

export interface Test {
  id: number;
  name: string;
  type: Type;
  status: Status;
  siteId: Site['id'];
}
