import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges, ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Identifiable} from '@share/models';
import {containsIdValidation} from '@share/utils';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import {debounceTime} from 'rxjs/operators';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';

@Component({
  selector: 'pm-chip-autocomplete',
  templateUrl: './chip-autocomplete.component.html',
  styleUrls: ['./chip-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipAutocompleteComponent implements OnInit, ControlValueAccessor, OnChanges {

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoCompleteInput') autoCompleteInput: MatAutocomplete;

  @Input() placeholder: string
  @Input() options: Identifiable[]
  @Input() visible: boolean;
  @Input() selectable: boolean;
  @Input() removable: boolean;

  chips: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  // Inner form control to link input text changes to mat autocomplete
  inputControl = new FormControl("", [ containsIdValidation])
  searchResults: Observable<any>
  noResults = false
  isSearching = false
  disable: boolean;

  private _lengthToTriggerSearch = 1

  @Input()
  set lengthToTriggerSearch(value: number) {
    this._lengthToTriggerSearch = coerceNumberProperty(value, 0)
  }

  constructor(
    @Optional() @Self() private controlDir: NgControl,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this
    }
  }

  ngOnInit() {
    if (this.controlDir) {
      // Set validators for the outer ngControl equals to the inner
      const control = this.controlDir.control
      const validators = control.validator
        ? [control.validator, this.inputControl.validator]
        : this.inputControl.validator
      control.setValidators(validators)
      // Update outer ngControl status
      control.updateValueAndValidity({ emitEvent: false })
    }
    if(this.inputControl && this.inputControl.value && this.inputControl.value.legth !== 0) {
      this.inputControl.value.forEach(value => this.chips.push(value));
      console.log(this.chips);
      console.log(this.options);
      this.chips.forEach(value => {
        if(!this.options.includes(value)) {
          this.options.push(value);
        }
      });
      console.log(this.chips);
      console.log(this.options);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options) {
      if (this.isSearching) {
        this.isSearching = false
        if (
          !changes.options.firstChange &&
          !changes.options.currentValue.length
        ) {
          this.noResults = true
        } else {
          this.noResults = false
        }
      }
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.chips.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(data: any): void {
    const index = this.chips.indexOf(data);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chips.push(event.option.value);
    this.chipInput.nativeElement.value = '';
  }

  /**
   * Allows Angular to update the inputControl.
   * Update the model and changes needed for the view here.
   */
  writeValue(obj: any): void {
    obj && this.inputControl.setValue(obj);
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
            this.isSearching = true
            /**
             * Fire change detection to display the searching status option
             */
            this.changeDetectorRef.detectChanges()
            fn(value.toLowerCase())
          } else {
            this.isSearching = false
            this.noResults = false
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
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }

  /**
   * Function to call when the input is touched.
   */
  onTouched() {}


  isMinLength(value: string) {
    return value.length >= this._lengthToTriggerSearch
  }

}
