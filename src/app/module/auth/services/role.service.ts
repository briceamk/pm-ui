import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL_AUTH} from '@module/auth/constants';
import {Role} from '@module/auth/models';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient) { }

  create(role: Role): Observable<Role> {
    return this._http.post<Role>(API_URL_AUTH + `/roles`, role);
  }

  update(role: Role): Observable<Role> {
    return this._http.put<Role>(API_URL_AUTH + `/roles`, role);
  }

  findAll(): Observable<Role[]> {
    return this._http.get<Role[]>(
      API_URL_AUTH +  `/roles`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_AUTH + `/roles/many/${ids}`
    );
  }
}
