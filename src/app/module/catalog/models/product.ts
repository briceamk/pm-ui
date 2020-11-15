import {Category} from './category';
import {Catalog} from './catalog';
import {Company} from '@module/company/models';

export interface Product {
  id: string;
  reference: string;
  name: string;
  description: string;
  standardCostPrice: number;
  imageName: string;
  imageType: string;
  active: boolean;
  categoryDto: Category;
  catalogDto: Catalog;
  companyDto: Company;
}
