import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalService } from 'src/app/services/modal.service';
import { removeProduct } from 'src/app/shared/NgRx/product.actions';
import { IProduct } from 'src/app/shared/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  constructor(public modalService: ModalService, private store: Store) {}

  @Input() product!: IProduct;

  public openModal() {
    this.modalService.openModal(this.product);
  }

  public remove() {
    this.store.dispatch(removeProduct(this.product));
  }
}
