import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

import {JobInfo} from '@module/cron/models';
import * as fromShare from '@share/index';
import {jobInfoStateLabels} from '@module/cron/constants';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfig} from '@share/models';
import {dialogConfig} from '@share/utils/dialog-config';
import {DialogComponent} from '@share/components';


@Component({
  selector: 'pm-job-info-tree',
  templateUrl: './job-info-list.component.html',
  styleUrls: ['./job-info-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobInfoTreeComponent implements OnInit, OnChanges {

  @Input()error: any;
  @Input()loading: boolean = true;
  @Input()jobInfos: JobInfo[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/cron/job-infos/new`;

  constructor(private _toastr: ToastrService, private _title: Title, private _dialog: MatDialog) {
    this._title.setTitle('Tâches planifiées - PM');
  }

  ngOnInit(): void {
    this.title = "Tâches planifiées";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 60;
    this.paginationSetting.pageSizeOptions = [60, 100, 200, 500];
    this.paginationSetting.showFirstLastButton = true;
    this.columnSettings = [
      {
        name: 'jobName',
        displayName: 'Libellé',
        disableSorting: false
      },
      {
        name: 'jobGroup',
        displayName: 'Groupe',
        disableSorting: false
      },
      {
        name: 'jobClass',
        displayName: 'Classe',
        disableSorting: false
      },
      {
        name: 'state',
        displayName: 'Status',
        disableSorting: false
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.jobInfos.length !== 0) {
      this.jobInfos = this.jobInfos.map(jobInfo => this.transform(jobInfo));
    }
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: JobInfo) {
    this.navigate.emit('/cron/job-infos/details/' + $event.id)
  }

  onRemoves($event: JobInfo[]) {
    const dialog: DialogConfig = {...dialogConfig,
      message: $event.length !==1? 'Confimer la suppression de ces tâches planifiées?': 'Confimer la suppression de cette tâche planifiée?'};
    const dialogRef = this._dialog.open(DialogComponent, {
      disableClose: dialog.disableClose,
      data: dialog
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult)
        this.removes.emit($event.map(event => event.id));
    });
  }

  transform(jobInfo: JobInfo): JobInfo {
    return this.getStateLabel(jobInfo);
  }

  getStateLabel(jobInfo: JobInfo): JobInfo {
    let label = jobInfoStateLabels.find(jobInfoStateLabel =>Object.keys(jobInfoStateLabel)[0].toUpperCase()===jobInfo.state);
    return {...jobInfo, state: label[Object.keys(label)[0]]} as JobInfo;
  }

}
