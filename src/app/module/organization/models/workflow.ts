import {Level} from '@module/organization/models/level';

export interface Workflow {
  id: string;
  code: string;
  name: string;
  description: string;
  active: boolean;
  levelDtos: Level[];
}
