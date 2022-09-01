import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { IProduct } from 'src/app/shared/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(public modalService: ModalService) {}

  @Input() product!: IProduct;

  public openModal() {
    this.modalService.openModal(this.product, 'UPDATE');
  }
}
