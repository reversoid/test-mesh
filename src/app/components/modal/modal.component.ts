import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

function greaterZeroValidator(control: AbstractControl) {
  const greaterZero = Number(control.value) > 0;
  if (greaterZero) return null;
  return {
    greaterZero: true,
  };
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  constructor(public modalService: ModalService, private _fb: FormBuilder) {}

  @Input() type: 'ADD' | 'UPDATE' = 'ADD';

  @Input() product: IProduct = EMPTY_PRODUCT;

  public title = '';

  public form!: FormGroup;

  ngOnInit() {
    this.title = TITLES[this.type];
    this.form = this._fb.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      price: ['hie', [Validators.required, greaterZeroValidator]]
    });
    this.form.valueChanges.subscribe((e) => {console.log(e, this.form.invalid) })
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

