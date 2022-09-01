import { Injectable, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ModalComponent } from '../components/modal/modal.component';
import { IProduct } from '../shared/types';

export const enum MODAL_ACTIONS {
  SAVE, REMOVE, CLOSE
};

interface IActionPayload {
  actionType: MODAL_ACTIONS,
  payload: IProduct,
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private _modal: NgbModal) {}

  private modalRef?: NgbModalRef;

  private modalComponent = ModalComponent;

  private closeSubscription$?: Observable<IActionPayload>;

  public openModal() {
    this.modalRef = this._modal.open(this.modalComponent);
    if (!this.closeSubscription$) this.initSubscription();
  }

  public closeModal(actionType: MODAL_ACTIONS, payload: IProduct) {
    this.modalRef?.close({actionType, payload});
  }

  public dismissModal() {
    this.modalRef?.dismiss();
  }

  private initSubscription() {
    this.modalRef?.closed.subscribe(({actionType, payload}: IActionPayload) => {
      console.log(actionType, payload);
    });
  }
}
