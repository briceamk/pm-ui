import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {JobInfo} from '@module/cron/models';
import {API_URL_JOB_INFO} from '@module/cron/constants';

@Injectable({
  providedIn: 'root'
})
export class JobInfoService {

  constructor(private _http: HttpClient) { }

  create(jobInfo: JobInfo): Observable<JobInfo> {
      return this._http.post<JobInfo>(API_URL_JOB_INFO + `/job-infos`, jobInfo);
  }

  update(jobInfo: JobInfo): Observable<JobInfo> {
    return this._http.put<JobInfo>(API_URL_JOB_INFO + `/job-infos`, jobInfo);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_JOB_INFO + `/job-infos`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_JOB_INFO + `/job-infos/many/${ids}`
    );
  }
}
