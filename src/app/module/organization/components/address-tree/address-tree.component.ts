import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Address} from '@module/organization/models';
import * as fromShare from '@app/share';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {addressLabelTypes} from '@module/organization/constants';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfig} from '@share/models';
import {dialogConfig} from '@share/utils/dialog-config';
import {DialogComponent} from '@share/components';

@Component({
  selector: 'pm-address-tree',
  templateUrl: './address-tree.component.html',
  styleUrls: ['./address-tree.component.scss']
})
export class AddressTreeComponent implements OnInit {

  @Input()error: any;
  @Input()loading: boolean;
  @Input()addresses: Address[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/organization/addresses/new`;
  transformedAddresses: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title, private _dialog: MatDialog) {
    this._title.setTitle('Adresses - PM');
  }

  ngOnInit(): void {
    this.title = "Adresses";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 60;
    this.paginationSetting.pageSizeOptions = [60, 100, 200, 500];
    this.paginationSetting.showFirstLastButton = true;
    this.columnSettings = [
      {
        name: 'name',
        displayName: 'Libelle',
        disableSorting: false
      },
      {
        name: 'type',
        displayName: 'Type',
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
    this.transformedAddresses = this.addresses.map(address => this.transform(address));
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: Address) {
    this.navigate.emit('/organization/addresses/details/' + $event.id)
  }

  onRemoves($event: Address[]) {
    const dialog: DialogConfig = {...dialogConfig,
      message: $event.length !==1? 'Confimer la suppression de ces adresses?': 'Confimer la suppression de cette adresse?'};
    const dialogRef = this._dialog.open(DialogComponent, {
      disableClose: dialog.disableClose,
      data: dialog
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult)
        this.removes.emit($event.map(event => event.id));
    });
  }

  transform(address: Address): any {
    address = this.getTypeLabel(address);
    return {...address, company: address.companyDto.name}
  }


  getTypeLabel(address: Address): Address {
    let label = addressLabelTypes.find(addressLabelType =>Object.keys(addressLabelType)[0] === address.type);
    return {...address, type: label[Object.keys(label)[0]]} as Address;
  }

}
