import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Charge} from '@module/organization/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import * as fromShare from '@app/share';

@Component({
  selector: 'pm-charge-form',
  templateUrl: './charge-form.component.html',
  styleUrls: ['./charge-form.component.scss']
})
export class ChargeFormComponent implements OnInit {

  @Input() charge: Charge;
  @Input() chargeEntities: { [id: string]: Charge };
  @Input() error: any;
  @Input() loading: boolean;

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<Charge> = new EventEmitter<Charge>();
  @Output() update: EventEmitter<Charge> = new EventEmitter<Charge>();
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();

  form: FormGroup;
  isDisable: boolean;
  hide = true;
  listViewLink = '/organization/charges';
  title = 'Types de charge';


  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _title: Title
  ) {
    this.initForm();
    this._title.setTitle('Types de charge - PM');
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.charge && this.charge.id && !this.error) {
      this.form.patchValue(this.charge);
      this.disableForm();
    }

    // we check if server return error and we print it to charge
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  initForm(): void {
    this.form = this._fb.group({
      id: [''],
      code: ['', [Validators.required, Validators.maxLength(32)]],
      name: ['', [Validators.required, Validators.maxLength(64)]],
      isInternational: [ false, ],
      active: [ true, ],
      companyDto: [ null, ],
    });
  }

  // actions
  onSave($event: any): void {
    const {value, invalid} = this.form;
    if (invalid) {
      return;
    }
    if (value.id != null && value.id !== '') {
      this.update.emit(value);
    } else {
      this.create.emit(value);
    }
  }

  onAdd($event: any): void {
    this.form.enable();
    this.initForm();
    this.navigate.emit(this.listViewLink + '/new');
  }

  onEdit($event: any): void {
    this.form.enable();
    this.isDisable = false;
  }

  onRemoves($event: any): void {
    this.removes.emit([this.charge.id]);
  }

  disableForm(): void {
    this.form.disable();
    this.isDisable = true;
  }

  onCancel($event: any): void {
    if (this.charge && this.charge.id) {
      this.form.patchValue(this.charge);
      this.disableForm();
    } else {
      this.initForm();
      this.navigate.emit(this.listViewLink);
    }
  }

  // navigations
  onNavigate($event: any): void {
    const charge: Charge = $event as Charge;
    this.navigate.emit(this.listViewLink + '/details/' + charge.id);
  }

  // validators
  required(name: string): boolean {
    return fromShare.validators.required(this.form, name);
  }

  maximum(name: string) {
    return fromShare.validators.maximum(this.form, name);
  }

}
