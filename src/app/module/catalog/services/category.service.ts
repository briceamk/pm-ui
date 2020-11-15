import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Category} from '@module/catalog/models';
import {API_URL_CATALOG} from '@module/catalog/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  create(category: Category): Observable<Category> {
    return this._http.post<Category>(API_URL_CATALOG + `/categories`, category);
  }

  update(category: Category): Observable<Category> {
    return this._http.put<Category>(API_URL_CATALOG + `/categories`, category);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_CATALOG +  `/categories`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_CATALOG + `/categories/many/${ids}`
    );
  }
}
