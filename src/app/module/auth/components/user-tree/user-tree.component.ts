import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import * as fromShare from '@share/index';
import {User} from '@module/auth/models';
import {Title} from '@angular/platform-browser';
import {DialogButtonConfig, DialogConfig} from '@share/models';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '@share/components';
import {dialogConfig} from '@share/utils/dialog-config';

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

  constructor(private _toastr: ToastrService, private _title: Title, private _dialog: MatDialog) {
    this._title.setTitle('Utilisateurs - PM');
  }

  ngOnInit(): void {
    this.title = "Utilisateurs";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 60;
    this.paginationSetting.pageSizeOptions =  [60, 100, 200, 500];
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

    const dialog: DialogConfig = {...dialogConfig,   message: 'Confimer la suppression de cet utilisateur?'};
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
