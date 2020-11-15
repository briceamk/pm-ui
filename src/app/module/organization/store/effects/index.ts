import {ChargeEffect} from '@module/organization/store/effects/charge.effect';
import {CostCenterEffect} from '@module/organization/store/effects/cost-center.effect';
import {LevelEffect} from '@module/organization/store/effects/level.effect';
import {StepEffect} from '@module/organization/store/effects/step.effect';
import {WorkflowEffect} from '@module/organization/store/effects/workflow.effect';
import {AddressEffect} from '@module/organization/store/effects/address.effect';
import {DepartmentEffect} from '@module/organization/store/effects/department.effect';
import {FunctionEffect} from '@module/organization/store/effects/function.effect';

export const effects: any[] = [
  AddressEffect,
  ChargeEffect,
  CostCenterEffect,
  DepartmentEffect,
  FunctionEffect,
  LevelEffect,
  StepEffect,
  WorkflowEffect
];

export * from '@module/organization/store/effects/address.effect';
export * from '@module/organization/store/effects/charge.effect';
export * from '@module/organization/store/effects/cost-center.effect';
export * from '@module/organization/store/effects/department.effect';
export * from '@module/organization/store/effects/function.effect';
export * from '@module/organization/store/effects/level.effect';
export * from '@module/organization/store/effects/step.effect';
export * from '@module/organization/store/effects/workflow.effect';
