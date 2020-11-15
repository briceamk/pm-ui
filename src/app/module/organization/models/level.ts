import {Workflow} from '@module/organization/models/workflow';
import {Step} from '@module/organization/models/step';

export interface Level {
  id: string;
  amount: number;
  workflow: Workflow;
  stepDtos: Step[];

}
