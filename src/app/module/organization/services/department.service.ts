import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Department} from '@module/organization/models';
import {Observable} from 'rxjs';
import {API_URL_ORGANIZATION} from '@module/organization/constants';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _http: HttpClient) { }

  create(department: Department): Observable<Department> {
    return this._http.post<Department>(API_URL_ORGANIZATION + `/departments`, department);
  }

  update(department: Department): Observable<Department> {
    return this._http.put<Department>(API_URL_ORGANIZATION + `/departments`, department);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_ORGANIZATION + `/departments`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_ORGANIZATION + `/departments/many/${ids}`
    );
  }
}
