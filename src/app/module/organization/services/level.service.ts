import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Level} from '@module/organization/models';
import {Observable} from 'rxjs';
import {API_URL_ORGANIZATION} from '@module/organization/constants';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private _http: HttpClient) { }

  create(level: Level): Observable<Level> {
    return this._http.post<Level>(API_URL_ORGANIZATION + `/levels`, level);
  }

  update(level: Level): Observable<Level> {
    return this._http.put<Level>(API_URL_ORGANIZATION + `/levels`, level);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_ORGANIZATION + `/levels`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_ORGANIZATION + `/levels/many/${ids}`
    );
  }
}
