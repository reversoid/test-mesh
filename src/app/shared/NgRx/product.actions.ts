import { createAction, props } from '@ngrx/store';
import { IProduct } from '../types';

export const SUCCESS_ACTIONS = {
  createProduct: createAction(
    '[Product API] createProductSuccess',
    props<{ product: IProduct }>()
  ),

  getProducts: createAction(
    '[Product API] getProductsSuccess',
    props<{ products: IProduct[] }>()
  ),

  updateProduct: createAction(
    '[Product API] updateProductSuccess',
    props<{ product: IProduct }>()
  ),

  removeProduct: createAction(
    '[Product API] removeProductSuccess',
    props<{ id: number }>()
  ),
};

export const FAILURE_ACTION = createAction(
  '[Product API] failureProductOperation',
  props<{ message: string }>()
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
