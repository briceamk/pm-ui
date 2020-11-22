import { Component, OnInit } from '@angular/core';
import {DialogFormComponent} from '@share/components';
import {MatDialog} from '@angular/material/dialog';
import {CatalogFormComponent} from '@module/catalog/components';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/catalog/store';
import {Observable} from 'rxjs';
import {Catalog} from '@module/catalog/models';

@Component({
  selector: 'pm-workflow-form',
  templateUrl: './workflow-form.component.html',
  styleUrls: ['./workflow-form.component.scss']
})
export class WorkflowFormComponent implements OnInit {

  catalogs: Catalog[];

  constructor(public dialog: MatDialog, private _store: Store<fromStore.CatalogState>) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogFormComponent, {
      data: { component: CatalogFormComponent, catalogs: this.catalogs }
    });
    dialogRef.afterClosed().subscribe(value => console.log(value))
  }

  ngOnInit(): void {
    this._store.select(fromStore.selectAllCatalogs).subscribe(value => this.catalogs = value );
  }

}
