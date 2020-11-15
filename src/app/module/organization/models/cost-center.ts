import {User} from '@module/auth/models';
import {Workflow} from '@module/organization/models/workflow';

export interface CostCenter {
  id: string;
  code: string;
  name: string;
  externalId: string;
  userDtos: User[];
  workflowDtos: Workflow[];
  functionDtos: Function[];
}
