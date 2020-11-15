import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromRoot from '@store/index';
import * as fromStore from '@module/notification/store';
import {MailServer} from '@module/notification/models';

@Component({
  selector: 'pm-mail-server-tree-view',
  templateUrl: './mail-server-tree-view.component.html',
  styleUrls: ['./mail-server-tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailServerTreeViewComponent implements OnInit {

  mailServers$: Observable<MailServer[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  mailServerEntities$: Observable<{ [id: string]: MailServer }>;

  constructor(private _store: Store<fromStore.NotificationState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadMailServers());
    this.error$ = this._store.select(fromStore.selectMailServerErrorMsg);
    this.loading$ = this._store.select(fromStore.selectMailServerLoading);
    this.mailServers$ = this._store.select(fromStore.selectAllMailServers);
    this.mailServerEntities$ = this._store.select(fromStore.selectMailServerEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveMailServers({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
