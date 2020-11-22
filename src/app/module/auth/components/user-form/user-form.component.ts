import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Role, User} from '@module/auth/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import * as fromShare from '@app/share';
import {Observable, of} from 'rxjs';
import {delay, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'pm-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Input() userEntities: { [id: string]: User };
  @Input() error: any;
  @Input() roles: Role[];
  @Input() loading: boolean;

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<User> = new EventEmitter<User>();
  @Output() update: EventEmitter<User> = new EventEmitter<User>();
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();

  form: FormGroup;
  isDisable: boolean;
  hide = true;
  listViewLink = '/auth/users';
  title = 'Utilisateur';
  placeholder =  'Selectionner les roles';
  roleDtos$: Observable<any>;

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _title: Title,
  ) {
    this.initForm();
    this._title.setTitle('Utilisateur - PM');
  }



  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user && this.user.id && !this.error) {
      this.form.patchValue(this.user);
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
      username: [
        '',
      ],
      firstName: [
        '',
      ],
      lastName: [
        '',
      ],
      email: [
        '',
      ],
      password: ['', ],
      mobile: [
        '',

      ],
      city: [
        '',

      ],
      accountNonExpired: [true],
      accountNonLocked: [true],
      credentialsNonExpired: [true],
      enabled: [true],
      roleDtos: [[], [Validators.required]],
      companyDto: [{}]
    });
    this.roleDtos$ = this.form.get("roleDtos").valueChanges.pipe(
      startWith(null),
      switchMap((name) => {
        if (typeof name === "string") {
          return of(this.roles).pipe(
            delay(300),
            map((response) =>
              response.filter((role) => role.name.toLowerCase().includes(name))
            )
          );
        }
        return of([])
      })
    );
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
    this.removes.emit([this.user.id]);
  }

  disableForm(): void {
    this.form.disable();
    this.isDisable = true;
  }

  onCancel($event: any): void {
    if (this.user && this.user.id) {
      this.form.patchValue(this.user);
      this.disableForm();
    } else {
      this.initForm();
      this.navigate.emit(this.listViewLink);
    }
  }

  // navigations
  onNavigate($event: any): void {
    const user: User = $event as User;
    this.navigate.emit(this.listViewLink + '/details/' + user.id);
  }

  // validators
  required(name: string): boolean {
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

  // others
  getKey(labels: any): string {
    return Object.keys(labels)[0];
  }

  getLabel(value: any): string {
    return value[Object.keys(value)[0]];
  }




}
