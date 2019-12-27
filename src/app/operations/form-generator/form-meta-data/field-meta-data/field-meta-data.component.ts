import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGeneratorService } from '../../form-generator.service';

@Component({
  selector: 'app-field-meta-data',
  templateUrl: './field-meta-data.component.html',
  styleUrls: ['./field-meta-data.component.css']
})
export class FieldMetaDataComponent implements OnInit {
  
  public reset:boolean = false;
  public fieldType:string;

  @Input() currentIndex:number;

  fontSizes: any[] = [
    { key: '10px', value: '10px' },
    { key: '12px', value: '12px' },
    { key: '14px', value: '14px' },
    { key: '16px', value: '16px' },
    { key: '18px', value: '18px' },
    { key: '20px', value: '20px' }
  ];

  allignments: any[] = [
    { key: 'left', value: 'Left' },
    { key: 'center', value: 'Center' },
    { key: 'end', value: 'Right' }
  ];

  constructor(
    public _fgs: FormGeneratorService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.fieldType = this._fgs.widgets[this.currentIndex].content;
  }

  ngOnInit() {
    console.log('ddd');
  }

  onLabelChange(string) {
    // update meta-data on rule JSON
    this._fgs.ruleComponents[this.currentIndex].componentKey = string;
    this._fgs.ruleComponents[this.currentIndex].componentName = string;
  }

  onLabelAllignmentChange(event) {
    this._fgs.widgets[this.currentIndex].controlContent.labelAllignment = event.key;
  }

  onTextAllignmentChange(event) {
    this._fgs.widgets[this.currentIndex].controlContent.textAllignment = event.key;
  }

  onFontSizeChange(event) {
    this._fgs.widgets[this.currentIndex].controlContent.fontSize = event.key;
  }

  respawnFormMetaData() {
    this._fgs.refreshMetaDataUpdateSetter(true);
  }

  resetProps(){
    this.reset = true;
  }

  expression(){
    console.log(this._fgs.widgets);
  }
}
