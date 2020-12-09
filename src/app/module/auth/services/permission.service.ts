import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL_AUTH} from '@module/auth/constants';
import {Permission} from '@module/auth/models';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private _http: HttpClient) { }

  create(permission: Permission): Observable<Permission> {
    return this._http.post<Permission>(API_URL_AUTH + `/permissions`, permission);
  }

  update(permission: Permission): Observable<Permission> {
    return this._http.put<Permission>(API_URL_AUTH + `/permissions`, permission);
  }

  findAll(): Observable<Permission[]> {
    return this._http.get<Permission[]>(
      API_URL_AUTH +  `/permissions`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_AUTH + `/permissions/many/${ids}`
    );
  }
}
