import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Workflow} from '@module/organization/models';
import {Observable} from 'rxjs';
import {API_URL_ORGANIZATION} from '@module/organization/constants';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private _http: HttpClient) { }

  create(workflow: Workflow): Observable<Workflow> {
    return this._http.post<Workflow>(API_URL_ORGANIZATION + `/workflows`, workflow);
  }

  update(workflow: Workflow): Observable<Workflow> {
    return this._http.put<Workflow>(API_URL_ORGANIZATION + `/workflows`, workflow);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_ORGANIZATION + `/workflows`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_ORGANIZATION + `/workflows/many/${ids}`
    );
  }
}
