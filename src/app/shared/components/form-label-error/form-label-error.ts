import { FormUtils } from '@/shared/utils/form-utils';
import { Component, input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'form-label-error',
  imports: [],
  templateUrl: './form-label-error.html',
})
export class FormLabelError {

  control = input.required<AbstractControl>();

  get errorMessage(): string {
    const errors: ValidationErrors = this.control().errors || {};
    //! Formulario tocado y tiene errores
    return this.control().touched && Object.keys(errors).length > 0 ? FormUtils.getTextError(errors) : '';
  }
}
