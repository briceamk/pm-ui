import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Department} from '@module/organization/models';
import * as fromShare from '@app/share';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'pm-department-tree',
  templateUrl: './department-tree.component.html',
  styleUrls: ['./department-tree.component.scss']
})
export class DepartmentTreeComponent implements OnInit {

  @Input()error: any;
  @Input()loading: boolean;
  @Input()departments: Department[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/organization/departments/new`;
  transformedDepartments: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title) {
    this._title.setTitle('Departments - PM');
  }

  ngOnInit(): void {
    this.title = "Departments";
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
        name: 'parent',
        displayName: 'Parent',
        disableSorting: false
      },
      {
        name: 'costCenter',
        displayName: 'Centre de coût par défaut',
        disableSorting: false
      },
      {
        name: 'address',
        displayName: 'Adresse par défaut',
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
    this.transformedDepartments = this.departments.map(department => this.transform(department));
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: Department) {
    this.navigate.emit('/organization/departments/details/' + $event.id)
  }

  onRemoves($event: Department[]) {
    this.removes.emit($event.map(event => event.id));
  }

  transform(department: Department): any {
    return {...department,
      company: department.companyDto.name,
      address: department.addressDto?.name,
      costCenter: department.costCenterDto?.name,
      parent: department.parentDto?.name
    }
  }

}
