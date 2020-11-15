import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Catalog} from '@module/catalog/models';


export const LoadCatalogs = createAction(
  '[Catalog List Page] Load Catalogs '
);
export const LoadCatalogsSuccess = createAction(
  '[Catalog API] Load Catalogs Success',
  props<{ catalogs: Catalog[] }>()
);
export const LoadCatalogsFail = createAction(
  '[Catalog API] Load Catalogs Fail',
  props<{ errorMsg: any }>()
);

export const CreateCatalog = createAction(
  '[Catalog Form Page] Create Catalog ',
  props<{ catalog: Catalog }>()
);
export const CreateCatalogSuccess = createAction(
  '[Catalog API] Create Catalog Success',
  props<{ catalog: Catalog }>()
);
export const CreateCatalogFail = createAction(
  '[Catalog API] Create Catalog Fail',
  props<{ errorMsg: any }>()
);
export const UpdateCatalog = createAction(
  '[Catalog Form Page] Update Catalog ',
  props<{ catalog: Catalog }>()
);
export const UpdateCatalogSuccess = createAction(
  '[Catalog API] Update Catalog Success',
  props<{ catalog: Update<Catalog> }>()
);
export const UpdateCatalogFail = createAction(
  '[Catalog API] Update Catalog Fail',
  props<{ errorMsg: any }>()
);

export const RemoveCatalog = createAction(
  '[Catalog Form Page] Remove Catalog ',
  props<{ ids: string[] }>()
);
export const RemoveCatalogSuccess = createAction(
  '[Catalog API] Remove Catalog Success',
  props<{ ids: string[] }>()
);
export const RemoveCatalogFail = createAction(
  '[Catalog API] Remove Catalog Fail',
  props<{ errorMsg: any }>()
);


export const RemoveCatalogs = createAction(
  '[Catalog List Page] Remove Catalogs ',
  props<{ ids: string[] }>()
);
export const RemoveCatalogsSuccess = createAction(
  '[Catalog API] Remove Catalogs Success',
  props<{ ids: string[] }>()
);
export const RemoveCatalogsFail = createAction(
  '[Catalog API] Remove Catalogs Fails',
  props<{ errorMsg: any }>()
);
