
import {Company} from '@module/company/models';
import {Permission} from '@module/auth/models/permission';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  city: string;
  mobile: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enable: boolean;
  companyDto: Company;
  roleDtos: Permission[];
}
