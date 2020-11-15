import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';

import {Observable} from 'rxjs';

import { MailTemplate } from '@module/notification/models';
import * as fromStore from '@module/notification/store';
import * as fromRoot from '@store/index';


@Component({
  selector: 'pm-mail-template-form-view',
  templateUrl: './mail-template-form-view.component.html',
  styleUrls: ['./mail-template-form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailTemplateFormViewComponent implements OnInit {

  mailTemplate$: Observable<MailTemplate>;
  mailTemplateEntities$: Observable<{[id: string]: MailTemplate}>;

  constructor(private _store: Store<fromStore.NotificationState>) { }

  ngOnInit(): void {
    this.mailTemplate$ = this._store.select(fromStore.selectSelectedMailTemplate);
    this.mailTemplateEntities$ = this._store.select(fromStore.selectMailTemplateEntities);
  }

  onCreate($event: MailTemplate) {
    this._store.dispatch(fromStore.CreateMailTemplate({mailTemplate: $event}));
  }
  onUpdate($event: MailTemplate) {
    this._store.dispatch(fromStore.UpdateMailTemplate({mailTemplate: $event}));
  }
  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveMailTemplate({ids: $event}))
  }
  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
