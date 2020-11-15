import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

import * as fromShare from '@app/share';
import {JobInfo} from '@module/cron/models';
import {jobInfoStateLabels} from '@module/cron/constants';

@Component({
  selector: 'pm-job-info-form',
  templateUrl: './job-info-form.component.html',
  styleUrls: ['./job-info-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobInfoFormComponent implements OnInit {

  @Input() jobInfo: JobInfo;
  @Input() jobInfoEntities: { [id: string]: JobInfo };
  @Input() error: any;
  @Input() loading: boolean;

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<JobInfo> = new EventEmitter<JobInfo>();
  @Output() update: EventEmitter<JobInfo> = new EventEmitter<JobInfo>();
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();

  form: FormGroup;
  isDisable: boolean;
  hide = true;
  stateLabels = jobInfoStateLabels;
  listViewLink = '/cron/job-infos';
  title = 'Tâche planifiée';

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _title: Title
  ) {
    this.initForm();
    this._title.setTitle('Tâche planifiée - PM');
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.jobInfo && this.jobInfo.id && !this.error) {
      this.form.patchValue(this.jobInfo);
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
      jobName: ['', [Validators.required]],
      jobClass: ['', [Validators.required]],
      jobGroup: ['', [Validators.required]],
      cronExpression: ['', [Validators.required]],
      repeatTime: [''],
      cronJob: [true],
      state: [{ value: 'DRAFT', disabled: true }],
      companyDto: [null]
    });
    this.form.get('cronJob').valueChanges.subscribe(cronJob => {
      if(cronJob) {
        this.form.get('repeatTime').setValue('');
        this.form.get('repeatTime').clearValidators();
        this.form.get('repeatTime').setValidators(null);
        this.form.get('cronExpression').setValidators([Validators.required]);
        this.form.get('repeatTime').updateValueAndValidity();
        this.form.get('cronExpression').updateValueAndValidity();
      } else {
        this.form.get('cronExpression').setValue('');
        this.form.get('cronExpression').clearValidators();
        this.form.get('cronExpression').setValidators(null);
        this.form.get('repeatTime').setValidators([Validators.required]);
        this.form.get('repeatTime').updateValueAndValidity();
        this.form.get('cronExpression').updateValueAndValidity();
      }

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
    this.form.enable();
    this.isDisable = false;
  }

  onRemoves($event: any): void {
    this.removes.emit([this.jobInfo.id]);
  }

  disableForm(): void {
    this.form.disable();
    this.isDisable = true;
  }

  onCancel($event: any): void {
    if (this.jobInfo && this.jobInfo.id) {
      this.form.patchValue(this.jobInfo);
      this.disableForm();
    } else {
      this.initForm();
      this.navigate.emit(this.listViewLink);
    }
  }

  // navigations
  onNavigate($event: any): void {
    const jobInfo: JobInfo = $event as JobInfo;
    this.navigate.emit(this.listViewLink + '/details/' + jobInfo.id);
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
