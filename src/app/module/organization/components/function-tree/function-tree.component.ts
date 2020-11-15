import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Function} from '@module/organization/models';
import * as fromShare from '@app/share';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {functionLabelTypes} from '@module/organization/constants';

@Component({
  selector: 'pm-function-tree',
  templateUrl: './function-tree.component.html',
  styleUrls: ['./function-tree.component.scss']
})
export class FunctionTreeComponent implements OnInit {

  @Input()error: any;
  @Input()loading: boolean;
  @Input()functions: Function[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/organization/functions/new`;
  transformedFunctions: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title) {
    this._title.setTitle('Functions - PM');
  }

  ngOnInit(): void {
    this.title = "Functions";
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
    this.transformedFunctions = this.functions.map(_function => this.transform(_function));
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: Function) {
    this.navigate.emit('/organization/functions/details/' + $event.id)
  }

  onRemoves($event: Function[]) {
    this.removes.emit($event.map(event => event.id));
  }

  transform(_function: Function): any {
    _function = this.getTypeLabel(_function);
    return {..._function, company: _function.companyDto.name}
  }

  getTypeLabel(_function: Function): Function {
    let label = functionLabelTypes.find(functionLabelType =>Object.keys(functionLabelType)[0] === _function.type);
    return {..._function, type: label[Object.keys(label)[0]]} as Function;
  }

}
