import {ChargeService} from '@module/organization/services/charge.service';
import {CostCenterService} from '@module/organization/services/cost-center.service';
import {LevelService} from '@module/organization/services/level.service';
import {StepService} from '@module/organization/services/step.service';
import {WorkflowService} from '@module/organization/services/workflow.service';
import {AddressService} from '@module/organization/services/address.service';
import {DepartmentService} from '@module/organization/services/department.service';
import {FunctionService} from '@module/organization/services/function.service';

export const services: any[] = [
  AddressService,
  ChargeService,
  CostCenterService,
  DepartmentService,
  FunctionService,
  LevelService,
  StepService,
  WorkflowService
];

export * from '@module/organization/services/address.service';
export * from '@module/organization/services/charge.service';
export * from '@module/organization/services/cost-center.service';
export * from '@module/organization/services/department.service';
export * from '@module/organization/services/function.service';
export * from '@module/organization/services/level.service';
export * from '@module/organization/services/step.service';
export * from '@module/organization/services/workflow.service';
