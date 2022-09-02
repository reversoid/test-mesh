import { createAction, props } from '@ngrx/store';
import { IProduct } from '../types';

export const getProductsSuccess = createAction(
  '[Product API] getProductsSuccess',
  props<{ products: IProduct[] }>()
);

export const createProductSuccess = createAction(
  '[Product API] createProductSuccess',
  props<{ product: IProduct }>()
);

export const updateProductSuccess = createAction(
  '[Product API] updateProductSuccess',
  props<{ product: IProduct }>()
);

export const removeProductSuccess = createAction(
  '[Product API] removeProductSuccess',
  props<{ id: number }>()
);

export const toggleIsLoading = createAction(
  '[Product API] toggleIsLoading',
  props<{ to: boolean }>()
);

export const getProducts = createAction('[Product API] getProducts');

export const createProduct = createAction(
  '[Product API] createProduct',
  props<{ product: IProduct }>()
);

export const updateProduct = createAction(
  '[Product API] updateProduct',
  props<{ product: IProduct }>()
);

export const removeProduct = createAction(
  '[Product API] removeProduct',
  props<{ id: number }>()
);
