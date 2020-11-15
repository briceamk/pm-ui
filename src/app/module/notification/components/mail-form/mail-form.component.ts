import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mailStateLabels } from '@module/notification/constants';
import { Mail } from '@module/notification/models';
import * as fromShare from '@share/index';


@Component({
  selector: 'pm-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailFormComponent implements OnInit, OnChanges {
  @ViewChild('creationDatePicker') creationDatePicker: any;
  @ViewChild('sendDatePicker') sendDatePicker: any;

  @Input() mail: Mail;
  @Input() mailEntities: { [id: string]: Mail };
  @Input() error: any;
  @Input() loading: boolean;

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<Mail> = new EventEmitter<Mail>();
  @Output() update: EventEmitter<Mail> = new EventEmitter<Mail>();
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();

  form: FormGroup;
  isDisable: boolean;
  hide = true;
  stateLabels = mailStateLabels;
  listViewLink = '/notification/mails';
  title = 'Email';

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _title: Title
  ) {
    this.initForm();
    this._title.setTitle('Emails - PM');
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mail && this.mail.id && !this.error) {
      this.form.patchValue(this.mail);
      this.disableForm();
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
      subject: ['', [Validators.required]],
      emailTo: ['', [Validators.required, Validators.email]],
      emailCc: [''],
      emailCci: [''],
      content: [''],
      relatedClass: [{ value: '', disabled: true }],
      relatedObjectId: [{ value: '', disabled: true }],
      reference: [{ value: '', disabled: true }],
      creationDate: [{ value: '', disabled: true }],
      sendDate: [{ value: '', disabled: true }],
      state: [{ value: 'TO_SEND', disabled: true }],
      companyDto: [null]
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
    this.navigate.emit(this.listViewLink + '/new');
  }

  onEdit($event: any): void {
    this.isDisable = false;
    if (this.form.get('state').value === 'TO_SEND') {
      this.form.enable();
    }
  }

  onRemoves($event: any): void {
    this.removes.emit([this.mail.id]);
  }

  disableForm(): void {
    this.form.disable();
    this.isDisable = true;
  }

  onCancel($event: any): void {
    if (this.mail && this.mail.id) {
      this.form.patchValue(this.mail);
      this.disableForm();
    } else {
      this.initForm();
      this.navigate.emit(this.listViewLink);
    }
  }

  // navigations
  onNavigate($event: any): void {
    const mail: Mail = $event as Mail;
    this.navigate.emit(this.listViewLink + '/details/' + mail.id);
  }

  // validators
  required(name: string): boolean {
    return fromShare.validators.required(this.form, name);
  }

  // others
  getKey(labels: any): string {
    return Object.keys(labels)[0];
  }

  getLabel(value: any): string {
    return value[Object.keys(value)[0]];
  }
}
