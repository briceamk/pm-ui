import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL_NOTIFICATION} from '@module/notification/constants';
import {MailServer} from '@module/notification/models';

@Injectable({
  providedIn: 'root'
})
export class MailServerService {

  constructor(private _http: HttpClient) { }

  create(mailServer: MailServer): Observable<MailServer> {
    return this._http.post<MailServer>(API_URL_NOTIFICATION + `/mail-servers`, mailServer);
  }

  update(mailServer: MailServer): Observable<MailServer> {
    return this._http.put<MailServer>(API_URL_NOTIFICATION + `/mail-servers`, mailServer);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_NOTIFICATION  + `/mail-servers`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_NOTIFICATION + `/mail-servers/many/${ids}`
    );
  }
}
