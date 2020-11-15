import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Mail} from '@module/notification/models';
import * as fromStore from '@module/notification/store';
import * as fromRoot from '@store/index';

@Component({
  selector: 'pm-mail-form-view',
  templateUrl: './mail-form-view.component.html',
  styleUrls: ['./mail-form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailFormViewComponent implements OnInit {

  mail$: Observable<Mail>;
  mailEntities$: Observable<{[id: string]: Mail}>;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private _store: Store<fromStore.NotificationState>) { }

  ngOnInit(): void {
    this.loading$ = this._store.select(fromStore.selectMailLoading);
    this.error$ = this._store.select(fromStore.selectMailErrorMsg);
    this.mail$ = this._store.select(fromStore.selectSelectedMail);
    this.mailEntities$ = this._store.select(fromStore.selectMailEntities);
  }

  onCreate($event: Mail) {
    this._store.dispatch(fromStore.CreateMail({mail: $event}));
  }
  onUpdate($event: Mail) {
    this._store.dispatch(fromStore.UpdateMail({mail: $event}));
  }
  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveMail({ids: $event}))
  }
  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
