import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromWorkflow from '@module/organization/store/actions';
import {Workflow} from '@module/organization/models';

export interface WorkflowState extends EntityState<Workflow> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Workflow> = createEntityAdapter<Workflow>({
  selectId: model => model.id,
  sortComparer: (workflow1: Workflow, workflow2: Workflow): number =>
    workflow1.name.localeCompare(workflow2.name)
});

export const initialState: WorkflowState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const workflowReducer = createReducer(
  initialState,
  on(fromWorkflow.LoadWorkflows, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromWorkflow.LoadWorkflowsSuccess, (state, { workflows }) =>
    adapter.addMany(workflows, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromWorkflow.CreateWorkflow,
    fromWorkflow.UpdateWorkflow,
    (state, { workflow }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMsg: null
      };
    }
  ),
  on(fromWorkflow.CreateWorkflowSuccess, (state, { workflow }) =>
    adapter.addOne(workflow, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromWorkflow.UpdateWorkflowSuccess, (state, { workflow }) =>
    adapter.updateOne(workflow, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),

  on(
    fromWorkflow.RemoveWorkflowSuccess,
    fromWorkflow.RemoveWorkflowsSuccess,
    (state, { ids }) => {
      return adapter.removeMany(ids, {
        ...state,
        loading: false,
        loaded: true,
        errorMsg: null
      });
    }),

  on(
    fromWorkflow.LoadWorkflowsFail,
    fromWorkflow.CreateWorkflowFail,
    fromWorkflow.UpdateWorkflowFail,
    fromWorkflow.RemoveWorkflowFail,
    fromWorkflow.RemoveWorkflowsFail,
    (state, { errorMsg }) => {
      return {
        ...state,
        loading: false,
        loaded: false,
        errorMsg
      };
    }
  )
);
export function reducer(state: WorkflowState | undefined, action: Action) {
  return workflowReducer(state, action);
}
export const selectWorkflowLoading = (state: WorkflowState) => state.loading;
export const selectWorkflowLoaded = (state: WorkflowState) => state.loaded;
export const selectWorkflowErrorMsg = (state: WorkflowState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectWorkflowIds = selectIds;
export const selectWorkflowEntities = selectEntities;
export const selectAllWorkflows = selectAll;
export const selectWorkflowTotal = selectTotal;
