import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Role} from '@module/organization/models';
import {Observable} from 'rxjs';
import {API_URL_ORGANIZATION} from '@module/organization/constants';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient) { }

  create(role: Role): Observable<Role> {
    return this._http.post<Role>(API_URL_ORGANIZATION + `/roles`, role);
  }

  update(role: Role): Observable<Role> {
    return this._http.put<Role>(API_URL_ORGANIZATION + `/roles`, role);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_ORGANIZATION + `/roles`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_ORGANIZATION + `/roles/many/${ids}`
    );
  }
}
