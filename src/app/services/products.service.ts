import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CreateProductDTO } from '../MockApi/types';
import { IProduct } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  public getAllProducts() {
    return this._http
      .get<{ products: IProduct[] }>('http://localhost:4200/products')
      .pipe(map((response) => response.products));
  }

  public removeProduct(id: number) {
    return this._http
      .delete<{ id: number }>('http://localhost:4200/products', {
        body: {
          id,
        },
      })
      .pipe(map((response) => response.id));
  }

  public createProduct(product: IProduct) {
    return this._http
      .post<{ product: IProduct }>('http://localhost:4200/products', {
        productData: product as CreateProductDTO,
      })
      .pipe(map((response) => response.product));
  }

  public updateProduct(product: IProduct) {
    return this._http
      .put<{ product: IProduct }>('http://localhost:4200/products', {
        id: product.id,
        newProductData: product as CreateProductDTO,
      })
      .pipe(map((response) => response.product));
  }
}
