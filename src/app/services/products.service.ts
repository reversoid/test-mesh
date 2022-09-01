import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO } from '../MockApi/types';
import { IProduct } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  public getAllProducts() {
    return this._http.get<IProduct[]>('http://localhost:4200/products');
  }

  public removeProduct(id: number) {
    return this._http.delete<{ id: number }>('http://localhost:4200/products', {
      body: {
        id,
      },
    });
  }

  public createProduct(product: IProduct) {
    return this._http.post<IProduct>('http://localhost:4200/products', {
      productData: product as CreateProductDTO,
    });
  }

  public updateProduct(product: IProduct) {
    return this._http.put<IProduct>('http://localhost:4200/products', {
      id: product.id,
      newProductData: product as CreateProductDTO,
    });
  }
}
