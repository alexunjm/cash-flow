import { AbstractControl, ValidatorFn } from '@angular/forms';

interface ResponseValidator {
  [key: string]: boolean;
}

export function positiveNumberValidator(control: AbstractControl): ResponseValidator {
  if (control.value !== undefined && (isNaN(control.value) || control.value < 0)) {
    return { 'positive': true };
  }
  return null;
}

export function betweenTwoDatesValidator(date1: Date, date2: Date): ValidatorFn {
  return (control: AbstractControl): ResponseValidator => {
    const currentDate = new Date(control.value);
    if (currentDate < date1 || currentDate > date2) {
      return { 'betweenTwoDates': true };
    }
    return null;
  };

}
