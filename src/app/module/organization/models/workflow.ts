import {Level} from '@module/organization/models/level';
import {Company} from '@module/company/models';

export interface Workflow {
  id: string;
  code: string;
  name: string;
  description: string;
  active: boolean;
  levelDtos: Level[];
  companyDto: Company;
}
