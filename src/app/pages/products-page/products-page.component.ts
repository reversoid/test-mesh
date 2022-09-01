import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/types';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent {
  public products: IProduct[] = [
    {
      id: 1,
      description: 'hmm there is some descripton',
      name: 'Iphone max',
      price: 999,
    },
  ];
}
