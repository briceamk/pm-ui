import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Product} from '@module/catalog/models';
import * as fromShare from '@app/share';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'pm-product-tree',
  templateUrl: './product-tree.component.html',
  styleUrls: ['./product-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTreeComponent implements OnInit {

  @Input() error: any;
  @Input() loading: boolean;
  @Input() image: any;
  @Input() products: Product[];
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/catalog/products/new`;
  transformedProducts: any[] = [];


  constructor(private _toastr: ToastrService, private _title: Title) {
    this._title.setTitle('Articles - PM');
  }

  ngOnInit(): void {
    this.title = "Articles";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 5;
    this.paginationSetting.pageSizeOptions = [60, 100, 200, 500];
    this.paginationSetting.showFirstLastButton = true;
    this.columnSettings = [
      {
        name: 'reference',
        displayName: 'Reférence',
        disableSorting: false
      },
      {
        name: 'name',
        displayName: 'Libelle',
        disableSorting: false
      },
      {
        name: 'description',
        displayName: 'Description',
        disableSorting: false
      },
      {
        name: 'category',
        displayName: 'Category',
        disableSorting: false
      },
      {
        name: 'catalog',
        displayName: 'Catalogue',
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
    this.transformedProducts = this.products.map(product => this.transform(product));
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: Product) {
    this.navigate.emit('/catalog/products/details/' + $event.id)
  }

  onRemoves($event: Product[]) {
    this.removes.emit($event.map(event => event.id));
  }

  transform(product: Product): any {
    return {...product, company: product.companyDto.name, category: product.categoryDto.name, catalog: product.catalogDto.name}
  }

}
