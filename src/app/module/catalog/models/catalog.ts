import {Company} from '@module/company/models';

export interface Catalog {
  id: string;
  name: string;
  description: string;
  active: boolean;
  parentDto: Catalog;
  companyDto: Company;
}
