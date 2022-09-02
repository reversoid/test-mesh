import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, finalize } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { getProducts, getProductsSuccess, toggleIsLoading } from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(ofType(getProducts)).pipe(
      map(() => toggleIsLoading({to: true})),
      finalize(() => toggleIsLoading({to: false})),
      mergeMap(() => {
        return this.productsService.getAllProducts().pipe(
          map((products) => {
            return getProductsSuccess({ products });
          })
        );
      })
    );
  });
}
