import { FormUtils } from './../form-utils';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cf-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {
  public formUtils: FormUtils;

  @Input()
  form: FormGroup;

  @Input()
  campo: string;

  @Input()
  error: string;

  @Input()
  mensaje: string;

  constructor() { }

  ngOnInit() {
    this.formUtils = new FormUtils(this.form);
  }

}
