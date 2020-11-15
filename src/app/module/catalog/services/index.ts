import {CatalogService} from '@module/catalog/services/catalog.service';
import {CategoryService} from '@module/catalog/services/category.service';
import {ProductService} from '@module/catalog/services/product.service';

export const services: any[] = [
  CatalogService,
  CategoryService,
  ProductService
];

export * from '@module/catalog/services/catalog.service';
export * from '@module/catalog/services/category.service';
export * from '@module/catalog/services/product.service';
