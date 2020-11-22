import {Component, ComponentFactoryResolver, ComponentRef, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'pm-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit, OnDestroy {

  @ViewChild('target', { read: ViewContainerRef , static: true}) vcRef: ViewContainerRef;
  componentRef: ComponentRef<any>;

  constructor(public dialogRef: MatDialogRef<DialogFormComponent>,
              private resolver: ComponentFactoryResolver,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.vcRef.createComponent(factory);
    this.componentRef.instance.catalogs = this.data.catalogs;
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onClose(form: any): void {
    console.log(form)
    this.dialogRef.close(form.value);
  }

}
