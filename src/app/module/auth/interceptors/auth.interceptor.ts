import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import {first, mergeMap, take} from 'rxjs/operators';
import * as fromFeature from '@module/auth/store';
import {SignInResponse} from '@module/auth/models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _store: Store<fromFeature.SecurityState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this._store.select(fromFeature.selectAuthProfile).pipe(
      first(),
      mergeMap((profile: SignInResponse) => {
        if (profile && profile.accessToken !== null) {
          // we check is access token is expired before fire request
          this._store.dispatch(fromFeature.CheckIfAccessTokenIsExpired({signInResponse: profile}));
          let isNotExpired = this._store.select(fromFeature.selectAccessTokenIsNotExpired).pipe(take(1)).toPromise();
          if(isNotExpired) {
            const authReq =
              profile && profile.accessToken
                ? req.clone({
                  setHeaders: {
                    Authorization: 'Bearer ' + profile.accessToken
                  }
                })
                : req;
            return next.handle(authReq);
          } else {
            this._store.dispatch(fromFeature.SignOut());
          }
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
