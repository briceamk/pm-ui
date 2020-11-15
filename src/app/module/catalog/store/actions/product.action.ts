import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Product} from '@module/catalog/models';


export const LoadProducts = createAction(
  '[Product List Page] Load Products '
);
export const LoadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: Product[] }>()
);
export const LoadProductsFail = createAction(
  '[Product API] Load Products Fail',
  props<{ errorMsg: any }>()
);

export const CreateProduct = createAction(
  '[Product Form Page] Create Product ',
  props<{ product: Product }>()
);
export const CreateProductSuccess = createAction(
  '[Product API] Create Product Success',
  props<{ product: Product }>()
);
export const CreateProductFail = createAction(
  '[Product API] Create Product Fail',
  props<{ errorMsg: any }>()
);
export const UpdateProduct = createAction(
  '[Product Form Page] Update Product ',
  props<{ product: Product }>()
);
export const UpdateProductSuccess = createAction(
  '[Product API] Update Product Success',
  props<{ product: Update<Product> }>()
);
export const UpdateProductFail = createAction(
  '[Product API] Update Product Fail',
  props<{ errorMsg: any }>()
);

export const RemoveProduct = createAction(
  '[Product Form Page] Remove Product ',
  props<{ ids: string[] }>()
);
export const RemoveProductSuccess = createAction(
  '[Product API] Remove Product Success',
  props<{ ids: string[] }>()
);
export const RemoveProductFail = createAction(
  '[Product API] Remove Product Fail',
  props<{ errorMsg: any }>()
);

export const RemoveProducts = createAction(
  '[Product List Page] Remove Products ',
  props<{ ids: string[] }>()
);
export const RemoveProductsSuccess = createAction(
  '[Product API] Remove Products Success',
  props<{ ids: string[] }>()
);
export const RemoveProductsFail = createAction(
  '[Product API] Remove Products Fails',
  props<{ errorMsg: any }>()
);

export const DownloadProductImage = createAction(
  '[Product Form] Download Product Image',
  props<{ id: string }>()
);

export const DownloadProductImageSuccess = createAction(
  '[Product API] Download Product Image Success',
  props<{ image: any }>()
);

export const DownloadProductImageFail = createAction(
  '[Product API] Download Product Image Fail',
  props<{ errorMsg: any }>()
);

export const SetProductImage = createAction(
  '[Product Form] Set Product Image',
  props<{ id: string; image: File }>()
);

export const SetProductImageSuccess = createAction(
  '[Product API] Set Product Image Success',
  props<{ product: Update<Product> }>()
);

export const SetProductImageFail = createAction(
  '[Product API] Set Product Image Fail',
  props<{ errorMsg: any }>()
);



