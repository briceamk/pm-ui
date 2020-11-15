import {Identifiable} from '@share/models';
import {AbstractControl, ValidationErrors} from '@angular/forms';

/**
 * Validates if the value passed has a code in order to be declared as an
 * object provided by material autocomplete options
 */
export function isAutocompleteOption(value): boolean {
  if(!value) return true;
  if (typeof value === "string") return false
  //check if id is number greater than 0 or a string with length greater than 0
  return typeof value.id === 'number' && value.id > 0 || typeof value.id === 'string' && value.id.length > 0;
}

/**
 * Validates the control value to have an `id` attribute. It is expected
 * control value to be an object.
 */
export function containsIdValidation(control: AbstractControl): ValidationErrors {
  return isAutocompleteOption(control.value) ? null : { idNotFound: true }
}

export function containsRequiredValidation(control: AbstractControl): ValidationErrors {
  return control.errors && 'required' in control.errors ? { required: true }: null;
}


