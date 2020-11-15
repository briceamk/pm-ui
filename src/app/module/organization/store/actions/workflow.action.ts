import { createAction, props } from '@ngrx/store';
import { Workflow } from '@module/organization/models'
import { Update } from '@ngrx/entity';

export const LoadWorkflows = createAction(
  '[Workflow List Page] Load Workflows '
);
export const LoadWorkflowsSuccess = createAction(
  '[Workflow API] Load Workflows Success',
  props<{ workflows: Workflow[] }>()
);
export const LoadWorkflowsFail = createAction(
  '[Workflow API] Load Workflows Fail',
  props<{ errorMsg: any }>()
);

export const CreateWorkflow = createAction(
  '[Workflow Form Page] Create Workflow ',
  props<{ workflow: Workflow }>()
);
export const CreateWorkflowSuccess = createAction(
  '[Workflow API] Create Workflow Success',
  props<{ workflow: Workflow }>()
);
export const CreateWorkflowFail = createAction(
  '[Workflow API] Create Workflow Fail',
  props<{ errorMsg: any }>()
);
export const UpdateWorkflow = createAction(
  '[Workflow Form Page] Update Workflow ',
  props<{ workflow: Workflow }>()
);
export const UpdateWorkflowSuccess = createAction(
  '[Workflow API] Update Workflow Success',
  props<{ workflow: Update<Workflow> }>()
);
export const UpdateWorkflowFail = createAction(
  '[Workflow API] Update Workflow Fail',
  props<{ errorMsg: any }>()
);

export const RemoveWorkflow = createAction(
  '[Workflow Form Page] Remove Workflow ',
  props<{ ids: string[] }>()
);
export const RemoveWorkflowSuccess = createAction(
  '[Workflow API] Remove Workflow Success',
  props<{ ids: string[] }>()
);
export const RemoveWorkflowFail = createAction(
  '[Workflow API] Remove Workflow Fail',
  props<{ errorMsg: any }>()
);


export const RemoveWorkflows = createAction(
  '[Workflow List Page] Remove Workflows ',
  props<{ ids: string[] }>()
);
export const RemoveWorkflowsSuccess = createAction(
  '[Workflow API] Remove Workflows Success',
  props<{ ids: string[] }>()
);
export const RemoveWorkflowsFail = createAction(
  '[Workflow API] Remove Workflows Fails',
  props<{ errorMsg: any }>()
);
