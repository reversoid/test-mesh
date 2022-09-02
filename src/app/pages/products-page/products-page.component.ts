import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getProducts } from 'src/app/shared/NgRx/product.actions';
import { selectIsLoading, selectProducts } from 'src/app/shared/NgRx/product.selectors';
import { IProduct } from 'src/app/shared/types';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  public products: IProduct[] = [
    {
      id: 1,
      description: 'hmm there is some descripton',
      name: 'Iphone max',
      price: 999,
    },
  ];

  ngOnInit() {
    this.store.select(selectProducts).subscribe(e => console.log('this is products', e));

    this.store.dispatch(getProducts());
  }

  constructor (private store: Store) {}
}
