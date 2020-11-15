import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';

import { JwtHelperService } from "@auth0/angular-jwt";

import * as models from '@module/auth/models';
import {API_URL_AUTH} from '@module/auth/constants';

import * as fromShare from '@share/index';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  signIn(signInRequest: models.SignInRequest): Observable<models.SignInResponse> {
    return this._http.post<models.SignInResponse>(
      API_URL_AUTH + `/sign-in`,
      signInRequest
    );
  }

  signUp(signUpRequest: models.SignUpRequest): Observable<fromShare.models.ResponseApi> {
    return this._http.post<fromShare.models.ResponseApi>(
      API_URL_AUTH + `/sign-up`,
      signUpRequest
    );
  }

  resetPassword(resetPassword: models.ResetPassword, userId: String): Observable<fromShare.models.ResponseApi> {
    return this._http.post<fromShare.models.ResponseApi>(
      API_URL_AUTH + `/reset-password/${userId}`,
      resetPassword
    );
  }

  backupToken(signInResponse: models.SignInResponse): Observable<boolean> {
    if(localStorage.getItem('accessToken')) {
      localStorage.removeItem('accessToken');
    }
    if(localStorage.getItem('loggedIn')) {
      localStorage.removeItem('loggedIn');
    }
    localStorage.setItem('accessToken', signInResponse.accessToken);
    localStorage.setItem('loggedIn', 'true');
    return of(true);
  }

  checkToken(): boolean {
    if(localStorage.getItem('loggedIn')) {
      if(localStorage.getItem('accessToken')) {
        // check if it's valid token then return true of false
        return true;
      } else {
        // accessToken is invalid
        return false;
      }
    }
    else {
      return false;
    }
  }

  signOut(): Observable<any> {
    if(localStorage.getItem('accessToken')) {
      localStorage.removeItem('accessToken');
    }
    if(localStorage.getItem('loggedIn')) {
      localStorage.removeItem('loggedIn');
    }
    return of(null);
  }

  isAccessTokenExpired(accessToken: string): Observable<boolean> {
    const tokenService = new JwtHelperService();
    if(tokenService.isTokenExpired(accessToken)) {
      return of(true)
    }
    return of(false);
  }

  extractProfileDto(accessToken: string): models.SignInResponse {
    const tokenService = new JwtHelperService();
    if(tokenService.isTokenExpired(accessToken))
      return null;
    let signInResponse: models.SignInResponse = tokenService.decodeToken(accessToken) as models.SignInResponse;
    signInResponse.accessToken = accessToken;
    return signInResponse;
  }
}
