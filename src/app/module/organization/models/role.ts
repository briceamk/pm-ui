import {Permission} from '@module/auth/models';
import {Company} from '@module/company/models';

export interface Role {
  id: string;
  name: string;
  type: 'DEPARTMENT' | 'COST_CENTER';
  permissionDtos: Permission[];
  companyDto: Company;
}
