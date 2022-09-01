import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../types';
import {
  createProductSuccess,
  getProductsSuccess,
  removeProductSuccess,
  toggleIsLoading,
  updateProductSuccess,
} from './product.actions';

export interface ProductState {
  products: IProduct[];
  isLoading: boolean;
}

export const initialState: ProductState = {
  isLoading: false,
  products: [],
};

export const productReducer = createReducer(
  initialState,
  on(getProductsSuccess, (state, { products }) => ({ ...state, products })),
  on(removeProductSuccess, (state, { id }) => {
    const newProductsState = state.products.filter(
      (product) => product.id !== id
    );
    return { ...state, products: newProductsState };
  }),
  on(createProductSuccess, (state, { product }) => {
    return { ...state, products: [...state.products].concat(product) };
  }),
  on(updateProductSuccess, (state, { product }) => {
    return { ...state, products: [...state.products].concat(product) };
  }),
  on(toggleIsLoading, (state, { to }) => {
    return { ...state, isLoading: to };
  })
);
