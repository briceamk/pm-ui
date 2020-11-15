import {Company} from '@module/company/models';

export interface Charge {
  id: string;
  code: string;
  name: string;
  isInternational: boolean;
  active: boolean;
  companyDto: Company;
}
