import { createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProducts = createSelector(
  (state: object) => (<{ product: ProductState }>state).product,
  (product) => product.products,
);

export const selectIsLoading = createSelector(
  (state: object) => (<{ product: ProductState }>state).product,
  (product) => product.isLoading,
);

export const selectErrorMessage = createSelector(
    (state: object) => (<{ product: ProductState }>state).product,
    (product) => product.errorMessage,
  );