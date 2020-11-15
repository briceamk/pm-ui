import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MailTemplate} from '@module/notification/models';
import {API_URL_NOTIFICATION} from '@module/notification/constants';

@Injectable({
  providedIn: 'root'
})
export class MailTemplateService {

  constructor(private _http: HttpClient) { }

  create(mailTemplate: MailTemplate): Observable<MailTemplate> {
    return this._http.post<MailTemplate>(API_URL_NOTIFICATION + `/mail-templates`, mailTemplate);
  }

  update(mailTemplate: MailTemplate): Observable<MailTemplate> {
    return this._http.put<MailTemplate>(API_URL_NOTIFICATION + `/mail-templates`, mailTemplate);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_NOTIFICATION  + `/mail-templates`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    console.log(API_URL_NOTIFICATION + `/mail-templates/many/${ids}`)
    return this._http.delete<string[]>(
      API_URL_NOTIFICATION + `/mail-templates/many/${ids}`
    );
  }
}
