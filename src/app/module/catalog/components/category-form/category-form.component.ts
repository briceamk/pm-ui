import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Category} from '@module/catalog/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {delay, map, startWith, switchMap} from 'rxjs/operators';
import * as fromShare from '@app/share';

@Component({
  selector: 'pm-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent implements OnInit {

  @Input() category: Category;
  @Input() categories: Category[];
  @Input() categoryEntities: { [id: string]: Category };
  @Input() error: any;
  @Input() loading: boolean;

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() update: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();

  form: FormGroup;
  isDisable: boolean;
  hide = true;
  listViewLink = '/catalog/categories';
  title = 'Catégorie';
  categories$: Observable<any>;



  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _title: Title
  ) {
    this.initForm();
    this._title.setTitle('Catégorie - PM');
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.category && this.category.id && !this.error) {
      this.form.patchValue(this.category);
      this.disableForm();
    }

    // we check if server return error and we print it to category
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
      description: [
        '',
      ],
      active: [
        true
      ],
      parentDto: [
        null
      ],
      companyDto: [null]
    });
    this.categories$ = this.form.get("parentDto").valueChanges.pipe(
      startWith(null),
      switchMap((name) => {
        if (typeof name === "string") {
          return of(this.categories).pipe(
            delay(300),
            map((response) =>
              response.filter((category) => category.name.toLowerCase().includes(name))
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
    console.log(value);
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
    this.removes.emit([this.category.id]);
  }

  disableForm(): void {
    this.form.disable();
    this.isDisable = true;
  }

  onCancel($event: any): void {
    if (this.category && this.category.id) {
      this.form.patchValue(this.category);
      this.disableForm();
    } else {
      this.initForm();
      this.navigate.emit(this.listViewLink);
    }
  }

  // navigations
  onNavigate($event: any): void {
    const category: Category = $event as Category;
    this.navigate.emit(this.listViewLink + '/details/' + category.id);
  }

  // validators
  required(name: string): boolean {
    return fromShare.validators.required(this.form, name);
  }

  maximum(name: string) {
    return fromShare.validators.maximum(this.form, name);
  }

}
