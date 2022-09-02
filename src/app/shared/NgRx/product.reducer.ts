import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../types';
import {
  toggleIsLoading,
  SUCCESS_ACTIONS,
  FAILURE_ACTIONS,
} from './product.actions';

export interface ProductState {
  products: IProduct[];
  isLoading: boolean;
  errorMessage: string;
}

export const initialState: ProductState = {
  isLoading: false,
  products: [],
  errorMessage: '',
};

export const productReducer = createReducer(
  initialState,
  on(SUCCESS_ACTIONS.getProducts, (state, { products }) => ({ ...state, products })),
  on(SUCCESS_ACTIONS.removeProduct, (state, { id }) => {
    const newProductsState = state.products.filter(
      (product) => product.id !== id
    );
    return { ...state, products: newProductsState };
  }),
  on(SUCCESS_ACTIONS.createProduct, (state, { product }) => {
    return { ...state, products: state.products.concat(product) };
  }),
  on(SUCCESS_ACTIONS.updateProduct, (state, { product }) => {
    const newArr = [...state.products];
    let index = newArr.findIndex((p) => p.id === product.id);
    if (index === -1) return state;
    newArr[index] = product;
    return { ...state, products: newArr };
  }),
  on(toggleIsLoading, (state, { to }) => {
    console.log(`hey isLoading is changed to ${to}`);
    return { ...state, isLoading: to };
  })
);
