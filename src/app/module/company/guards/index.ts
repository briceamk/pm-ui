import { CompanyGuard } from '@module/company/guards/company.guard';
import {CompanyImageGuard} from '@module/company/guards/company-image.guard';

export const guards: any[] = [CompanyGuard, CompanyImageGuard];

export * from '@module/company/guards/company.guard';
export * from '@module/company/guards/company-image.guard';
