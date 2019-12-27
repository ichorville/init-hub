import { Component, OnInit, Input } from '@angular/core';
import { 
  TextInputBox, 
  TextArea, 
  NumberInputBox, 
  FormDropDown, 
  FormRadioButton, 
  FormCheckBox, 
  FormDatePicker, 
  FormTImePicker, 
  CustomText, 
  TextPassword, 
  TextColor, 
  TextEmail, 
  TextUrl, 
  TextEditor, 
  TextRangeBox, 
  Image, 
  ImageUpload, 
  ImageAnnotator, 
  FormLogo, 
  TabularEntry 
} from 'src/app/shared/models';
import { FormGeneratorService } from '../form-generator.service';
import { CsiToastsService } from '@csi/csi-toastr';
import { LogUserService } from '@csi/csi-services-gateway';
import { FieldGeneratorService } from '../../field-generator/field-generator.service';

@Component({
  selector: 'app-field-properties',
  templateUrl: './field-properties.component.html',
  styleUrls: ['./field-properties.component.scss']
})
export class FieldPropertiesComponent implements OnInit {

  @Input() widgetIndex:number;
  @Input() fieldType:string;

  public currentWidget:any;

  public generateFieldAttribute:any;

  constructor(private _formgs:FormGeneratorService,
    private toastr:CsiToastsService,
    private logUserService:LogUserService,
    private _fgs: FieldGeneratorService) { }

  ngOnInit() {
    this._formgs.loadFieldAttributes.subscribe(res=>{
      this.currentWidget = this._formgs.widgets[res.index];
    });

    this._formgs.onFieldRemoved.subscribe(res=>{
      this.reset();
    })

    this._formgs.onGridReset.subscribe(res=>{
      this.reset();
    })
  }

  reset(){
    this.currentWidget = undefined;
  }
  
  /**
   * Return object type of selected field control type
   * @param type
   */
  returnFieldProperties(type) {

    switch (type) {
      case 'textBox': {
        return new TextInputBox();
      }
      case 'textArea': {
        return new TextArea();
      }
      case 'number': {
        return new NumberInputBox();
      }
      case 'dropdown': {
        return new FormDropDown();
      }
      case 'radio': {
        return new FormRadioButton();
      }
      case 'checkbox': {
        return new FormCheckBox();
      }
      case 'date': {
        return new FormDatePicker();
      }
      case 'time': {
        return new FormTImePicker();
      }
      case 'customText': {
        return new CustomText();
      }
      case 'password': {
        return new TextPassword();
      }
      case 'color': {
        return new TextColor();
      }
      case 'email': {
        return new TextEmail();
      }
      case 'url': {
        return new TextUrl();
      }
      case 'textEditor': {
        return new TextEditor();
      }
      case 'range': {
        return new TextRangeBox();
      }
      case 'image': {
        return new Image();
      }
      case 'imageUpload': {
        return new ImageUpload();
      }
      case 'imageAnnotator': {
        return new ImageAnnotator();
      }
      case 'formLogo': {
        return new FormLogo();
      };
      case 'tabularEntry': {
        return new TabularEntry();
      }
    }
  }

  save(){
    const fieldItem = this.currentWidget.controlContent;
    const isUpdateStatus = !fieldItem.isNewField?true:false;

    if (fieldItem == undefined) {
      return this.displayToast('Control Type Empty', 'Warning')
    }
    // only allow items of specific types
    if (fieldItem.label != undefined) {
      // if label name is empty
      if (fieldItem.label.trim() === '') {
        return this.displayToast('Label Name Empty', 'Warning')
      }
      // if lable name is available
      // if (this.isUpdateStatus == false && this.fieldList.filter(element => element.label === fieldItem.label).length > 0) {
      //   return this.displayToast('Duplicate Field Name Available', 'Warning');
      // }

      if(!this._formgs.formCategory || this._formgs.formModules.length === 0){
        return this.displayToast('Form settings not properly set','Warning');
      }

      if ((this.currentWidget.content == 'nummber' || this.currentWidget.content == 'range') && ((fieldItem.minValue != 0 && fieldItem.maxValue != 0) && fieldItem.minValue > fieldItem.maxValue)) {
        return this.displayToast('Max Value Should Be Breater', 'Warning');
      }
      let formObject = {
        "hospitalGroupId": Number(this.logUserService.getUserHospitalGroupId()),
        "hospitalId": this.logUserService.getUserHospitalId() + '',
        "createdBy": this.logUserService.getLogUserId() + '',
        "category": this._formgs.formCategory,
        "fieldName": fieldItem.label,
        "definition": encodeURI(JSON.stringify(fieldItem)),
        "applicableApplications": this._formgs.formModules
      };
      if (isUpdateStatus == true) {
        formObject['id'] = fieldItem.currentId;
      }

      this._fgs.postField(formObject).subscribe(res => {
        this.toastr.success("Field Saved Successfully!", "Success");
        this._fgs.addNotifySetter(true);
      }, err => {
        this.toastr.error("Error During Operation", "Failed");
      });
    } else {
      return this.displayToast('Label Name Empty', 'Warning');
    }
  }

  /**
   * Display toaster message
   * @param message
   * @param type
   */
  displayToast(message, type) {
    this.toastr.warning(message, type, {
      timeOut: 3000,
      progressBar: true,
      closeButton: true
    });
  }
}
