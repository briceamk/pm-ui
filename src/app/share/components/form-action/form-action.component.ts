import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'pm-form-action',
  templateUrl: './form-action.component.html',
  styleUrls: ['./form-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormActionComponent implements OnInit {

  @Input() title: string;
  @Input() data: object;
  @Input() disable: boolean;
  @Input() hideAdd: boolean;
  @Input() dataEntities: {[id: string]: object};
  @Input() form: FormGroup;
  @Input() isValidForm: boolean;
  @Input() listViewLink: string;
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() removes: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() first: EventEmitter<any> = new EventEmitter<any>();
  @Output() previous: EventEmitter<any> = new EventEmitter<any>();
  @Output() next: EventEmitter<any> = new EventEmitter<any>();
  @Output() last: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSave() {
    this.save.emit(this.form);
  }

  onAdd() {
    this.add.emit();
  }

  onEdit() {
    this.edit.emit();
  }

  onRemoves() {
    this.removes.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  onFirst() {
    if(!this.isFirst(this.data, this.dataEntities)) {
      let firstId = Object.keys(this.dataEntities)[0]
      let firstData = this.dataEntities[firstId];
      this.first.emit(firstData);
    }
  }

  onPrevious() {
    if(this.hasPrevious(this.data, this.dataEntities)) {
      let currentIndex = Object.keys(this.dataEntities).indexOf(this.data['id']);
      let previousId = Object.keys(this.dataEntities)[currentIndex-1]
      let previousData = this.dataEntities[previousId];
      this.previous.emit(previousData);
    }
  }

  onNext() {
    if(this.hasNext(this.data, this.dataEntities)) {
      let currentIndex = Object.keys(this.dataEntities).indexOf(this.data['id']);
      let nextId = Object.keys(this.dataEntities)[currentIndex+1]
      let nextData = this.dataEntities[nextId];
      this.previous.emit(nextData);
    }

  }

  onLast() {
    if(!this.isLast(this.data, this.dataEntities)) {
      let lastIndex = Object.keys(this.dataEntities).length-1;
      let lastId = Object.keys(this.dataEntities)[lastIndex]
      let lastData = this.dataEntities[lastId];
      this.last.emit(lastData);
    }
  }

  hasPrevious(data: object, dataEntities: {[id: string]: object}): boolean {
    return 'id' in this.data? (Object.keys(this.dataEntities).indexOf(this.data['id'])) > 0: false;
   }

  hasNext(data: object, dataEntities: {[id: string]: object}): boolean {
    return 'id' in this.data? Object.keys(this.dataEntities).indexOf(this.data['id']) < (Object.keys(this.dataEntities).length-1): false;
  }

  isFirst(data: object, dataEntities: {[id: string]: object}): boolean {
    return 'id' in this.data? Object.keys(this.dataEntities).indexOf(this.data['id']) === 0: false;
  }

  isLast(data: object, dataEntities: {[id: string]: object}): boolean {
    return 'id' in this.data? Object.keys(this.dataEntities).indexOf(this.data['id']) === (Object.keys(this.dataEntities).length-1): false;
  }

}
