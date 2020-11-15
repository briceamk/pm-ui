import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Charge} from '@module/organization/models';
import {Observable} from 'rxjs';
import {API_URL_ORGANIZATION} from '@module/organization/constants';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  constructor(private _http: HttpClient) { }

  create(charge: Charge): Observable<Charge> {
    return this._http.post<Charge>(API_URL_ORGANIZATION + `/charges`, charge);
  }

  update(charge: Charge): Observable<Charge> {
    return this._http.put<Charge>(API_URL_ORGANIZATION + `/charges`, charge);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_ORGANIZATION + `/charges`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_ORGANIZATION + `/charges/many/${ids}`
    );
  }
}
