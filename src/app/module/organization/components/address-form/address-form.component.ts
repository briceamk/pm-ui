import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Address, Image} from '@module/organization/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import * as fromShare from '@app/share';
import { addressLabelTypes } from '../../constants';

@Component({
  selector: 'pm-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  @Input() address: Address;
  @Input() addressEntities: { [id: string]: Address };
  @Input() error: any;
  @Input() loading: boolean;
  @Input() image: Image;

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<Address> = new EventEmitter<Address>();
  @Output() update: EventEmitter<Address> = new EventEmitter<Address>();
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() upload: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  isDisable: boolean;
  hide = true;
  listViewLink = '/organization/addresses';
  title = 'Adresse';
  catalogs$: Observable<any>;
  categories$: Observable<any>;
  imageFiles: FileList;
  labelTypes = addressLabelTypes;



  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _title: Title
  ) {
    this.initForm();
    this._title.setTitle('Adresse - PM');
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.address && this.address.id && !this.error) {
      this.form.patchValue(this.address);
      this.disableForm();
    }
    if(this.address === null || this.address === undefined ) {
      this.image = null;
    }

    // we check if server return error and we print it to address
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  initForm(): void {
    this.form = this._fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(64)]],
      type: [ '', ],
      vat: [ '', ],
      trn: [ '', ],
      title: [ '', ],
      firstName: [ '', ],
      lastName: [ '', ],
      street: [ '', ],
      zip: [ '', ],
      email: ['', [Validators.email]],
      phone: [ '', ],
      mobile: [ '', ],
      fax: [ '', ],
      website: [ '', ],
      city: [ '', ],
      country: [ '', ],
      headerImageName: [''],
      headerImageType: [''],
      footerImageName: [''],
      footerImageType: [''],
      companyDto: [null]
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
    this.image = null;
    this.navigate.emit(this.listViewLink + '/new');
  }

  onEdit($event: any): void {
    this.form.enable();
    this.isDisable = false;
  }

  onRemoves($event: any): void {
    this.removes.emit([this.address.id]);
  }

  disableForm(): void {
    this.form.disable();
    this.isDisable = true;
  }

  onCancel($event: any): void {
    if (this.address && this.address.id) {
      this.form.patchValue(this.address);
      this.disableForm();
    } else {
      this.initForm();
      this.navigate.emit(this.listViewLink);
    }
  }

  // navigations
  onNavigate($event: any): void {
    const address: Address = $event as Address;
    this.navigate.emit(this.listViewLink + '/details/' + address.id);
  }

  // validators
  required(name: string): boolean {
    return fromShare.validators.required(this.form, name);
  }

  maximum(name: string) {
    return fromShare.validators.maximum(this.form, name);
  }

  email(name: string) {
    return fromShare.validators.email(this.form, name);
  }

  onChoosePicture(element: string) {
    document.getElementById(element).click();
  }

  onUploadImage($event, field: string) {
    this.imageFiles = $event.target.files;
    const { value } = this.form;
    const image: File = this.imageFiles.item(0);
    if (value.id !== '' && value.id !== null) {
      this.upload.emit({ id: value.id, image: image, field: field });
    }
    this.imageFiles = undefined;
  }

  // others
  getKey(labels: any): string {
    return Object.keys(labels)[0];
  }

  getLabel(value: any): string {
    return value[Object.keys(value)[0]];
  }

}
