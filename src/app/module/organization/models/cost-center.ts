import {User} from '@module/auth/models';
import {Workflow} from '@module/organization/models/workflow';
import {Company} from '@module/company/models';

export interface CostCenter {
  id: string;
  code: string;
  name: string;
  externalId: string;
  userDtos: User[];
  workflowDtos: Workflow[];
  functionDtos: Function[];
  companyDto: Company;
}
