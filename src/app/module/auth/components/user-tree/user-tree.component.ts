import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import * as fromShare from '@share/index';
import {User} from '@module/auth/models';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'pm-user-tree',
  templateUrl: './user-tree.component.html',
  styleUrls: ['./user-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTreeComponent implements OnInit, OnChanges {

  @Input()error: any;
  @Input()loading: boolean;
  @Input()users: User[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/auth/users/new`;

  constructor(private _toastr: ToastrService, private _title: Title) {
    this._title.setTitle('Utilisateurs - PM');
  }

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
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: User) {
    this.navigate.emit('/auth/users/details/' + $event.id)
  }

  onRemoves($event: User[]) {
    this.removes.emit($event.map(event => event.id));
  }

}
