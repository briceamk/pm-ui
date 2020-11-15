import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Catalog} from '@module/catalog/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import * as fromShare from '@app/share';
import {Observable, of} from 'rxjs';
import {delay, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'pm-catalog-form',
  templateUrl: './catalog-form.component.html',
  styleUrls: ['./catalog-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogFormComponent implements OnInit, OnChanges {

  @Input() catalog: Catalog;
  @Input() catalogs: Catalog[];
  @Input() catalogEntities: { [id: string]: Catalog };
  @Input() error: any;
  @Input() loading: boolean;

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<Catalog> = new EventEmitter<Catalog>();
  @Output() update: EventEmitter<Catalog> = new EventEmitter<Catalog>();
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();

  form: FormGroup;
  isDisable: boolean;
  hide = true;
  listViewLink = '/catalog/catalogs';
  title = 'Catalogue';
  catalogs$: Observable<any>;



  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _title: Title
  ) {
    this.initForm();
    this._title.setTitle('Catalogue - PM');
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.catalog && this.catalog.id && !this.error) {
      this.form.patchValue(this.catalog);
      this.disableForm();
    }

    // we check if server return error and we print it to catalog
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  initForm(): void {
    this.form = this._fb.group({
      id: [''],
      name: [
        '',
        [Validators.required,  Validators.maxLength(64)]
      ],
      description: [''],
      active: [true],
     parentDto: [
        null
      ],
      companyDto: [null]
    });
    this.catalogs$ = this.form.get("parentDto").valueChanges.pipe(
      startWith(null),
      switchMap((name) => {
        if (typeof name === "string") {
          return of(this.catalogs).pipe(
            delay(300),
            map((response) =>
              response.filter((catalog) => catalog.name.toLowerCase().includes(name))
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
    this.removes.emit([this.catalog.id]);
  }

  disableForm(): void {
    this.form.disable();
    this.isDisable = true;
  }

  onCancel($event: any): void {
    if (this.catalog && this.catalog.id) {
      this.form.patchValue(this.catalog);
      this.disableForm();
    } else {
      this.initForm();
      this.navigate.emit(this.listViewLink);
    }
  }

  // navigations
  onNavigate($event: any): void {
    const catalog: Catalog = $event as Catalog;
    this.navigate.emit(this.listViewLink + '/details/' + catalog.id);
  }

  // validators
  required(name: string): boolean {
    return fromShare.validators.required(this.form, name);
  }

  maximum(name: string) {
    return fromShare.validators.maximum(this.form, name);
  }

}
