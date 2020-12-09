import {CostCenter} from '@module/organization/models/cost-center';
import {Workflow} from '@module/organization/models/workflow';
import {Department} from '@module/organization/models/department';

export interface WorkflowInstance {
  type: 'COST_CENTER' | 'DEPARTMENT';
  object: 'EXPRESSION_REQUIREMENT' | 'PURCHASE_REQUISITION';
  workflowDto: Workflow;
  costCenterDto: CostCenter;
  departmentDto: Department;
}
