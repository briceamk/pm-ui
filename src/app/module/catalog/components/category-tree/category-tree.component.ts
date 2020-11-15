import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Category} from '@module/catalog/models';
import * as fromShare from '@app/share';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'pm-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTreeComponent implements OnInit {

  @Input()error: any;
  @Input()loading: boolean;
  @Input()categories: Category[];
  @Output()removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()navigate: EventEmitter<string> = new EventEmitter<string>();
  columnSettings: fromShare.models.ColumnSetting[] = [];
  paginationSetting: fromShare.models.PaginationSetting = <fromShare.models.PaginationSetting>{};
  title: string;
  newRoute = `/catalog/categories/new`;
  transformedCategories: any[] = [];

  constructor(private _toastr: ToastrService, private _title: Title) {
    this._title.setTitle('Catégories - PM');
  }

  ngOnInit(): void {
    this.title = "Catégories";
    this.paginationSetting.enablePagination = true;
    this.paginationSetting.pageSize = 5;
    this.paginationSetting.pageSizeOptions = [60, 100, 200, 500];
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
    this.transformedCategories = this.categories.map(category => this.transform(category));
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  onNavigate($event: Category) {
    this.navigate.emit('/catalog/categories/details/' + $event.id)
  }

  onRemoves($event: Category[]) {
    this.removes.emit($event.map(event => event.id));
  }

  transform(category: Category): any {
    return {...category, company: category.companyDto.name, parent: category.parentDto !== null? category.parentDto.name: ''}
  }

}
