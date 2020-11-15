import {Company} from '@module/company/models';

export interface Mail {
  id: string;
  subject: string;
  emailTo;
  string;
  emailCc: string;
  emailCci;
  content: string;
  relatedClass: string;
  relatedObjectId: string;
  reference: string;
  sendDate: Date;
  creationDate: Date;
  state: string;
  companyDto: Company;
}
