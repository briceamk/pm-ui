import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Catalog, Category, Product} from '@module/catalog/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {delay, map, startWith, switchMap} from 'rxjs/operators';
import * as fromShare from '@app/share';

@Component({
  selector: 'pm-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product;
  @Input() catalogs: Catalog[];
  @Input() categories: Category[];
  @Input() productEntities: { [id: string]: Product };
  @Input() error: any;
  @Input() loading: boolean;
  @Input() image: any;

  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();
  @Output() create: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() update: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() removes: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() upload: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  isDisable: boolean;
  hide = true;
  listViewLink = '/catalog/products';
  title = 'Article';
  catalogs$: Observable<any>;
  categories$: Observable<any>;
  catalogDtoRequiredMessage =  'le catalogue est obligatoire';
  categoryDtoRequiredMessage =  'la catégorie est obligatoire';
  imageFiles: FileList;


  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _title: Title
  ) {
    this.initForm();
    this._title.setTitle('Article - PM');
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.product && this.product.id && !this.error) {
      this.form.patchValue(this.product);
      this.disableForm();
    }
    if(this.product === null || this.product === undefined ) {
      this.image = null;
    }

    // we check if server return error and we print it to product
    if (this.error && 'message' in this.error) {
      this._toastr.error(this.error.message, 'PM');
      this.error = null;
    }
  }

  initForm(): void {
    this.form = this._fb.group({
      id: [''],
      reference: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(64)]],
      description: [ '', ],
      standardCostPrice: [0],
      imageName: [''],
      imageType: [''],
      active: [ true ],
      categoryDto: [ null,],
      catalogDto: [ null,  ],
      companyDto: [null]
    });
    this.catalogs$ = this.form.get('catalogDto').valueChanges.pipe(
      startWith(null),
      switchMap((name) => {
        if (typeof name === 'string') {
          return of(this.catalogs).pipe(
            delay(300),
            map((response) =>
              response.filter((catalog) => catalog.name.toLowerCase().includes(name))
            )
          );
        }
        return of([]);
      })
    );
    this.categories$ = this.form.get('categoryDto').valueChanges.pipe(
      startWith(null),
      switchMap((name) => {
        if (typeof name === 'string') {
          return of(this.categories).pipe(
            delay(300),
            map((response) =>
              response.filter((category) => category.name.toLowerCase().includes(name))
            )
          );
        }
        return of([]);
      })
    );
  }

  // actions
  onSave($event: any): void {
    const {value, invalid} = this.form;
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
    this.image = null;
    this.navigate.emit(this.listViewLink + '/new');
  }

  onEdit($event: any): void {
    this.form.enable();
    this.isDisable = false;
  }

  onRemoves($event: any): void {
    this.removes.emit([this.product.id]);
  }

  disableForm(): void {
    this.form.disable();
    this.isDisable = true;
  }

  onCancel($event: any): void {
    if (this.product && this.product.id) {
      this.form.patchValue(this.product);
      this.disableForm();
    } else {
      this.initForm();
      this.navigate.emit(this.listViewLink);
    }
  }

  // navigations
  onNavigate($event: any): void {
    const product: Product = $event as Product;
    this.navigate.emit(this.listViewLink + '/details/' + product.id);
  }

  // validators
  required(name: string): boolean {
    return fromShare.validators.required(this.form, name);
  }

  maximum(name: string) {
    return fromShare.validators.maximum(this.form, name);
  }

  onChoosePicture() {
    document.getElementById('image').click();
  }

  onUploadImage($event) {
    this.imageFiles = $event.target.files;
    const { value } = this.form;
    const image: File = this.imageFiles.item(0);
    if (value.id !== '' && value.id !== null) {
      this.upload.emit({ id: value.id, image: image });
    }
    this.imageFiles = undefined;
  }
}
