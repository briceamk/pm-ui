import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';

import {Observable} from 'rxjs';

import {Mail} from '@module/notification/models';
import * as fromStore from '@module/notification/store';
import * as fromRoot from '@store/index';

@Component({
  selector: 'pm-mail-tree-view',
  templateUrl: './mail-tree-view.component.html',
  styleUrls: ['./mail-tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailTreeViewComponent implements OnInit {

  mails$: Observable<Mail[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  mailEntities$: Observable<{ [id: string]: Mail }>;

  constructor(private _store: Store<fromStore.NotificationState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadMails());
    this.error$ = this._store.select(fromStore.selectMailErrorMsg);
    this.loading$ = this._store.select(fromStore.selectMailLoading);
    this.mails$ = this._store.select(fromStore.selectAllMails);
    this.mailEntities$ = this._store.select(fromStore.selectMailEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveMailServers({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }
}
