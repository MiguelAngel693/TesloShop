import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 2500)
  })
}

export class FormUtils {
  //Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)'; //(a...z)U(a...Z)* (a...z)U(a...Z)*
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static slugPattern = '^[a-z0-9_]+(?:-[a-z0-9_]+)*$';
  // static passwordPattern = '/^(?=.{6,50}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/'
  static passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,50}$/
  // static passwordPattern = '[A-Za-z0-9]+'

  static getTextError(errors: ValidationErrors) {


    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres`
        case 'min':
          return `Valor minimo de ${errors['min'].min}`
        case 'email':
          return `El valor ingresado no es un email`
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El correo electrónico no es valido'
          }
          if (errors['pattern'].requiredPattern == FormUtils.passwordPattern) {
            if (!/[A-Z]/.test(errors['pattern'].actualValue))
              return 'Al menos una mayúscula';
            if (!/[a-z]/.test(errors['pattern'].actualValue))
              return 'Al menos una minúscula';
            if (!/d/.test(errors['pattern'].actualValue))
              return 'Al menos un numero';
          }
          break;
        case 'emailTaken':
          return 'El correo electrónico ya esta registrado'
        case 'userTaken':
          return 'El nombre de usuario no se encuentra disponible'
        default:
          return `Error de validacion no controlado ${key}`

      }
    }
    return null
  }

  static isValidField(fieldName: string, form: FormGroup): boolean | null {
    return (!!form.controls[fieldName].errors && form.controls[fieldName].touched);
  }

  static getFieldError(fieldName: string, form: FormGroup): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (formArray.controls[index].errors && formArray.controls[index].touched);
  }

  static getFieldErrorInArray(index: number, formArray: FormArray): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);
  }

  static onSave(form: FormGroup) {
    if (form.valid) {
      form.markAllAsTouched();
      return;
    }

    form.reset({
      price: 100,
      inStorage: 50,
      name: 'Yo'
    });
    form.reset();
  }

  static isFirstFieldEqualSecondField(first: string, second: string) {
    return (formGroup: AbstractControl) => {
      const firstValue = formGroup.get(first)?.value;
      const secondValue = formGroup.get(second)?.value;


      return firstValue === secondValue ? null : { fieldsNotEqual: true };
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    console.log('Validando');


    await sleep();

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return { emailTaken: true };
    }
    return null;
  }
  static notStrider(control: AbstractControl): ValidationErrors | null {
    console.log('Validando');


    const formValue = control.value;

    if (formValue === 'strider' || formValue === 'Strider') {
      return { userTaken: true };
    }
    return null;
  }

}
