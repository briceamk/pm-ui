import {Company} from '@module/company/models';

export interface JobInfo {
  id: string;
  jobName: string;
  jobGroup: string;
  jobClass: string;
  cronExpression: string;
  repeatTime: number;
  cronJob: boolean;
  state: string;
  companyDto: Company
}
