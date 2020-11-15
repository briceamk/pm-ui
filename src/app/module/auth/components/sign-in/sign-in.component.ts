import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import * as models from '@module/auth/models';
import * as fromShare from '@share/index';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'pm-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, OnChanges {

  @Input() error: any;
  @Input() loggedIn: boolean;
  @Input() loading: boolean;

  @Output() signIn: EventEmitter<models.SignInRequest> = new EventEmitter<models.SignInRequest>();

  form: FormGroup;

  hide = true;

  constructor(private _fb: FormBuilder, private _title: Title, private _toastr: ToastrService) {
    this._title.setTitle('Se connecter - PM');
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
        [Validators.required, Validators.minLength(5), Validators.maxLength(128)]
      ],
      usernameOrEmail: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(128)]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    const { value } = this.form;
    this.signIn.emit(value);
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



}
