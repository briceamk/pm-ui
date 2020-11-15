import {Role} from '@module/auth/models';

export interface Function {
  id: string;
  code: string;
  name: string;
  type: string; // can be DEPARTMENT or COST_CENTER
  roleDtos: Role[];
}
