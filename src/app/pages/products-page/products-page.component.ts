import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/MockApi/storage.service';
import { IProduct } from 'src/app/shared/types';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent {
  public products: IProduct[] = [
    {
      id: 1,
      description: 'hmm there is some descripton',
      name: 'Iphone max',
      price: 999,
    }
  ];
}
