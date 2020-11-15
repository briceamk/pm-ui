import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CostCenter} from '@module/organization/models';
import {Observable} from 'rxjs';
import {API_URL_ORGANIZATION} from '@module/organization/constants';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService {

  constructor(private _http: HttpClient) { }

  create(costCenter: CostCenter): Observable<CostCenter> {
    return this._http.post<CostCenter>(API_URL_ORGANIZATION + `/cost-centers`, costCenter);
  }

  update(costCenter: CostCenter): Observable<CostCenter> {
    return this._http.put<CostCenter>(API_URL_ORGANIZATION + `/cost-centers`, costCenter);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_ORGANIZATION + `/cost-centers`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_ORGANIZATION + `/cost-centers/many/${ids}`
    );
  }
}
