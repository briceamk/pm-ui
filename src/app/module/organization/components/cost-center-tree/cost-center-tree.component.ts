import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {CostCenter} from '@module/organization/models';
import * as fromShare from '@app/share';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'pm-cost-center-tree',
  templateUrl: './cost-center-tree.component.html',
  styleUrls: ['./cost-center-tree.component.scss']
})
export class CostCenterTreeComponent implements OnInit {

  @Input()error: any;
  @Input()loading: boolean;
  @Input()costCenters: CostCenter[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/organization/cost-centers/new`;
  transformedCostCenters: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title) {
    this._title.setTitle('Centres de coût - PM');
  }

  ngOnInit(): void {
    this.title = "Centres de coût";
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
        name: 'externalId',
        displayName: 'ID ERP',
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
    this.transformedCostCenters = this.costCenters.map(costCenter => this.transform(costCenter));
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: CostCenter) {
    this.navigate.emit('/organization/cost-centers/details/' + $event.id)
  }

  onRemoves($event: CostCenter[]) {
    this.removes.emit($event.map(event => event.id));
  }

  transform(costCenter: CostCenter): any {
    return {...costCenter, company: costCenter.companyDto.name}
  }

}
