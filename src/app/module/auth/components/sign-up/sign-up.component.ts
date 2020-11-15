import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as models from '@module/auth/models';
import * as fromShare from '@share/index';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'pm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit, OnChanges {

  @Input() error: any;
  @Input() loggedIn: boolean;
  @Input() loading: boolean;

  @Output() signUp: EventEmitter<models.SignUpRequest> = new EventEmitter<models.SignUpRequest>();

  form: FormGroup;

  hide = true;

  constructor(private _fb: FormBuilder, private _title: Title, private _toastr: ToastrService) {
    this._title.setTitle('Créer son compte - PM');
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  initForm() {
    this.form = this._fb.group({
      companyCode: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(8)]
      ],
      username: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(64)]
      ],
      firstName: [
        '',
        [Validators.maxLength(64)]
      ],
      lastName: [
        '',
        [Validators.required, Validators.maxLength(64)]
      ],
      email: [
        '',
        [Validators.required, Validators.email,  Validators.minLength(5), Validators.maxLength(128)]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: [
        '',
        [Validators.minLength(9), Validators.maxLength(12)]
      ],
      city: [
        '',
        [Validators.maxLength(64)]
      ],
    });
  }

  onSubmit() {
    const { value } = this.form;
    this.signUp.emit(value);
  }

  required(name: string) {
    return fromShare.validators.required(this.form, name);
  }
  minimum(name: string) {
    return fromShare.validators.minimum(this.form, name);
  }
  maximum(name: string) {
    return fromShare.validators.maximum(this.form, name);
  }

  email(name: string) {
    return fromShare.validators.email(this.form, name);
  }

}
