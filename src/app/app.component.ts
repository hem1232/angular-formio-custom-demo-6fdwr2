import { Component, ElementRef, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('jsonDesign') jsonDesign?: ElementRef;
  @ViewChild('jsonPreview') jsonPreview?: ElementRef;

  builder = true;
  form: any = {};
  private _form: any = {};

  public options = {
    builder: {
      custom: {
        weight: -10,
        title: 'Custom',
        default: true
      },
      basic: {
        default: false
      }
    }
  };

  onChangeDesign(event: any) {
    console.log(event);
    if (['addComponent', 'saveComponent', 'deleteComponent'].indexOf(event.type) > -1) {
      this._form = cloneDeep(event.form);
    }

    if (event.form) {
      this.jsonDesign.nativeElement.innerHTML = '';
      this.jsonDesign.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
    }
  }

  onChangePreview(event: any) {
    console.log(event);

    if (event.data) {
      this.jsonPreview.nativeElement.innerHTML = '';
      this.jsonPreview.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.data, null, 4)));
    }
  }

  toggleBuilder() {
    this.builder = !this.builder;
    this.form = cloneDeep(this._form);
  }
}
