import { FormGroup } from '@angular/forms';

export class FormUtils {
  public form: FormGroup;
  public mensajes = {
    required: 'El campo es obligatorio',
    positive: 'El importe debe ser positivo',
    betweenTwoDates: 'La fecha debe de estar comprendida entre hoy y +- 5días'
  };

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

  getErroresCampo(campo) {
    return Object.keys(this.getCampo(campo).errors);
  }

  getCampo(campo) {
    return this.form.get(campo);
  }

  getMensajeError(error) {
    return this.mensajes[error];
  }
}
