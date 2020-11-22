import {Component, Inject, OnInit} from '@angular/core';
import {DialogConfig} from '@share/models';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'pm-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  dialogConfig: DialogConfig;

  constructor(public _dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogConfig) {
    console.log({...data});
    this.dialogConfig = {...data};
  }

  ngOnInit(): void {
  }

  onClick(result: boolean): void {
    this._dialogRef.close(result);
  }


}
