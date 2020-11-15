import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {MailServer} from '@module/notification/models';
import * as fromStore from '@module/notification/store';
import * as fromRoot from '@store/index';

@Component({
  selector: 'pm-mail-server-form-view',
  templateUrl: './mail-server-form-view.component.html',
  styleUrls: ['./mail-server-form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailServerFormViewComponent implements OnInit {

  mailServer$: Observable<MailServer>;
  mailServerEntities$: Observable<{[id: string]: MailServer}>;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private _store: Store<fromStore.NotificationState>) { }

  ngOnInit(): void {
    this.loading$ = this._store.select(fromStore.selectMailServerLoading);
    this.error$ = this._store.select(fromStore.selectMailServerErrorMsg);
    this.mailServer$ = this._store.select(fromStore.selectSelectedMailServer);
    this.mailServerEntities$ = this._store.select(fromStore.selectMailServerEntities);
  }

  onCreate($event: MailServer) {
    this._store.dispatch(fromStore.CreateMailServer({mailServer: $event}));
  }
  onUpdate($event: MailServer) {
    this._store.dispatch(fromStore.UpdateMailServer({mailServer: $event}));
  }
  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveMailServer({ids: $event}))
  }
  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
