import { DatosService } from './../../movimientos/datos.service';
import { HttpService } from './../../shared/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cf-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  private contactoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private datosService: DatosService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.contactoForm = this.formBuilder.group({
      email: [[], Validators.required],
      subject: [[], Validators.required],
      description: [[], Validators.required]
    });
  };

  onSubmit({value, valid}) {
    this.datosService.saveContacto$(value);
  }

  hasErrors(field) {
    return (this.hasChanges(field) && this.getfield(field).errors);
  }

  isNotValid(field) {
    return (this.hasChanges(field) && !this.getfield(field).valid);
  }

  hasChanges(field) {
    return (this.getfield(field).touched || this.getfield(field).dirty);
  }

  getfield(field) {
    return this.contactoForm.get(field);
  }

}
