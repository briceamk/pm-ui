import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/organization/store/reducers';
import * as fromWorkflow from '@module/organization/store/reducers/workflow.reducer';

import { Workflow } from '@module/organization/models';

const selectWorkflowState = createSelector(
  fromFeature.selectOrganizationState,
  (state: fromFeature.OrganizationState) => state.workflows
);

export const selectWorkflowEntities = createSelector(
  selectWorkflowState,
  fromWorkflow.selectWorkflowEntities
);

export const selectSelectedWorkflow = createSelector(
  selectWorkflowEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Workflow>, params: Params): Workflow => {
    return params && entities[params.workflowId];
  }
);

export const selectWorkflowIds = createSelector(
  selectWorkflowState,
  fromWorkflow.selectWorkflowIds
);

export const selectAllWorkflows = createSelector(
  selectWorkflowState,
  fromWorkflow.selectAllWorkflows
);

export const selectWorkflowLoaded = createSelector(
  selectWorkflowState,
  fromWorkflow.selectWorkflowLoaded
);
export const selectWorkflowLoading = createSelector(
  selectWorkflowState,
  fromWorkflow.selectWorkflowLoading
);

export const selectWorkflowErrorMsg = createSelector(
  selectWorkflowState,
  fromWorkflow.selectWorkflowErrorMsg
);
export const selectWorkflowTotal = createSelector(
  selectWorkflowState,
  fromWorkflow.selectWorkflowTotal
);
