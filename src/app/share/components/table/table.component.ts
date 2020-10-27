import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ColumnSetting} from '../../models/column-setting';
import {PaginationSetting} from '../../models/pagination-setting';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CustomSort} from '../../models/custom-sort';

@Component({
  selector: 'pm-custom-mat-table',
  templateUrl: './custom-mat-table.component.html',
  styleUrls: ['./custom-mat-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomMatTableComponent implements OnInit, AfterViewInit, OnChanges {

  selectedRowIndex = -1;
  type: string;
  maaz: string;
  columnNames: string[] = [];
  selection = new SelectionModel<{}>()

  @Input() title: string;
  @Input() enableCheckbox: boolean;
  @Input() allowMultiSelect: boolean;
  @Input() columnSettings: ColumnSetting[];
  @Input() paginationSetting: PaginationSetting;
  @Input() rowData: object[]
  @Input() sortBy: string;
  @Input() initialRowSelection: any;
  @Input() dataSource: MatTableDataSource<{}>

  @Output() getSelectedRows = new EventEmitter();
  @Output() getFilterDatasource = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.columnSettings.forEach(columnSetting => this.columnNames.push(columnSetting.name));
    if(this.enableCheckbox) {
      this.columnNames.splice(0, 0, 'select');
      this.columnSettings.splice(0, 0, {
        'name': 'select',
        'displayName': '#'
      });
      this.selection = new SelectionModel<{}>(this.allowMultiSelect, this.initialRowSelection);
      this.dataSource = new MatTableDataSource<{}>(this.rowData);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {

      switch (this.maaz) {
        case 'name': {
          return item[property];
        }
        case 'date': {
          return new Date(item[property]);
        }
        default: {
          return item[property];
        }
      }
    };
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.rowData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numRows === numSelected;
  }

  masterToggle() {
    this.isAllSelected()?
      this.selection.clear():
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.getSelectedRows.emit(this.selection.selected);
  }

  rowSelect(row: any) {
    this.getSelectedRows.emit(row);
  }

  highLight(row: any) {
    this.selectedRowIndex = row.position;
  }

  sortColumn($event: CustomSort) {
    this.columnSettings.forEach(columnSetting => this.maaz = columnSetting.type);
  }

  applyFilter($event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  trackColumn(index, column) {
    if(column.type === 'date') {
      this.maaz = 'date';
    }
  }

}
