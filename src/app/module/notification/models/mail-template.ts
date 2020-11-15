import {Company} from '@module/company/models';

export interface MailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: string;
  companyDto: Company;
}
