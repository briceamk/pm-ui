import {CatalogTreeViewComponent} from '@module/catalog/containers/catalog-tree-view/catalog-tree-view.component';
import {CatalogFormViewComponent} from '@module/catalog/containers/catalog-form-view/catalog-form-view.component';
import {CategoryFormViewComponent} from '@module/catalog/containers/category-form-view/category-form-view.component';
import {CategoryTreeViewComponent} from '@module/catalog/containers/category-tree-view/category-tree-view.component';
import {ProductFormViewComponent} from '@module/catalog/containers/product-form-view/product-form-view.component';
import {ProductTreeViewComponent} from '@module/catalog/containers/product-tree-view/product-tree-view.component';


export const containers: any[] = [
  CatalogFormViewComponent,
  CatalogTreeViewComponent,
  CategoryFormViewComponent,
  CategoryTreeViewComponent,
  ProductFormViewComponent,
  ProductTreeViewComponent
]

export  * from '@module/catalog/containers/catalog-tree-view/catalog-tree-view.component';
export  * from '@module/catalog/containers/catalog-form-view/catalog-form-view.component';
export  * from '@module/catalog/containers/category-form-view/category-form-view.component';
export  * from '@module/catalog/containers/category-tree-view/category-tree-view.component';
export  * from '@module/catalog/containers/product-form-view/product-form-view.component';
export  * from '@module/catalog/containers/product-tree-view/product-tree-view.component';
