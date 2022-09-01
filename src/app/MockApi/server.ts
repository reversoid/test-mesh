import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { CreateProductDTO } from './types';

const PRODUCT_ID_NOT_FOUND = 'Product with specified id does not exist';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  private _handleProductGET() {
    const products = this.storageService.getProducts();
    return of(new HttpResponse({ status: 200, body: { products } }));
  }

  private _handleProductPOST(productData: CreateProductDTO) {
    const products = this.storageService.getProducts();

    let newID = (() => {
      const largestID = products.reduce(
        (acc, product) => (product.id > acc ? product.id : acc),
        -1
      );
      return largestID + 1;
    })();
    const newProduct = { ...productData, id: newID };
    products.push(newProduct);
    this.storageService.setProducts(products);
    return of(new HttpResponse({ status: 201, body: { product: newProduct } }));
  }

  private _handleProductPUT(id: number, newProductData: CreateProductDTO) {
    const products = this.storageService.getProducts();
    let product = products.find((p) => p.id === id);
    if (product === undefined)
      return of(
        new HttpResponse({
          status: 400,
          body: {
            message: PRODUCT_ID_NOT_FOUND,
          },
        })
      );

    product.description = newProductData.description;
    product.name = newProductData.name;
    product.price = newProductData.price;

    this.storageService.setProducts(products);

    return of(new HttpResponse({ status: 200, body: { product } }));
  }

  private _handleProductDELETE(id: number) {
    const products = this.storageService.getProducts();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1)
      return of(
        new HttpResponse({
          status: 400,
          body: { message: PRODUCT_ID_NOT_FOUND },
        })
      );
    return of(new HttpResponse({ status: 200, body: {id} }));
  }

  private _handleProducts(req: HttpRequest<any>) {
    if (req.method === 'GET') return this._handleProductGET();
    if (req.method === 'POST')
      return this._handleProductPOST(req.body.productData);
    if (req.method === 'PUT')
      return this._handleProductPUT(req.body.id, req.body.newProductData);
    if (req.method === 'DELETE') return this._handleProductDELETE(req.body.id);
    return of(new HttpResponse({ status: 404 }));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url !== 'http://localhost:4200/products') return next.handle(req);

    return this._handleProducts(req);
  }
}
