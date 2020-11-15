import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Catalog} from '@module/catalog/models';
import * as fromShare from '@app/share';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'pm-catalog-tree',
  templateUrl: './catalog-tree.component.html',
  styleUrls: ['./catalog-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogTreeComponent implements OnInit, OnChanges {

  @Input()error: any;
  @Input()loading: boolean;
  @Input()catalogs: Catalog[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/catalog/catalogs/new`;
  transformedCatalogs: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title) {
    this._title.setTitle('Catalogues - PM');
  }

  ngOnInit(): void {
    this.title = "Catalogues";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 5;
    this.paginationSetting.pageSizeOptions = [5, 10, 25];
    this.paginationSetting.showFirstLastButton = true;
    this.columnSettings = [
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
        name: 'company',
        displayName: 'Sociéte',
        disableSorting: false
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.transformedCatalogs = this.catalogs.map(catalog => this.transform(catalog));
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: Catalog) {
    this.navigate.emit('/catalog/catalogs/details/' + $event.id)
  }

  onRemoves($event: Catalog[]) {
    this.removes.emit($event.map(event => event.id));
  }

  transform(catalog: Catalog): any {
    return {...catalog, company: catalog.companyDto.name, parent: catalog.parentDto !== null? catalog.parentDto.name: ''}
  }
}
