import { FormGroup } from '@angular/forms';

export class FormUtils {
  private form: FormGroup;

  constructor(form: FormGroup) {
    this.form = form;
  }

  tieneErrores(campo) {
    return (this.tieneCambios(campo) && this.getCampo(campo).errors);
  }

  noEsValido(campo) {
    return (this.tieneCambios(campo) && !this.getCampo(campo).valid);
  }

  tieneCambios(campo) {
    return (this.getCampo(campo).touched || this.getCampo(campo).dirty);
  }

  campoTieneError(campo, error) {
    return this.getCampo(campo).errors[error];
  }

  getCampo(campo) {
    return this.form.get(campo);
  }

}
