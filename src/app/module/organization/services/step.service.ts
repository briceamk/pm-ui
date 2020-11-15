import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Step} from '@module/organization/models';
import {Observable} from 'rxjs';
import {API_URL_ORGANIZATION} from '@module/organization/constants';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(private _http: HttpClient) { }

  create(step: Step): Observable<Step> {
    return this._http.post<Step>(API_URL_ORGANIZATION + `/steps`, step);
  }

  update(step: Step): Observable<Step> {
    return this._http.put<Step>(API_URL_ORGANIZATION + `/steps`, step);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_ORGANIZATION + `/steps`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_ORGANIZATION + `/steps/many/${ids}`
    );
  }
}
