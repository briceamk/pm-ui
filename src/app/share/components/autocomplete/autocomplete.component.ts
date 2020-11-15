import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Self,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Identifiable} from '@share/models';
import {containsIdValidation} from '@share/utils';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'pm-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() options: Identifiable[];
  @Input() requiredMessage: string;

  // by default autocomplete is required and if there somme value, object must contains `id` key
  // when defining field in parent component, if it's not required, we will remove required validator in ngOnchange
  inputControl = new FormControl("", [Validators.required, containsIdValidation]);
  searchResults: Observable<any>;
  noResults = false;
  isSearching = false;

  private _lengthToTriggerSearch = 1;

  @Input()
  set lengthToTriggerSearch(value: number) {
    this._lengthToTriggerSearch = coerceNumberProperty(value, 0);
  }

  constructor(
    @Optional() @Self() private controlDir: NgControl,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options) {
      if (this.isSearching) {
        this.isSearching = false;
        if (
          !changes.options.firstChange &&
          !changes.options.currentValue.length
        ) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
      }
    }
    if(!this.required) {
      this.inputControl.clearValidators();
      this.inputControl.setValidators([containsIdValidation]);
      this.inputControl.updateValueAndValidity();
    }
  }

  /**
   * Allows Angular to update the inputControl.
   * Update the model and changes needed for the view here.
   */
  writeValue(obj: any): void {
    obj? this.inputControl.setValue(obj): this.inputControl.setValue(null);
  }

  /**
   * Allows Angular to register a function to call when the inputControl changes.
   */
  registerOnChange(fn: any): void {
    // Pass the value to the outer ngControl if it has an id otherwise pass null
    this.inputControl.valueChanges.pipe(debounceTime(300)).subscribe({
      next: (value) => {
        if (typeof value === "string") {
          if (this.isMinLength(value)) {
            this.isSearching = true;
            /**
             * Fire change detection to display the searching status option
             */
            this.changeDetectorRef.detectChanges();
            fn(value.toLowerCase());
          } else {
            this.isSearching = false;
            this.noResults = false;
            fn(null)
          }
        } else {
          fn(value)
        }
      },
    })
  }

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  /**
   * Allows Angular to disable the input.
   */
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable()
  }

  /**
   * Function to call when the input is touched.
   */
  onTouched() {}

  /**
   * Method linked to the mat-autocomplete `[displayWith]` input.
   * This is how result name is printed in the input box.
   */
  displayFn(result: Identifiable): string | undefined {
    return result ? result.label || result.name : undefined
  }

  isMinLength(value: string) {
    return value.length >= this._lengthToTriggerSearch
  }

}
