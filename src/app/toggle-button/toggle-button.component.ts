import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormioEvent } from '@formio/angular';
import _ from 'lodash';

@Component({
  selector: 'toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {

  private _value: any = {};
  @Input()
  public set value(val: any) {
    if (!val) {
      return;
    }
    this._value = val;
  }
  public get value() {
    return this._value;
  }

  @Output()
  valueChange = new EventEmitter<any>();

  @Input()
  disabled: boolean;

  private _options: any;
  @Input()
  public set options(opts: any) {
    this._options = opts;
    // if (opts && opts.length > 0) {
    //   opts.forEach((option: any) => {
    //     this.value[option.value] = false;
    //   });
    // }
  }
  public get options(): any {
    return this._options;
  }

  @Input()
  required: boolean;

  @Input()
  multipleValues: boolean;

  public onClick(val: any) {
    this.value = _.clone(this.value);

    if (!this.multipleValues) {
      this.value = {};
    }

    this.value[val] = !this.value[val];

    if (this.required && !Object.values(this.value).includes(true)) {
      // If the value is 'required' and after selecting (or deselecting) an option there are no 'true' values
      // the default value is restored
      this.value = {};
    }

    this.valueChange.emit(this.value);
  }

}
