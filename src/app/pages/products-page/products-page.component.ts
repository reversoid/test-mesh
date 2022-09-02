import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalService } from 'src/app/services/modal.service';
import { getProducts } from 'src/app/shared/NgRx/product.actions';
import {
  selectIsLoading,
  selectProducts,
} from 'src/app/shared/NgRx/product.selectors';
import { IProduct } from 'src/app/shared/types';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  public products: IProduct[] = [];

  public isLoading?: boolean;

  ngOnInit() {
    this.store
      .select(selectProducts)
      .subscribe((products) => (this.products = products));
    this.store
      .select(selectIsLoading)
      .subscribe((isLoading) => (this.isLoading = isLoading));
    this.store.dispatch(getProducts());
  }

  public openProductModal() {
    this.modalService.openModal();
  }

  constructor(private store: Store, private modalService: ModalService) {}
}
