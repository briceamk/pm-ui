import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Workflow} from '@module/organization/models';
import * as fromShare from '@app/share';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfig} from '@share/models';
import {dialogConfig} from '@share/utils/dialog-config';
import {DialogComponent} from '@share/components';

@Component({
  selector: 'pm-workflow-tree',
  templateUrl: './workflow-tree.component.html',
  styleUrls: ['./workflow-tree.component.scss']
})
export class WorkflowTreeComponent implements OnInit {

  @Input()error: any;
  @Input()loading: boolean;
  @Input()workflows: Workflow[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/organization/workflows/new`;
  transformedWorkflows: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title, private _dialog: MatDialog) {
    this._title.setTitle('Workflows - PM');
  }

  ngOnInit(): void {
    this.title = "Workflows";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 60;
    this.paginationSetting.pageSizeOptions = [60, 100, 200, 500];
    this.paginationSetting.showFirstLastButton = true;
    this.columnSettings = [
      {
        name: 'code',
        displayName: 'ID',
        disableSorting: false
      },
      {
        name: 'name',
        displayName: 'Libelle',
        disableSorting: false
      },
      {
        name: 'company',
        displayName: 'Sociéte',
        disableSorting: false
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.transformedWorkflows = this.workflows.map(workflow => this.transform(workflow));
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: Workflow) {
    this.navigate.emit('/organization/workflows/details/' + $event.id)
  }

  onRemoves($event: Workflow[]) {
    const dialog: DialogConfig = {...dialogConfig,
      message: $event.length !==1? 'Confimer la suppression de ces circuits de validation?': 'Confimer la suppression de ce circuit de validation' +
        '?'};
    const dialogRef = this._dialog.open(DialogComponent, {
      disableClose: dialog.disableClose,
      data: dialog
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult)
        this.removes.emit($event.map(event => event.id));
    });
  }

  transform(workflow: Workflow): any {
    return {...workflow, company: workflow.companyDto.name}
  }

}
