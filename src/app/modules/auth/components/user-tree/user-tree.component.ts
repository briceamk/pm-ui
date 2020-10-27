import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import * as fromShare from '../../../../share';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../models';

@Component({
  selector: 'pm-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input()error: any;
  @Input()loading: boolean = true;
  @Input()users: User[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;

  constructor(private _toastr: ToastrService) {}

  ngOnInit(): void {
    this.title = "Utilisateurs";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 5;
    this.paginationSetting.pageSizeOptions = [5, 10, 25];
    this.paginationSetting.showFirstLastButton = true;
    this.columnSettings = [
      {
        name: 'firstName',
        displayName: 'Prénom',
        disableSorting: false
      },
      {
        name: 'lastName',
        displayName: 'Nom',
        disableSorting: false
      },
      {
        name: 'email',
        displayName: 'Email',
        disableSorting: false
      },
      {
        name: 'username',
        displayName: 'Login',
        disableSorting: false
      },
      {
        name: 'city',
        displayName: 'Ville',
        disableSorting: false
      },
      {
        name: 'mobile',
        displayName: 'Téléphone',
        disableSorting: false
      }
      //TODO ajouter la colonne societe
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM App');
      this.error = null;
    }
  }

  getSelectedRows($event: User) {
    //TODO emit event to containers
    console.log($event);

  }

}
