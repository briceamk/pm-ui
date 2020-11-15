import {CatalogEffect} from '@module/catalog/store/effects/catalog.effect';
import {CategoryEffect} from '@module/catalog/store/effects/category.effect';
import {ProductEffect} from '@module/catalog/store/effects/product.effect';

export const effects: any[] = [
  CatalogEffect,
  CategoryEffect,
  ProductEffect
];

export * from '@module/catalog/store/effects/catalog.effect';
export * from '@module/catalog/store/effects/category.effect';
export * from '@module/catalog/store/effects/product.effect';
