import {AddressGuard} from '@module/organization/guards/address.guard';
import {ChargeGuard} from '@module/organization/guards/charge.guard';
import {CostCenterGuard} from '@module/organization/guards/cost-center.guard';
import {DepartmentGuard} from '@module/organization/guards/department.guard';
import {RoleGuard} from '@module/organization/guards/role.guard';
import {LevelGuard} from '@module/organization/guards/level.guard';
import {StepGuard} from '@module/organization/guards/step.guard';
import {WorkflowGuard} from '@module/organization/guards/workflow.guard';
import {AddressImageGuard} from '@module/organization/guards/address-image.guard';

export const guards: any[] = [
  AddressGuard,
  AddressImageGuard,
  ChargeGuard,
  CostCenterGuard,
  DepartmentGuard,
  RoleGuard,
  LevelGuard,
  StepGuard,
  WorkflowGuard
];

export * from '@module/organization/guards/address.guard';
export * from '@module/organization/guards/address-image.guard';
export * from '@module/organization/guards/charge.guard';
export * from '@module/organization/guards/cost-center.guard';
export * from '@module/organization/guards/department.guard';
export *  from '@module/organization/guards/role.guard';
export * from '@module/organization/guards/level.guard';
export * from '@module/organization/guards/step.guard';
export * from '@module/organization/guards/workflow.guard';
