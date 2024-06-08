import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  getFieldError(myForm: FormGroup, field: string): string | null {
    if (!myForm.controls[field]) return null;
    const errors = myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es obligatorio';
        case 'email':
          return 'El campo debe ser un email válido';
        case 'pattern':
          return 'El campo debe tener un formato válido';
        case 'notEqual':
          return 'Las contraseñas no coinciden';
        case 'minlength':
          return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'maxlength':
          return `El campo debe tener menos de ${errors['maxlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }
  public isValidField(myForm: FormGroup, field: string): boolean | null {
    return myForm.controls[field].errors && myForm.controls[field].touched;
  }

  public isFieldEqualTo(field1: string, field2: string): ValidationErrors | null {
    return (formGroup: AbstractControl) => {
      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;
      if (pass1 === pass2) {
        formGroup.get(field2)?.setErrors(null);
        return null;
      }
      formGroup.get(field2)?.setErrors({ notEqual: true });
      return { notEqual: true };
    }
  }

}
