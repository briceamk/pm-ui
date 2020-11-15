import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL_AUTH} from '@module/auth/constants';
import {User} from '@module/auth/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  create(user: User): Observable<User> {
    return this._http.post<User>(API_URL_AUTH + `/users`, user);
  }

  update(user: User): Observable<User> {
    return this._http.put<User>(API_URL_AUTH + `/users`, user);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_AUTH +  `/users`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_AUTH + `/users/many/${ids}`
    );
  }
}
