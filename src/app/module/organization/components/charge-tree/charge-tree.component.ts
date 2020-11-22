import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Charge} from '@module/organization/models';
import * as fromShare from '@app/share';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {DialogConfig} from '@share/models';
import {dialogConfig} from '@share/utils/dialog-config';
import {DialogComponent} from '@share/components';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'pm-charge-tree',
  templateUrl: './charge-tree.component.html',
  styleUrls: ['./charge-tree.component.scss']
})
export class ChargeTreeComponent implements OnInit {

  @Input()error: any;
  @Input()loading: boolean;
  @Input()charges: Charge[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/organization/charges/new`;
  transformedCharges: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title, private _dialog: MatDialog) {
    this._title.setTitle('Charges - PM');
  }

  ngOnInit(): void {
    this.title = "Charges";
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
    this.transformedCharges = this.charges.map(charge => this.transform(charge));
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: Charge) {
    this.navigate.emit('/organization/charges/details/' + $event.id)
  }

  onRemoves($event: Charge[]) {
    const dialog: DialogConfig = {...dialogConfig,
      message: $event.length !==1? 'Confimer la suppression de ces charges?': 'Confimer la suppression de cette charge?'};
    const dialogRef = this._dialog.open(DialogComponent, {
      disableClose: dialog.disableClose,
      data: dialog
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult)
        this.removes.emit($event.map(event => event.id));
    });
  }

  transform(charge: Charge): any {
    return {...charge, company: charge.companyDto.name}
  }


}
