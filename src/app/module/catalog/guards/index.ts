import {CatalogGuard} from '@module/catalog/guards/catalog.guard';
import {CategoryGuard} from '@module/catalog/guards/category.guard';
import {ProductGuard} from '@module/catalog/guards/product.guard';
import {ProductImageGuard} from '@module/catalog/guards/product-image.guard';

export const guards: any[] = [
  CatalogGuard,
  CategoryGuard,
  ProductGuard,
  ProductImageGuard
];

export *  from '@module/catalog/guards/catalog.guard';
export *  from '@module/catalog/guards/category.guard';
export *  from '@module/catalog/guards/product.guard';
export *  from '@module/catalog/guards/product-image.guard';
