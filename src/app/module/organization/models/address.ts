import {Company} from '@module/company/models';
import {Department} from '@module/organization/models/department';
import {Partner} from '@module/organization/models/partner';


export interface Address{
id: string;
name: string;
type: 'INVOICING' | 'SHIPPING';
vat: string;
trn: string;
title: string;
firstName: string;
lastName: string;
street: string;
zip: string;
email: string;
phone: string;
mobile: string;
fax: string;
website: string;
city: string;
country: string;
imageHeaderName: string;
imageHeaderType: string;
imageFooterName: string;
imageFooterType: string;
companyDto: Company;
departmentDto: Department;
partnerDto: Partner;
}
