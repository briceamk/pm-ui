import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Address} from '@module/organization/models';
import {Observable} from 'rxjs';
import {API_URL_ORGANIZATION} from '@module/organization/constants';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _http: HttpClient) { }

  create(address: Address): Observable<Address> {
    return this._http.post<Address>(API_URL_ORGANIZATION + `/addresses`, address);
  }

  update(address: Address): Observable<Address> {
    return this._http.put<Address>(API_URL_ORGANIZATION + `/addresses`, address);
  }

  findAll(): Observable<any> {
    return this._http.get<any>(
      API_URL_ORGANIZATION + `/addresses`
    );
  }

  removes(ids: string[]): Observable<string[]> {
    return this._http.delete<string[]>(
      API_URL_ORGANIZATION + `/address/many/${ids}`
    );
  }
}
