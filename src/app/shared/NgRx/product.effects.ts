import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { getProducts, SUCCESS_ACTIONS, FAILURE_ACTION, toggleIsLoading, createProduct, removeProduct, updateProduct } from './product.actions';

const API_CALL_ACTIONS = {
  createProduct,
  getProducts,
  updateProduct,
  removeProduct,
}

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  enableIsLoading$ = createEffect(() => {
    const types = Object.values(API_CALL_ACTIONS);
    return this.actions$.pipe(ofType(...types)).pipe(
      map(() => toggleIsLoading({to: true})),
    );
  });

  disableIsLoading$ = createEffect(() => {
    const types = [...Object.values(SUCCESS_ACTIONS), FAILURE_ACTION]; 
    return this.actions$.pipe(ofType(...types)).pipe(
      map(() => toggleIsLoading({to: false})),
    );
  });

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(ofType(getProducts)).pipe(
      mergeMap(() => {
        return this.productsService.getAllProducts().pipe(
          map((products) => {
            return SUCCESS_ACTIONS.getProducts({ products });
          }),
          catchError((error: string) => of(FAILURE_ACTION({message: error}))),
        );
      })
    );
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(ofType(createProduct)).pipe(
      mergeMap((payload) => {
        return this.productsService.createProduct(payload.product).pipe(
          map((product) => {
            return SUCCESS_ACTIONS.createProduct({ product });
          }),
          catchError((error: string) => of(FAILURE_ACTION({message: error}))),
        );
      })
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateProduct)).pipe(
      mergeMap((payload) => {
        return this.productsService.createProduct(payload.product).pipe(
          map((product) => {
            return SUCCESS_ACTIONS.updateProduct({ product });
          }),
          catchError((error: string) => of(FAILURE_ACTION({message: error}))),
        );
      })
    );
  });

  removeProduct$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateProduct)).pipe(
      mergeMap((payload) => {
        return this.productsService.createProduct(payload.product).pipe(
          map((product) => {
            return SUCCESS_ACTIONS.removeProduct({ id: product.id });
          }),
          catchError((error: string) => of(FAILURE_ACTION({message: error}))),
        );
      })
    );
  });
}
