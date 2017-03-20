import { positiveNumberValidator, betweenTwoDatesValidator } from '../../shared/custom-validators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from './../modelos/categoria';
import { DatosService } from './../datos.service';
import { Movimiento } from './../modelos/movimiento';
import { Tipo } from './../modelos/tipo';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'cf-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  private nuevoForm: FormGroup;
  tipos: Tipo[] = [];
  categorias: Categoria[] = [];
  movimiento: Movimiento;

  constructor(private formBuilder: FormBuilder, private datosService: DatosService) { }

  ngOnInit() {
    this.movimiento = this.datosService.getNuevoMovimiento();
    this.getTiposMovimiento();
    this.buildForm();
    this.onChangeTipo();
  }

  getTiposMovimiento() {
    this.datosService.getTiposMovimiento$().subscribe(tipos => {
      this.tipos = tipos;
      this.datosService.getCategorias$().subscribe(categorias => {
        this.categorias = this.datosService.getCategoriasPorTipo(this.movimiento.tipo);
      });
    });
  }

  buildForm() {
    const currentDate = new Date(Date.now());
    const pastDate = new Date(Date.now());
    const futureDate = new Date(Date.now());

    pastDate.setDate(currentDate.getDate() - 6);
    futureDate.setDate(currentDate.getDate() + 5);

    this.nuevoForm = this.formBuilder.group({
      fecha: [this.movimiento.fecha.toISOString().substring(0, 10), [Validators.required, betweenTwoDatesValidator(pastDate, futureDate)]],
      importe: [this.movimiento.importe, [Validators.required, positiveNumberValidator]],
      tipo: 1,
      categoria: ['', Validators.required]
    });
  }

  onChangeTipo() {
    this.nuevoForm.get('tipo').valueChanges.subscribe((tipo) => {
      this.datosService.getCategorias$().subscribe(categorias => {
        this.categorias = this.datosService.getCategoriasPorTipo(tipo);
        this.nuevoForm.patchValue({
          categoria: ''
        });
      });
    });
  }

  alGuardarMovimiento(): void {
    this.datosService
      .postMovimiento$(this.movimiento)
      .subscribe(r => console.log('Movimiento guardado'));
  }

}
