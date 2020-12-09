import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Role} from '@module/organization/models';
import * as fromShare from '@app/share';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {roleLabelTypes} from '@module/organization/constants';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfig} from '@share/models';
import {dialogConfig} from '@share/utils/dialog-config';
import {DialogComponent} from '@share/components';

@Component({
  selector: 'pm-role-tree',
  templateUrl: './role-tree.component.html',
  styleUrls: ['./role-tree.component.scss']
})
export class RoleTreeComponent implements OnInit {

  @Input()error: any;
  @Input()loading: boolean;
  @Input()roles: Role[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/organization/roles/new`;
  transformedRoles: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title, private _dialog: MatDialog) {
    this._title.setTitle('Roles - PM');
  }

  ngOnInit(): void {
    this.title = "Roles";
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
    this.transformedRoles = this.roles.map(role => this.transform(role));
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: Role) {
    this.navigate.emit('/organization/roles/details/' + $event.id)
  }

  onRemoves($event: Role[]) {
    const dialog: DialogConfig = {...dialogConfig,
      message: $event.length !==1? 'Confimer la suppression de ces rôles?': 'Confimer la suppression de cet rôle?'};
    const dialogRef = this._dialog.open(DialogComponent, {
      disableClose: dialog.disableClose,
      data: dialog
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult)
        this.removes.emit($event.map(event => event.id));
    });
  }

  transform(role: Role): any {
    role = this.getTypeLabel(role);
    return {...role, company: role.companyDto.name}
  }

  getTypeLabel(role: Role): Role {
    let label = roleLabelTypes.find(roleLabelType =>Object.keys(roleLabelType)[0] === role.type);
    return {...role, type: label[Object.keys(label)[0]]} as Role;
  }

}
