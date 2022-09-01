import { IProduct } from 'src/app/shared/types';
import { IErrors } from './types';

export const TITLES = {
  ADD: 'Add product',
  UPDATE: 'Edit product',
};

export const ERRORS = {
  REQUIRED: 'This field is required',
  GREATER_ZERO: 'This field must be above 0',
  NUMERIC: 'This field must be numeric',
};

export const EMPTY_PRODUCT: IProduct = {
  id: -1,
  description: '',
  name: '',
  price: -1,
};

export const EMPTY_ERRORS_STATE: IErrors = {
  name: null,
  description: null,
  price: null,
};
