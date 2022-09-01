import { Injectable } from '@angular/core';
import { IProduct } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public getProducts(): IProduct[] {
    return JSON.parse(localStorage.getItem('products') ?? '[]');
  }

  public setProducts(products: IProduct[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }
}
