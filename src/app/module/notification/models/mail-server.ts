import {Company} from '@module/company/models';

export interface MailServer {
  id: string;
  hostname: string;
  port: string;
  username: string;
  password: string;
  enableSSL: boolean;
  enableAuth: boolean;
  type: string;
  state: string;
  defaultServer: boolean;
  companyDto: Company
}
