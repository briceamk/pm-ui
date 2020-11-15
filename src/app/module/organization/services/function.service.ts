import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Function} from '@module/organization/models';
import {Observable} from 'rxjs';
import {API_URL_ORGANIZATION} from '@module/organization/constants';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private _http: HttpClient) { }

  create(_function: Function): Observable<Function> {
    return this._http.post<Function>(API_URL_ORGANIZATION + `/functions`, _function);
  }

  update(_function: Function): Observable<Function> {
    return this._http.put<Function>(API_URL_ORGANIZATION + `/functions`, _function);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_ORGANIZATION + `/functions`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_ORGANIZATION + `/_functions/many/${ids}`
    );
  }
}
