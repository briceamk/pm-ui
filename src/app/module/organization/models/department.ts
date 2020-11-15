import {CostCenter} from '@module/organization/models/cost-center';
import {User} from '@module/auth/models';
import {Address} from '@module/organization/models/address';


export interface Department {
  id: string;
  code: string;
  name: string;
  parentDto: Department;
  costCenterDto: CostCenter;
  addressDto: Address;
  userDtos: User[];
  addressDtos: Address[];
}
