import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

import * as fromShare from '@share/index';
import {MailTemplate} from '@module/notification/models';
import {mailTemplateTypeLabels} from '@module/notification/constants';



@Component({
  selector: 'pm-mail-template-form',
  templateUrl: './mail-template-form.component.html',
  styleUrls: ['./mail-template-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailTemplateFormComponent implements OnInit, OnChanges {

  @Input() mailTemplate: MailTemplate;
  @Input() mailTemplateEntities: {[id: string]: MailTemplate};
  @Input() error: any;
  @Input() loading;

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<MailTemplate> = new EventEmitter<MailTemplate>();
  @Output() update: EventEmitter<MailTemplate> = new EventEmitter<MailTemplate>();
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();


  form: FormGroup;
  isDisable: boolean;
  typeLabels = mailTemplateTypeLabels;
  listViewLink = '/notification/mail-templates';
  title: string = 'Modèle d\'email';

  constructor(private _fb: FormBuilder, private _toastr: ToastrService, private _title: Title) {
    this.initForm();
    this._title.setTitle('Modèle d\'email - PM');
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.mailTemplate && this.mailTemplate.id && !this.error) {
      this.form.patchValue(this.mailTemplate);
      this.disableForm();
    }

    // we check if server return error and we print it to user
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  initForm() {
    this.form = this._fb.group({
      id: [''],
      name: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      content: ['', [Validators.required]],
      type: ['', [Validators.required]],
      companyDto: [null]
    });
  }

  //actions
  onSave($event: any ) {
    const {value, invalid} = this.form;
    if(invalid)
      return;
    if(value.id != null && value.id !== '') {
      this.update.emit(value);
    } else {
      this.create.emit(value);
    }

  }

  onAdd($event: any) {
    this.form.enable();
    this.initForm();
    this.navigate.emit(this.listViewLink + '/new');
  }

  onEdit($event: any) {
    this.form.enable();
    this.isDisable = false;
  }

  onRemoves($event: any) {
    this.removes.emit([this.mailTemplate.id]);
  }

  disableForm() {
    this.form.disable();
    this.isDisable = true;
  }

  onCancel($event: any) {
    if (this.mailTemplate && this.mailTemplate.id) {
      this.form.patchValue(this.mailTemplate);
      this.disableForm();
    } else {
      this.initForm();
      this.navigate.emit(this.listViewLink);
    }
  }

  //navigations
  onNavigate($event: any) {
    let mailTemplate: MailTemplate = $event as MailTemplate;
    this.navigate.emit(this.listViewLink+ '/details/' + mailTemplate.id);
  }

  //validators
  required(name: string) {
    return fromShare.validators.required(this.form, name);
  }

  //others
  getKey(typeLabels: any): string {
    return Object.keys(typeLabels)[0];
  }

  getLabel(value: any): string {
    return value[Object.keys(value)[0]];
  }
}
