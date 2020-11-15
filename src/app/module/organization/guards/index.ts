import {AddressGuard} from '@module/organization/guards/address.guard';
import {ChargeGuard} from '@module/organization/guards/charge.guard';
import {CostCenterGuard} from '@module/organization/guards/cost-center.guard';
import {DepartmentGuard} from '@module/organization/guards/department.guard';
import {FunctionGuard} from '@module/organization/guards/function.guard';
import {LevelGuard} from '@module/organization/guards/level.guard';
import {StepGuard} from '@module/organization/guards/step.guard';
import {WorkflowGuard} from '@module/organization/guards/workflow.guard';

export const guards: any[] = [
  AddressGuard,
  ChargeGuard,
  CostCenterGuard,
  DepartmentGuard,
  FunctionGuard,
  LevelGuard,
  StepGuard,
  WorkflowGuard
];

export * from '@module/organization/guards/charge.guard';
export * from '@module/organization/guards/charge.guard';
export * from '@module/organization/guards/cost-center.guard';
export * from '@module/organization/guards/department.guard';
export *  from '@module/organization/guards/function.guard';
export * from '@module/organization/guards/level.guard';
export * from '@module/organization/guards/step.guard';
export * from '@module/organization/guards/workflow.guard';
