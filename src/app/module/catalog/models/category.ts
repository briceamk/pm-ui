import {Company} from '@module/company/models';

export interface Category {
  id: string;
  name: string;
  description: string;
  active: boolean;
  parentDto: Category;
  companyDto:Company;
}
