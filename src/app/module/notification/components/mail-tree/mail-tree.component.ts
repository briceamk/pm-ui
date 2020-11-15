import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

import { Mail } from '@module/notification/models';
import * as fromShare from '@share/index';
import { mailStateLabels } from '@module/notification/constants';


@Component({
  selector: 'pm-mail-tree',
  templateUrl: './mail-tree.component.html',
  styleUrls: ['./mail-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailTreeComponent implements OnInit, OnChanges {
  @Input() error: any;
  @Input() loading: boolean = true;
  @Input() mails: Mail[];
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <
    fromShare.models.PaginationSetting
  >{};
  title: string;
  newRoute = `/notification/mails/new`;
  transformedMails: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title) {
    this._title.setTitle('Emails - PM');
  }

  ngOnInit(): void {
    this.title = 'Emails';
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 5;
    this.paginationSetting.pageSizeOptions = [5, 10, 25];
    this.paginationSetting.showFirstLastButton = true;
    this.columnSettings = [
      {
        name: 'emailTo',
        displayName: 'Destinataire',
        disableSorting: false,
      },
      {
        name: 'subject',
        displayName: 'Objet',
        disableSorting: false,
      },
      {
        name: 'creationDate',
        displayName: 'Crée le',
        disableSorting: false,
      },
      {
        name: 'sendDate',
        displayName: 'Envoyé le',
        disableSorting: false,
      },
      {
        name: 'state',
        displayName: 'Status',
        disableSorting: false,
      },
      {
        name: 'company',
        displayName: 'Société',
        disableSorting: false,
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.mails.length !== 0) {
      this.transformedMails = this.mails.map((mail) => this.transform(mail));
    }
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM App');
      this.error = null;
    }
  }

  onNavigate($event: Mail): void {
    this.navigate.emit('/notification/mails/details/' + $event.id);
  }

  onRemoves($event: Mail[]): void {
    this.removes.emit($event.map((event) => event.id));
  }

  transform(mail: Mail): any {
    mail = this.getStateLabel(mail);
    return { ...mail, company: mail.companyDto.name };
  }

  getStateLabel(mail: Mail): Mail {
    let label = mailStateLabels.find(
      (mailStateLabel) =>
        Object.keys(mailStateLabel)[0].toUpperCase() === mail.state
    );
    return { ...mail, state: label[Object.keys(label)[0]] } as Mail;
  }
}
