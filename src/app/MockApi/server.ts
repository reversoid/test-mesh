import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { CreateProductDTO } from './types';

const enum ERRORS {
  'PRODUCT_ID_NOT_FOUND' = 'PRODUCT_ID_NOT_FOUND',
  'SERVER_ERROR' = 'SERVER_ERROR',
  'WRONG_METHOD' = 'WRONG_METHOD',
  'UNKNOWN_ERROR' = 'UNKNOWN_ERROR',
}

const ALLOWED_METHODS = ['POST', 'GET', 'PUT', 'DELETE'];

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  private HTTP_METHODS_AND_FUNCTIONS = {
    'GET': this._handleProductGET,
    'POST': this._handleProductPOST,
    'PUT': this._handleProductPUT,
    'DELETE': this._handleProductDELETE,
  };

  private _handleProductGET() {
    return throwError(
      () => new HttpErrorResponse({ status: 500, error: ERRORS.SERVER_ERROR })
    );
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
    if (product === undefined) {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: ERRORS.PRODUCT_ID_NOT_FOUND,
          })
      );
    }

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
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: ERRORS.PRODUCT_ID_NOT_FOUND,
          })
      );
    return of(new HttpResponse({ status: 200, body: { id } }));
  }

  private _handleProducts(req: HttpRequest<any>) {
    if (req.method === 'GET') return this._handleProductGET();
    if (req.method === 'POST')
      return this._handleProductPOST(req.body.productData);
    if (req.method === 'PUT')
      return this._handleProductPUT(req.body.id, req.body.newProductData);
    if (req.method === 'DELETE') return this._handleProductDELETE(req.body.id);
    return of(new HttpResponse({ status: 404 })); // TODO THINK ABOUT IT
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url !== 'http://localhost:4200/products' || !ALLOWED_METHODS.includes(req.method)) return next.handle(req).pipe(catchError((errObj) => {
      if (errObj.status === 404) return throwError(() => ERRORS.WRONG_METHOD);
      return throwError(() => ERRORS.UNKNOWN_ERROR);
    }));

    return this._handleProducts(req).pipe(catchError((err) => throwError(() => err.error)));
  }
}
