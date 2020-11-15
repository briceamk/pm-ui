import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from '@module/company/models';
import * as fromShare from '@app/share';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'pm-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFormComponent implements OnInit, OnChanges {

  @Input() company: Company;
  @Input() companyEntities: { [id: string]: Company };
  @Input() loading: boolean;
  @Input() error: any;
  @Input() logo: any;

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<Company> = new EventEmitter<Company>();
  @Output() update: EventEmitter<Company> = new EventEmitter<Company>();
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() upload: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  isDisable: boolean;
  hide = true;
  listViewLink = '/company/companies';
  title = 'Société';
  logoFiles: FileList;

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _title: Title
  ) {
    this.initForm();
    this._title.setTitle('Société - PM');
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.company && this.company.id && !this.error) {
      this.form.patchValue(this.company);
      this.disableForm();
    }
    if(this.company === null || this.company === undefined ) {
      this.logo = null;
    }

    // we check if server return error and we print it to user
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  initForm(): void {
    this.form = this._fb.group({
      id: [''],
      code: ['', [Validators.required, Validators.maxLength(12)]],
      name: ['', [Validators.required, Validators.maxLength(64)]],
      phoneNumber: [''],
      mobileNumber: [''],
      email: ['',[Validators.email]],
      city: [''],
      zip: [''],
      street: [''],
      country: [''],
      vat: [''],
      trn: [''],
      imageName: [''],
      imageType: [''],
      image: [''],
      active: [true]
    });
  }

  // actions
  onSave($event: any): void {
    const { value, invalid } = this.form;
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
    this.logo = null;
    this.navigate.emit(this.listViewLink + '/new');
  }

  onEdit($event: any): void {
    this.form.enable();
    this.isDisable = false;
  }

  onRemoves($event: any): void {
    this.removes.emit([this.company.id]);
  }

  disableForm(): void {
    this.form.disable();
    this.isDisable = true;
  }

  onCancel($event: any): void {
    if (this.company && this.company.id) {
      this.form.patchValue(this.company);
      this.disableForm();
    } else {
      this.initForm();
      this.navigate.emit(this.listViewLink);
    }
  }

  // navigations
  onNavigate($event: any): void {
    const company: Company = $event as Company;
    this.navigate.emit(this.listViewLink + '/details/' + company.id);
  }

  // validators
  required(name: string): boolean {
    return fromShare.validators.required(this.form, name);
  }

  maximum(name: string): boolean {
    return fromShare.validators.maximum(this.form, name);
  }

  email(name: string): boolean {
    return fromShare.validators.email(this.form, name);
  }


  // others
  getKey(labels: any): string {
    return Object.keys(labels)[0];
  }

  getLabel(value: any): string {
    return value[Object.keys(value)[0]];
  }

  onChoosePicture() {
    document.getElementById('logo').click();
  }

  onUploadImage($event) {
    this.logoFiles = $event.target.files;
    const { value } = this.form;
    const logo: File = this.logoFiles.item(0);
    if (value.id !== '' && value.id !== null) {
      this.upload.emit({ id: value.id, logo: logo });
    }
    this.logoFiles = undefined;
  }

}
