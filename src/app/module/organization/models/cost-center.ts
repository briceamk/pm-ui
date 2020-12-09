import {Company} from '@module/company/models';
import {WorkflowInstance} from '@module/organization/models/workflow-instance';

export interface CostCenter {
  id: string;
  code: string;
  name: string;
  externalId: string;
  workflowInstanceDtos: WorkflowInstance[];
  companyDto: Company;
}
