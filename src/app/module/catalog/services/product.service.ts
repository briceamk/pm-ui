import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Product} from '@module/catalog/models';
import {API_URL_CATALOG} from '@module/catalog/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  create(product: Product): Observable<Product> {
    return this._http.post<Product>(API_URL_CATALOG + `/products`, product);
  }

  update(product: Product): Observable<Product> {
    return this._http.put<Product>(API_URL_CATALOG + `/products`, product);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_CATALOG +  `/products`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_CATALOG + `/products/many/${ids}`
    );
  }

  upload(id: string, image: File): Observable<Product> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    return this._http.put<Product>(
      API_URL_CATALOG + `/products/upload/${id}`,
      formData
    );
  }

  download(id: string): Observable<any> {
    return this._http.get<any>(
      API_URL_CATALOG + `/products/download/string/${id}`,
    );
  }
}
