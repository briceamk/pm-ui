import {User} from '@module/auth/models';
import {CostCenter} from '@module/organization/models/cost-center';
import {Level} from '@module/organization/models/level';
import {Department} from '@module/organization/models/department';

export interface Step {
  id: string;
  sequence: string;
  type: string;
  user: User;
  department: Department;
  costCenter: CostCenter;
  level: Level;
}
