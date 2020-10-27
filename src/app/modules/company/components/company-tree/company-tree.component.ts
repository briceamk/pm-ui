import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as fromShare from '../../../../share';
import {ToastrService} from 'ngx-toastr';
import {Company} from '../../models';

@Component({
  selector: 'pm-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnChanges {

  @Input()error: any;
  @Input()loading: boolean = true;
  @Input()companies: Company[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;

  constructor(private _toastr: ToastrService) {}

  ngOnInit(): void {
    console.log(this.companies);
    this.title = "Sociétes";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 5;
    this.paginationSetting.pageSizeOptions = [5, 10, 25];
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
    console.log(changes);
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM App');
      this.error = null;
    }
  }

  getSelectedRows($event: Company) {
    //TODO emit event to containers
    console.log($event);

  }

}
