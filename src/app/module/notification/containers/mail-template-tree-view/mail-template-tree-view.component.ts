import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {MailTemplate} from '@module/notification/models';
import * as fromStore from '@module/notification/store';
import * as fromRoot from '@store/index';

@Component({
  selector: 'pm-mail-template-tree-view',
  templateUrl: './mail-template-tree-view.component.html',
  styleUrls: ['./mail-template-tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailTemplateTreeViewComponent implements OnInit {

  mailTemplates$: Observable<MailTemplate[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  mailTemplateEntities$: Observable<{ [id: string]: MailTemplate }>;

  constructor(private _store: Store<fromStore.NotificationState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadMailTemplates());
    this.error$ = this._store.select(fromStore.selectMailTemplateErrorMsg);
    this.loading$ = this._store.select(fromStore.selectMailTemplateLoading);
    this.mailTemplates$ = this._store.select(fromStore.selectAllMailTemplates);
    this.mailTemplateEntities$ = this._store.select(fromStore.selectMailTemplateEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveMailTemplates({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
