import {User} from '@module/auth/models';
import {CostCenter} from '@module/organization/models/cost-center';
import {Level} from '@module/organization/models/level';

export interface Step {
  id: string;
  sequence: string;
  type: string;
  user: User;
  department: any; //TODO change to Department
  costCenter: CostCenter;
  level: Level;
}
