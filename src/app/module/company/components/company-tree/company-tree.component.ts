import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

import {Company} from '@module/company/models';
import * as fromShare from '@share/index';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfig} from '@share/models';
import {dialogConfig} from '@share/utils/dialog-config';
import {DialogComponent} from '@share/components';


@Component({
  selector: 'pm-company-tree',
  templateUrl: './company-tree.component.html',
  styleUrls: ['./company-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyTreeComponent implements OnInit, OnChanges {

  @Input()error: any;
  @Input()loading: boolean = true;
  @Input()companies: Company[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/company/companies/new`

  constructor(private _toastr: ToastrService, private _title: Title, private _dialog: MatDialog) {
    this._title.setTitle('Sociétés - PM');
  }

  ngOnInit(): void {
    this.title = "Sociétes";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 60;
    this.paginationSetting.pageSizeOptions = [60, 100, 200, 500];
    this.paginationSetting.showFirstLastButton = true;
    this.columnSettings = [
      {
        name: 'code',
        displayName: 'Code',
        disableSorting: false
      },
      {
        name: 'name',
        displayName: 'Libelle',
        disableSorting: false
      },
      {
        name: 'email',
        displayName: 'Email',
        disableSorting: false
      },
      {
        name: 'city',
        displayName: 'Ville',
        disableSorting: false
      },
      {
        name: 'country',
        displayName: 'Pays',
        disableSorting: false
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: Company) {
    this.navigate.emit('/company/companies/details/' + $event.id)
  }

  onRemoves($event: Company[]) {
    const dialog: DialogConfig = {...dialogConfig,
      message: $event.length !==1? 'Confimer la suppression de ces sociétés?': 'Confimer la suppression de cette société?'};
    const dialogRef = this._dialog.open(DialogComponent, {
      disableClose: dialog.disableClose,
      data: dialog
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult)
        this.removes.emit($event.map(event => event.id));
    });
  }

}
