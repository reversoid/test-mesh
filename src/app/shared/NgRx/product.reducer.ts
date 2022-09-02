import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../types';
import {
  toggleIsLoading,
  SUCCESS_ACTIONS,
  FAILURE_ACTION,
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
  on(SUCCESS_ACTIONS.getProducts, (state, { products }) => ({
    ...state,
    products,
  })),
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
    const arr = [...state.products];

    let index = arr.findIndex((p) => p.id === product.id);
    if (index === -1) return state;
    arr.splice(index, 1, product);
    return { ...state, products: arr };
  }),
  on(toggleIsLoading, (state, { to }) => {
    console.log(`hey isLoading is changed to ${to}`);
    return { ...state, isLoading: to };
  }),
  on(FAILURE_ACTION, (state, { message }) => {
    return { ...state, errorMessage: message };
  })
);
