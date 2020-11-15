import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Catalog} from '@module/catalog/models';
import {API_URL_CATALOG} from '@module/catalog/constants';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private _http: HttpClient) { }

  create(catalog: Catalog): Observable<Catalog> {
    return this._http.post<Catalog>(API_URL_CATALOG + `/catalogs`, catalog);
  }

  update(catalog: Catalog): Observable<Catalog> {
    return this._http.put<Catalog>(API_URL_CATALOG + `/catalogs`, catalog);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_CATALOG +  `/catalogs`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_CATALOG + `/catalogs/many/${ids}`
    );
  }
}
