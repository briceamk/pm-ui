import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Mail} from '@module/notification/models';
import {Observable} from 'rxjs';
import {API_URL_NOTIFICATION} from '@module/notification/constants';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private _http: HttpClient) { }

  create(mail: Mail): Observable<Mail> {
    return this._http.post<Mail>(API_URL_NOTIFICATION + `/mails`, mail);
  }

  update(mail: Mail): Observable<Mail> {
    return this._http.put<Mail>(API_URL_NOTIFICATION + `/mails`, mail);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_NOTIFICATION  + `/mails`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_NOTIFICATION + `/mails/many/${ids}`
    );
  }
}
