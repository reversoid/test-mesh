import { AbstractControl, Validators } from '@angular/forms';

export function greaterZeroValidator(control: AbstractControl) {
  const greaterZero = Number(control.value) > 0;
  if (greaterZero) return null;
  return {
    greaterZero: false,
  };
}

export function numberValidator() {
  return Validators.pattern(/^[0-9.]+$/);
}
