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

}
