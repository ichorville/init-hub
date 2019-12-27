import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGeneratorService } from '../form-generator.service';

@Component({
  selector: 'app-form-meta-data',
  templateUrl: './form-meta-data.component.html',
  styleUrls: ['./form-meta-data.component.css']
})
export class FormMetaDataComponent implements OnInit {
  options = {
    displayFieldMetaData: false,
    displayChildFormMetaData: false,
    displayGridMetaData: false,
    displayWidgetMetaData: false,
    displayTabMetaData: false
  }
  currentIndex: number = 0;
  @Output() closeRightNav = new EventEmitter<any>();

  constructor(
    public _fgs: FormGeneratorService
  ) { 

    this._fgs.fieldMetaDataUpdateGetter().subscribe(res => {
      this.currentIndex = res.key;
      if (res.value.masterType === 'field') {
        this.options.displayFieldMetaData = true;
        Object.getOwnPropertyNames(this.options).forEach(element => element != 'displayFieldMetaData' ? this.options[element] = false : '');
      } else if (res.value.masterType === 'grid') {
        this.options.displayGridMetaData = true;
        Object.getOwnPropertyNames(this.options).forEach(element => element != 'displayGridMetaData' ? this.options[element] = false : '');
      } else if (res.value.masterType === 'tab') {
        this.options.displayTabMetaData = true;
        Object.getOwnPropertyNames(this.options).forEach(element => element != 'displayTabMetaData' ? this.options[element] = false : '');
      } else {
        this.respawnFormMetaData();
      }
    });

    this._fgs.resetMetaDataUpdateGetter().subscribe(() => this.respawnFormMetaData());
    this._fgs.refreshMetaDataUpdateGetter().subscribe(() => this.respawnFormMetaData());
  }

  ngOnInit() {
    
  }

  respawnFormMetaData() {
    Object.getOwnPropertyNames(this.options).forEach(element => this.options[element] = false);
    this.closeRightNav.emit(true);
  }
}
