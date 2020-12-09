import {
  AfterViewInit, ChangeDetectionStrategy,
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

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import * as moment from 'moment';

import {ColumnSetting, CustomSort, PaginationSetting} from '@share/models';




@Component({
  selector: 'pm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {

  selectedRowIndex = -1;
  type: string;
  maaz: string;
  columnNames: string[] = [];
  selection = new SelectionModel<{}>()

  @Input() title: string;
  @Input() newRoute: string;
  @Input() enableCheckbox: boolean;
  @Input() allowMultiSelect: boolean;
  @Input() hideAdd: boolean;
  @Input() columnSettings: ColumnSetting[];
  @Input() paginationSetting: PaginationSetting;
  @Input() rowData: object[]
  @Input() sortBy: string;
  @Input() initialRowSelection: any;
  @Input() dataSource: MatTableDataSource<{}>

  @Output() getSelectedRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() getSelectedRows: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() getFilterDatasource: EventEmitter<any> = new EventEmitter<any>();

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
  }

  rowSelect(row: any) {
    this.getSelectedRow.emit(row);
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

  isDate(value: any): boolean {
    let formats = [
      moment.ISO_8601,
      "MM/DD/YYYY  :)  HH*mm*ss"
    ];
    return moment(value, formats, true).isValid();
  }

  onDelete() {
    this.getSelectedRows.emit(this.selection.selected);
    this.selection.clear();
  }

}
