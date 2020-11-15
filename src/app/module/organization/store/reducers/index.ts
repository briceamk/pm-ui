import {
  createFeatureSelector,
  combineReducers,
  Action
} from '@ngrx/store';

import * as fromRoot from '@store/index';
import * as fromAddress from '@module/organization/store/reducers/address.reducer';
import * as fromCharge from '@module/organization/store/reducers/charge.reducer';
import * as fromCostCenter from '@module/organization/store/reducers/cost-center.reducer';
import * as fromDepartment from '@module/organization/store/reducers/department.reducer';
import * as fromFunction from '@module/organization/store/reducers/function.reducer';
import * as fromLevel from '@module/organization/store/reducers/level.reducer';
import * as fromStep from '@module/organization/store/reducers/step.reducer';
import * as fromWorkflow from '@module/organization/store/reducers/workflow.reducer';

export interface OrganizationState {
  addresses: fromAddress.AddressState;
  charges: fromCharge.ChargeState;
  costCenters: fromCostCenter.CostCenterState;
  departments: fromDepartment.DepartmentState;
  functions: fromFunction.FunctionState;
  levels: fromLevel.LevelState;
  steps: fromStep.StepState;
  workflows: fromWorkflow.WorkflowState;
}

export interface State extends fromRoot.State {
  organization: OrganizationState;
}

export function reducers(state: OrganizationState | undefined, action: Action) {
  return combineReducers({
    addresses: fromAddress.addressReducer,
    charges: fromCharge.chargeReducer,
    costCenters: fromCostCenter.costCenterReducer,
    departments: fromDepartment.departmentReducer,
    functions: fromFunction.functionReducer,
    levels: fromLevel.levelReducer,
    steps: fromStep.stepReducer,
    workflows: fromWorkflow.workflowReducer,
  })(state, action);
}

export const selectOrganizationState = createFeatureSelector<OrganizationState>(
  'organization'
);
