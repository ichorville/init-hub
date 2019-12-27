import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FIELDS } from 'src/app/shared/constants/fields';
import { TextInputBox, TextArea, NumberInputBox, FormDropDown, FormRadioButton, FormCheckBox, FormDatePicker, FormTImePicker, CustomText, TextPassword, TextColor, TextEmail, TextUrl, TextEditor, TextRangeBox, Image, ImageUpload, ImageAnnotator, FormLogo, TabularEntry } from 'src/app/shared/models';
import { Validators } from '@angular/forms';
import { FieldGeneratorService } from '../../field-generator/field-generator.service';
import * as uuid from 'uuid';
import { FormGeneratorService } from '../form-generator.service';

@Component({
  selector: 'app-form-add-field',
  templateUrl: './form-add-field.component.html',
  styleUrls: ['./form-add-field.component.css']
})
export class FormAddFieldComponent implements OnInit {

  public fields:any[] = FIELDS;
  public fieldGroups:any[] = [];
  public fieldByGroups:any[] = [];

  private labelName = "New ";

  @Output() onClicked:EventEmitter<any> = new EventEmitter();

  constructor(private _fgs:FieldGeneratorService, private _formgs:FormGeneratorService) {
    // Get all groups of fields
    this.fields.forEach(field=>{
      if(this.fieldGroups.findIndex((group)=>{
        return group === field.type;
      })===-1) this.fieldGroups.push(field.type);
    })

    // Generate array for field with groups
    this.fieldGroups.forEach((group,key)=>{
      this.fieldByGroups.push({
        name:group,
        fields:[]
      });
      this.fields.forEach(field=>{
        if(field.type === group) this.fieldByGroups[key].fields.push(field);
      })
    })
  }

  ngOnInit() {
  }

  fieldOnClick(field){
    // Getting the field object for specific field
    const fieldProperty = this.returnFieldProperty(field);

    // Set unique id for identify the field
    fieldProperty['fieldDesignId'] = uuid.v4();

    // Set this to verify new or existing field
    fieldProperty['isNewField'] = true;

    this._fgs.editSetter(fieldProperty);
    this.onClicked.emit(fieldProperty);
    this._formgs.hideFieldMetaData.emit(false);
    this._formgs.onDropdownResourceSelected.emit(false);
  }

  // This method return the field object by control type
  returnFieldProperty(field) {
    let type =field.value;
    switch (type) {
      case 'textBox': {
        let fieldItem: TextInputBox = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          placeholder: "",
          characterLength: 25,
          type: 'text',
          theme: 'bootstrap',
          apiBinding: "",
        };
        return fieldItem;
      }
      case 'textArea': {
        let fieldItem: TextArea = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          placeholder: "",
          characterLength: 25,
          theme: 'bootstrap',
          apiBinding: ""
        };
        return fieldItem;
      }
      case 'number': {
        let fieldItem: NumberInputBox = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          placeholder: "",
          type: 'number',
          minValue: 0,
          maxValue: 255,
          theme: 'bootstrap',
          apiBinding: ""
        };
        return fieldItem;
      }
      case 'dropdown': {
        let fieldItem: FormDropDown = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          placeholder: "",
          theme: 'bootstrap',
          allowMultiSelect: false,
          options: [],
          urlEndpoint: false,
          apiSource: "",
          apiEndpoint: "",
          displayProperty: "",
          valueProperty: ""
        };
        return fieldItem;
      }
      case 'radio': {
        let fieldItem: FormRadioButton = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          inlineField: false,
          options: [],
          urlEndpoint: false,
          apiEndpoint: "",
          displayProperty: "",
          valueProperty: ""
        };
        return fieldItem;
      }
      case 'checkbox': {
        let fieldItem: FormCheckBox = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          options: [],
          urlEndpoint: false,
          apiEndpoint: '',
          displayProperty: '',
          valueProperty: ''
        };
        return fieldItem;
      }
      case 'date': {
        let fieldItem: FormDatePicker = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          currentDate:false,
          theme: 'bootstrap',
          placeholder: "",
          includeTime: false,
          isDateRange: false
        };
        return fieldItem;
      }
      case 'time': {
        let fieldItem: FormTImePicker = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          currentTime:false,
          validators: [],
          errors: [],
          theme: 'bootstrap'
        };
        return fieldItem;
      }
      case 'customText': {
        let fieldItem: CustomText = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          customTextBody: ""
        };
        return fieldItem;
      }
      case 'password': {
        let fieldItem: TextPassword = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          placeholder: "",
          characterLength: 8
        };
        return fieldItem;
      }
      case 'color': {
        let fieldItem: TextColor = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          placeholder: "",
        };
        return fieldItem;
      }
      case 'email': {
        let fieldItem: TextEmail = {
          value: undefined,
          key: this.labelName + type,
          label: this.labelName + type,
          required: false,
          disabled: false,
          controlType: type,
          validators: [Validators.email],
          errors: [],
          errorMessage:'',
          theme: 'bootstrap',
          placeholder: "",
        };
        return fieldItem;
      }
      case 'url': {
        let fieldItem: TextUrl = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
          errors: [],
          errorMessage:'',
          theme: 'bootstrap',
          placeholder: "",
        };
        return fieldItem;
      }
      case 'textEditor': {
        let fieldItem: TextEditor = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          placeholder: "",
        };
        return fieldItem;
      }
      case 'range': {
        let fieldItem: TextRangeBox = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          placeholder: "",
          type: 'number',
          minValue: 0,
          maxValue: 25,
          theme: 'bootstrap',
          apiBinding: ""
        };
        return fieldItem;
      }
      case 'image': {
        let fieldItem: Image = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          imageUrl:"",
          image:"",
          imageWidth: 100,
          imageHeight: 100,
          validators: [],
          errors: [],
          placeholder: "",
          theme: 'bootstrap'
        };
        return fieldItem;
      }
      case 'imageUpload': {
        let fieldItem: ImageUpload = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          placeholder: "",
          imageWidth: 100,
          imageHeight: 100,
          theme: 'bootstrap'
        };
        return fieldItem;
      }
      case 'imageAnnotator': {
        let fieldItem: ImageAnnotator = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          image: "",
          controlType: type,
          validators: [],
          errors: [],
          placeholder: "",
          imageWidth: 100,
          imageHeight: 100,
          theme: 'bootstrap'
        };
        return fieldItem;
      }
      case 'formLogo': {
        let fieldItem: FormLogo = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          formLogoUrl:"",
          imageWidth: 100,
          imageHeight: 100,
          image: "",
          required: false,
          disabled: false,
          controlType: type,
          validators: [],
          errors: [],
          theme: 'bootstrap'
        };
        return fieldItem;
      };
      case 'tabularEntry': {
        let fieldItem: TabularEntry = {
          value: undefined,
          key: this.labelName + field.viewValue,
          label: this.labelName + field.viewValue,
          required: false,
          disabled: false,
          headerDefinitions: [],
          controlType: type,
          validators: [],
          errors: [],
          theme: 'bootstrap'
        };
        return fieldItem;
      }
    }
  }

}
