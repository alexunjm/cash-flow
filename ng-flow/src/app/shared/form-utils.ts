import { FormGroup } from '@angular/forms';

export class FormUtils {
  private form: FormGroup;

  constructor(form: FormGroup) {
    this.form = form;
  }

  tieneErrores(field) {
    return (this.hasChanges(field) && this.getfield(field).errors);
  }

  noEsValido(field) {
    return (this.hasChanges(field) && !this.getfield(field).valid);
  }

  hasChanges(field) {
    return (this.getfield(field).touched || this.getfield(field).dirty);
  }

  getfield(field) {
    return this.form.get(field);
  }

}
