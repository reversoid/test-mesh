import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, finalize } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { getProducts, SUCCESS_ACTIONS, FAILURE_ACTIONS, toggleIsLoading } from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  enableIsLoading$ = createEffect(() => {
    return this.actions$.pipe(ofType(getProducts)).pipe(
      map(() => toggleIsLoading({to: true})),
    );
  });

  disableIsLoading$ = createEffect(() => {
    const types = [...Object.values(SUCCESS_ACTIONS), ...Object.values(FAILURE_ACTIONS)]; 
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
          catchError(() => EMPTY),
        );
      })
    );
  });
}
