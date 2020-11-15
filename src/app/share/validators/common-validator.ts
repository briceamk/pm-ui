import { FormGroup } from '@angular/forms';

// Validators
export const required = (form: FormGroup, name: string) => {
  return (
    form.get(`${name}`).hasError('required') && form.get(`${name}`).touched
  );
};
export const maximum = (form: FormGroup, name: string) => {
  return (
    form.get(`${name}`).hasError('maxlength') && form.get(`${name}`).touched
  );
};

export const minimum = (form: FormGroup, name: string) => {
  return (
    form.get(`${name}`).hasError('minlength') && form.get(`${name}`).touched
  );
};

export const email = (form: FormGroup, name: string) => {
  return form.get(`${name}`).hasError('email') && form.get(`${name}`).touched;
};
