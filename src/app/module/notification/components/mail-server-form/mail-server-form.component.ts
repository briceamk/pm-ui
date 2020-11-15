import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

import {mailServerTypeLabels, mailServerStateLabels} from '@module/notification/constants';
import {MailServer} from '@module/notification/models';
import * as fromShare from '@share/index';


@Component({
  selector: 'pm-mail-server-form',
  templateUrl: './mail-server-form.component.html',
  styleUrls: ['./mail-server-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailServerFormComponent implements OnInit, OnChanges {

  @Input() mailServer: MailServer;
  @Input() mailServerEntities: {[id: string]: MailServer};
  @Input() error: any;
  @Input() loading: boolean;

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<MailServer> = new EventEmitter<MailServer>();
  @Output() update: EventEmitter<MailServer> = new EventEmitter<MailServer>();
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();


  form: FormGroup;
  isDisable: boolean;
  hide: boolean = true;
  showHideButton = false;
  typeLabels = mailServerTypeLabels;
  stateLabels = mailServerStateLabels;
  listViewLink = '/notification/mail-servers';
  title: string = 'Serveur d\'email';

  constructor(private _fb: FormBuilder, private _toastr: ToastrService, private _title: Title) {
    this.initForm();
    this._title.setTitle('Serveur d\'email - PM');
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.mailServer && this.mailServer.id && !this.error) {
      this.form.patchValue(this.mailServer);
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
      hostname: ['', [Validators.required]],
      port: ['', [Validators.required]],
      username: [{value: '', disabled: true}],
      password: [{value: '', disabled: true}],
      enableSSL: [false],
      enableAuth: [false],
      type: ['', [Validators.required]],
      state: [{value: 'DRAFT', disabled: true}],
      defaultServer: [false],
      companyDto: [null]
    });
    this.form.get('enableAuth').valueChanges.subscribe(enableAuth => {
      if(enableAuth) {
        this.form.get('username').enable();
        this.form.get('password').enable();
        this.showHideButton = true;
      }
      else {
        this.form.get('username').disable();
        this.form.get('password').disable();
        this.showHideButton = false;
      }

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
    this.removes.emit([this.mailServer.id]);
  }

  disableForm() {
    this.form.disable();
    this.form.get('username').disable();
    this.form.get('password').disable();
    this.showHideButton = false;
    this.isDisable = true;
  }

  onCancel($event: any) {
    if (this.mailServer && this.mailServer.id) {
      this.form.patchValue(this.mailServer);
      this.disableForm();
    } else {
      this.initForm();
      this.navigate.emit(this.listViewLink);
    }
  }

  //navigations
  onNavigate($event: any) {
    let mailServer: MailServer = $event as MailServer;
    this.navigate.emit(this.listViewLink+ '/details/' + mailServer.id);
  }

  //validators
  required(name: string) {
    return fromShare.validators.required(this.form, name);
  }

  //others
  getKey(labels: any): string {
    return Object.keys(labels)[0];
  }

  getLabel(value: any): string {
    return value[Object.keys(value)[0]];
  }

}
