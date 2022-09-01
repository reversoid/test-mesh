import { createAction, props } from '@ngrx/store';
import { IProduct } from '../types';

export const getProductsSuccess = createAction(
  '[Product API] getProducts',
  props<{ products: IProduct[] }>()
);

export const createProductSuccess = createAction(
  '[Product API] createProduct',
  props<{ product: IProduct }>()
);

export const updateProductSuccess = createAction(
  '[Product API] updateProduct',
  props<{ product: IProduct }>()
);

export const removeProductSuccess = createAction(
  '[Product API] removeProduct',
  props<{ id: number }>()
);
