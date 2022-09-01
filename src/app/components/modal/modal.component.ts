import { Component, Input, OnInit } from '@angular/core';
import { ModalService, MODAL_ACTIONS } from 'src/app/services/modal.service';
import { IProduct } from 'src/app/shared/types';

const TITLES = {
  'ADD': 'Add product',
  'UPDATE': 'Edit product',
}

const EMPTY_PRODUCT: IProduct = {
  id: -1,
  description: '',
  name: '',
  price: -1,
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  constructor(public modalService: ModalService) {}

  @Input() type: 'ADD' | 'UPDATE' = 'ADD';

  @Input() product: IProduct = EMPTY_PRODUCT;

  public title = '';

  ngOnInit() {
    this.title = TITLES[this.type];
  }

  public close() {
    this.modalService.dismissModal();
  }

  public remove() {
    this.modalService.closeModal(MODAL_ACTIONS.REMOVE, this.product);
  }

  public save() {
    this.modalService.closeModal(MODAL_ACTIONS.SAVE, this.product);
  }
}

