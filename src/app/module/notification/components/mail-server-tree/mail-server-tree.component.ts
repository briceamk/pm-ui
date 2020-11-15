import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

import {MailServer} from '@module/notification/models';
import * as fromShare from '@share/index';
import {mailServerStateLabels, mailServerTypeLabels} from '@module/notification/constants';


@Component({
  selector: 'pm-mail-server-tree',
  templateUrl: './mail-server-tree.component.html',
  styleUrls: ['./mail-server-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailServerTreeComponent implements OnInit, OnChanges {

  @Input()error: any;
  @Input()loading: boolean = true;
  @Input()mailServers: MailServer[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute: string = `/notification/mail-servers/new`;
  transformedMailServers: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title) {
    this._title.setTitle('Serveurs d\'emails - PM');
  }

  ngOnInit(): void {
    this.title = "Serveur Mails";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 5;
    this.paginationSetting.pageSizeOptions = [60, 100, 200, 500];
    this.paginationSetting.showFirstLastButton = true;
    this.columnSettings = [
      {
        name: 'hostname',
        displayName: 'Serveur',
        disableSorting: false
      },
      {
        name: 'port',
        displayName: 'Port',
        disableSorting: false
      },
      {
        name: 'username',
        displayName: 'Login',
        disableSorting: false
      },
      {
        name: 'type',
        displayName: 'Type',
        disableSorting: false
      },
      {
        name: 'state',
        displayName: 'Status',
        disableSorting: false
      },
      {
        name: 'company',
        displayName: 'Société',
        disableSorting: false
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.mailServers.length !== 0) {
      this.transformedMailServers = this.mailServers.map(mailServer => this.transform(mailServer));
    }
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: MailServer) {
    this.navigate.emit('/notification/mail-servers/details/' + $event.id)
  }

  onRemoves($event: MailServer[]) {
    this.removes.emit($event.map(event => event.id));
  }

  transform(mailServer: MailServer): any {
    mailServer = this.getTypeLabel(this.getStateLabel(mailServer));
    return {...mailServer, company: mailServer.companyDto.name}
  }

  getStateLabel(mailServer: MailServer): MailServer {
    let label = mailServerStateLabels.find(mailServerStateLabel =>Object.keys(mailServerStateLabel)[0].toUpperCase()===mailServer.state);
    return {...mailServer, state: label[Object.keys(label)[0]]} as MailServer;
  }

  getTypeLabel(mailServer: MailServer): MailServer {
    let label = mailServerTypeLabels.find(mailServerTypeLabel =>Object.keys(mailServerTypeLabel)[0].toUpperCase()===mailServer.type);
    return {...mailServer, type: label[Object.keys(label)[0]]} as MailServer;
  }

}
