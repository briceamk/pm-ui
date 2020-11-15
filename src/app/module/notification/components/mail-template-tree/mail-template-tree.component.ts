import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

import {MailTemplate} from '@module/notification/models';
import * as fromShare from '@share/index';
import {mailTemplateTypeLabels} from '@module/notification/constants';


@Component({
  selector: 'pm-mail-template-tree',
  templateUrl: './mail-template-tree.component.html',
  styleUrls: ['./mail-template-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailTemplateTreeComponent implements OnInit, OnChanges {

  @Input()error: any;
  @Input()loading: boolean;
  @Input()mailTemplates: MailTemplate[];
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();


  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute: string = '/notification/mail-templates/new';
  transformedMailTemplates: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title) {
    this._title.setTitle('Modèles d\'emails - PM');
  }

  ngOnInit(): void {
    this.title = "Modèles de mail";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 5;
    this.paginationSetting.pageSizeOptions = [60, 100, 200, 500];
    this.paginationSetting.showFirstLastButton = true;
    this.columnSettings = [
      {
        name: 'name',
        displayName: 'Libelle',
        disableSorting: false
      },
      {
        name: 'subject',
        displayName: 'Objet',
        disableSorting: false
      },
      {
        name: 'type',
        displayName: 'Type',
        disableSorting: false
      },
      {
        name: 'company',
        displayName: 'Société',
        disableSorting: false
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.transformedMailTemplates = this.mailTemplates.map(mailTemplate => this.transform(mailTemplate));
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: MailTemplate) {
    this.navigate.emit('/notification/mail-templates/details/' + $event.id)
  }

  onRemoves($event: MailTemplate[]) {
    this.removes.emit($event.map(event => event.id));

  }

  transform(mailTemplate: MailTemplate): any {
    mailTemplate =  this.getTypeLabel(mailTemplate);
    return {...mailTemplate, company: mailTemplate.companyDto.name}
  }

  getTypeLabel(mailTemplate: MailTemplate): MailTemplate {
    let label = mailTemplateTypeLabels.find(mailTemplateType =>Object.keys(mailTemplateType)[0].toUpperCase()===mailTemplate.type);
    return {...mailTemplate, type: label[Object.keys(label)[0]]} as MailTemplate;
  }


}
