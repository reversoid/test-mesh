import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalComponent } from '../components/modal/modal.component';
import { createProduct } from '../shared/NgRx/product.actions';
import { IProduct } from '../shared/types';

export const enum MODAL_ACTIONS {
  SAVE,
  REMOVE,
  CLOSE,
}

interface IActionPayload {
  actionType: MODAL_ACTIONS;
  payload: IProduct;
}

export type ModalPurpose = 'ADD' | 'UPDATE';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private _modal: NgbModal, private store: Store) {}

  private modalRef?: NgbModalRef;

  private modalComponent = ModalComponent;

  private closeSubscription$?: Observable<IActionPayload>;

  public openModal(product?: IProduct) {
    this.modalRef = this._modal.open(this.modalComponent);
    if (product) this.modalRef.componentInstance.product = product;
    if (!this.closeSubscription$) this.initSubscription();
  }

  public closeModal(actionType: MODAL_ACTIONS, payload: IProduct) {
    this.modalRef?.close({ actionType, payload });
  }

  public dismissModal() {
    this.modalRef?.dismiss();
  }

  private initSubscription() {
    this.modalRef?.closed.subscribe(
      ({ actionType, payload }: IActionPayload) => {
        if (actionType === MODAL_ACTIONS.SAVE) {
          this.store.dispatch(createProduct({product: payload}));
        }        
      }
    );
  }
}
