import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ModalPurpose, ModalService, MODAL_ACTIONS } from 'src/app/services/modal.service';
import { IProduct } from 'src/app/shared/types';
import { EMPTY_ERRORS_STATE, EMPTY_PRODUCT, ERRORS, TITLES } from './utils/constants';
import { IErrors, ProductFormType } from './utils/types';
import { greaterZeroValidator, numberValidator } from './utils/validators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(public modalService: ModalService, private _fb: FormBuilder) {}

  @Input() type: ModalPurpose = 'ADD';

  @Input() product: IProduct = EMPTY_PRODUCT;

  public title = '';

  public form!: FormGroup;

  public errors: IErrors = EMPTY_ERRORS_STATE;

  private _ngDestroySubscription$ = new Subject<boolean>();

  ngOnInit() {
    this.title = TITLES[this.type];
    this.form = this._fb.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      price: [
        this.product.price === -1 ? '' : this.product.price,
        [Validators.required, greaterZeroValidator, numberValidator()],
      ],
    });

    this.form.valueChanges
      .pipe(takeUntil(this._ngDestroySubscription$))
      .subscribe((formValues: ProductFormType) => {
        this._proceedFormValues(formValues);
      });
  }

  private _proceedFormValues(formValues: ProductFormType) {
    (() => {
      const field = this.form.controls['name'];
      const errors = field.errors;
      if (errors && errors['required'] && (field.touched || field.dirty))
        this.errors.name = ERRORS.REQUIRED;
      else this.errors.name = null;
    })();

    (() => {
      const field = this.form.controls['description'];
      const errors = field.errors;
      if (errors && errors['required'] && (field.touched || field.dirty))
        this.errors.description = ERRORS.REQUIRED;
      else this.errors.description = null;
    })();

    (() => {
      const field = this.form.controls['price'];
      const errors = field.errors;
      const hasErrorsAndTouched = errors && (field.touched || field.dirty);
      if (hasErrorsAndTouched) {
        console.log(errors);
        
        if (errors['required']) this.errors.price = ERRORS.REQUIRED;
        else if (errors['pattern']) this.errors.price = ERRORS.NUMERIC;
        else if (errors['greaterZero'] === false)
          this.errors.price = ERRORS.GREATER_ZERO;
      } else this.errors.price = null;
    })();
  }

  public emitChangeEvent() {
    const prevValues = this.form.value;
    this.form.patchValue(prevValues, { emitEvent: true });
  }

  public close() {
    this.modalService.dismissModal();
  }

  public remove() {
    this.modalService.closeModal(MODAL_ACTIONS.REMOVE, this.product);
  }

  public save() {
    const product: IProduct = {
      ...this.product,
      description: this.form.controls['description'].value,
      name: this.form.controls['name'].value,
      price: this.form.controls['price'].value,
    };
    this.modalService.closeModal(MODAL_ACTIONS.SAVE, product);
  }

  ngOnDestroy(): void {
    this._ngDestroySubscription$.next(true);
    this._ngDestroySubscription$.complete();
  }
}