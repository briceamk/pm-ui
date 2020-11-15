import {Role} from '@module/auth/models';
import {Company} from '@module/company/models';

export interface Function {
  id: string;
  code: string;
  name: string;
  type: string; // can be DEPARTMENT or COST_CENTER
  roleDtos: Role[];
  companyDto: Company;
}
