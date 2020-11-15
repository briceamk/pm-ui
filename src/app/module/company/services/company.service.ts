import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {API_URL_COMPANY} from '@module/company/contants';
import {Company} from '@module/company/models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private _http: HttpClient) { }

  create(company: Company): Observable<Company> {
    return this._http.post<Company>(API_URL_COMPANY + `/companies`, company);
  }

  update(company: Company): Observable<Company> {
    return this._http.put<Company>(API_URL_COMPANY + `/companies`, company);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_COMPANY + `/companies`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_COMPANY + `/companies/many/${ids}`
    );
  }

  upload(id: string, logo: File): Observable<Company> {
    const formData: FormData = new FormData();
    formData.append('image', logo, logo.name);
    return this._http.put<Company>(
      API_URL_COMPANY + `/companies/upload/${id}`,
      formData
    );
  }

  download(id: string): Observable<any> {
    return this._http.get<any>(
      API_URL_COMPANY + `/companies/download/string/${id}`,
    );
  }
}
