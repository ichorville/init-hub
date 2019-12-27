import {Component, OnInit, Input, OnChanges, ElementRef, ViewChild} from '@angular/core';
import {CsiToastsService} from '@csi/csi-toastr';
import { LogUserService } from '@csi/csi-services-gateway';

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
  TextColor,
  TextPassword,
  TextEmail,
  TextRangeBox,
  Image,
  ImageUpload,
  TextUrl,
  TextEditor,
  FormLogo,
  TabularEntry,
  ImageAnnotator
} from '../../../shared/models/index';
import { FieldGeneratorService } from '../field-generator.service';
import { TreeviewItem } from "ngx-treeview";
import { UICategory } from "../../../rule-engine/expression-builder/setup-module/services/CategoryService";
import { UICategoryValue } from "../../../rule-engine/expression-builder/setup-module/services/CategoryValuesService";
import { CsiAgGridOptions } from "@csi/csi-ag-grid";
import * as RESOURCE from '../../../shared/constants/resources';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Validators } from '@angular/forms';
import { mergeMap } from "rxjs/operators/mergeMap";

import { Observable, of } from 'rxjs';
import { FormGeneratorService } from "../../form-generator/form-generator.service";
import { API_BINDINGS } from "../../../shared/constants/resources";
import { FIELDS } from 'src/app/shared/constants/fields';

@Component({
  selector: 'app-field-add',
  templateUrl: './field-add.component.html',
  styleUrls: ['./field-add.component.scss']
})
export class FieldAddComponent implements OnInit, OnChanges {
  @Input() fieldList: any;
  // default field attr
  currentId: any;
  public editorData: string;
  public asyncSelected: string;
  public selectedBinding: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;
  apiBindingSource: any[];

  // for radio button extra config
  enableOptionTextbox: boolean;
  optionTextboxLabel: string;
  enableInlineField: boolean;

  selectedControl: any;
  labelName: any;
  placeHolder: any;
  selectedResourceType;

  // for image upload input
  imageHeight: number = 0;
  imageWidth: number = 0;

  // for formLogo
  formLogoUrl: string;

  characterLength: any;
  // for number field
  minValue: number = 0;
  maxValue: number = 0;
  // for multi-select
  isEdit: boolean = false;
  tryManualOptions: boolean = false;
  optionList: Array<any> = [];
  optionLabel: any;
  optionValue: any;
  allowMultiSelect: any;

  // for muti-select manual option validations
  previousLabel: string;
  previousValue: string;

  // for date picker
  isTimeWithDate: boolean = false;
  isDateRange: boolean = false;

  // for custom-text
  public customTextBody: string = ''
  public EDITOR = ClassicEditor;
  public editorConfig: any;

  controlSelected: boolean = false;
  isUpdateStatus: boolean = false;
  items: TreeviewItem[] = [];

  // grid variables
  public registerdEndpointsList: any = [];
  public setupTreeStructures;

  selectedCategory: UICategory;
  categoryValues: any;
  selectedCategoryValue: UICategoryValue;
  rowSelected = false;
  servicesList: any = [];
  selectedService: any;
  selectedEndpointName: any;
  selectedEndpoint: any;
  selectedKey: any;
  selectedKeys: any = [];
  selectedDescription: any;
  endpointsList = [];
  selectValue: any;
  selectedLang: string = 'ar';

  dataSet: any = [];
  colDefs: any;
  params: any;
  public gridOptions: CsiAgGridOptions;
  private gridApi;
  private gridColumnApi;

  private selectedApi: string;
  private displayProperty: string;
  private valueProperty: string;

  public selectedDisplayProperty: string;
  public selectedValueProperty: string;
  public selectedResource: any;

  public resourcesGridOptions: any;
  public resourcesColDefs: any;
  public resourcesDisplayedColumns: any;
  public resourceData: any;
  public resourcesGridApi: any;
  public resourcesGridColumnApi: any;
  public resourceApiEndpoint: string;
  private selectedApiBinding: any;

  // For Tabular Entry
  public tabularHeaderName: string;
  public tabularFieldName: string;
  public tabularFieldType: any;
  public tabularHeaderDefinitions = [];

  // For image annotator and form logo
  public selectedImage: string;
  @ViewChild("imageFileInput") imageFileInput: ElementRef;
  public imageUploadType: string = "UPLOAD";

  Fields: any[] = FIELDS;

  resourceTypes: any[] = [
    { value: 'clinics', viewValue: 'Clinics' },
    { value: 'procedures', viewValue: 'Procedures' },
    { value: 'agegroups', viewValue: 'AgeGroups' },
    { value: 'resources', viewValue: 'Resources' },
    { value: 'diagnosis', viewValue: 'Diagnosis' },
  ];

  defaultObjectProperties: any[] = [
    { value: 'code', viewValue: 'code' },
    { value: 'codeAlias', viewValue: 'codeAlias' },
    { value: 'description', viewValue: 'description' },
    { value: 'descriptionAlias', viewValue: 'descriptionAlias' },
    { value: 'name', viewValue: 'name' },
    { value: 'nameAlias', viewValue: 'nameAlias' }
  ];

  referanceTypes: any[] = [
    { value: 'formField', viewValue: 'Existing Form Field' },
    { value: 'apiBinding', viewValue: 'Existing Api' },
  ];

  tabularFieldTypes: any[] = [
    { value: 'textBox', name: 'TextBox' },
    { value: 'number', name: 'Number' },
    { value: 'date', name: 'Date' },
    { value: 'dateTime', name: 'Date And Time' },
    { value: 'time', name: 'Time' }
  ]

  objectProperties = this.defaultObjectProperties;
  showApiDropdown = true;

  constructor(private toastr: CsiToastsService,
              private _fgs: FieldGeneratorService,
              private _formgs: FormGeneratorService,
              private logUserService: LogUserService,
              private csiToast: CsiToastsService) {
    this._fgs.editGetter().subscribe(res => {
      this.tryManualOptions = false;
      this.isUpdateStatus = true;
      this.selectedControl = res.controlType;
      // default
      this.currentId = res.id;
      this.labelName = res.label;
      this.placeHolder = res.placeholder;
      this.characterLength = res.characterLength;
      // for number
      this.minValue = res.minValue;
      this.maxValue = res.maxValue;
      // for multi-select
      this.optionList = res.options;
      this.optionLabel = res.optionLabel;
      this.optionValue = res.optionValue;
      this.allowMultiSelect = res.allowMultiSelect;
      // if api source attatched
      this.selectedResource = res.apiSource;
      this.selectedDisplayProperty = res.displayProperty;
      this.selectedValueProperty = res.valueProperty;
      this.tryManualOptions = !res.urlEndpoint;
      // for date
      this.isTimeWithDate = res.isTimeWithDate;
      this.isDateRange = res.isDateRange;
      // for custom text
      this.customTextBody = res.customTextBody;
      this.controlSelected = true;
      // for field reference bindings
      this.selectedApiBinding = res.apiBinding;
      // for tabular entry
      this.tabularHeaderDefinitions = res.headerDefinitions;

      let bindings = res.apiBinding;
      if (bindings) {
        this.asyncSelected = "";
        this.selectedBinding = "";
        if (bindings.bindingType === "resourceBinding") {
          let bindedResource = res.apiBinding.fieldName;
          this.asyncSelected = bindedResource;
        } else if (bindings.bindingType === "fieldBinding") {
          let bindedResource = res.apiBinding.viewValue;
          this.selectedBinding = bindedResource;
        }
      }

      if (res.urlEndpoint == true) {
        this.onResourceSelected({ value: res.apiSource });
      }
    });
    this.gridOptions = {
      pagination: true,
      enableFilter: true,
      singleClickEdit: true,
      rowSelection: 'multiple'
    };
    this.resourcesGridOptions = {
      pagination: true,
      enableFilter: true,
    }
    this.editorConfig = {};

    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    })
      .pipe(
        mergeMap((token: string) => this.getStatesAsObservable(token))
      );

    this.apiBindingSource = RESOURCE.API_BINDINGS;
    this.selectedResourceType = 'formField';
  }

  getStatesAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'i');

    return this.getFormData(token);

  }

  getFormData(searchTerm): Observable<any> {
    let configuration = {
      'hospitalGroupId': Number(this.logUserService.getUserHospitalGroupId()),
      'hospitalId': this.logUserService.getUserHospitalId() + '',
      'category': 'GENERAL',
    };
    configuration['searchTerm'] = searchTerm;

    return new Observable(obs => {

      this._formgs.getFieldForms(configuration).subscribe(temObj => {

        obs.next(temObj);
        obs.complete();

      }, error => {
        obs.error(error);
        obs.complete();
      });
    });
  }

  typeaheadOnSelect(event,bindingType){
    event.item['bindingType'] = bindingType;
    this.selectedApiBinding=event.item;
  }

  ngOnInit() {
    this._fgs.getAll().subscribe(results => {
      this.setupTreeStructures = results;
      this.arrangeTree(this.setupTreeStructures);
    });
    this.colDefs = this.getColDefs();
  }

  ngOnChanges(event) {
    this.fieldList = event.fieldList.currentValue;
  }

  getColDefs() {
    return [
      {
        field: 'code',
        headerName: "Code",
        width: 100
      },
      {
        field: 'codeAlias',
        headerName: 'Code Alias',
        width: 100
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 140
      },
      {
        field: 'nameAlias',
        headerName: 'Name Alias',
        width: 140
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 140
      },
      {
        field: 'descriptionAlias',
        headerName: 'Description Alias',
        width: 140
      },
      {
        field: 'isActive',
        headerName: 'Is Active',
        cellRenderer: (params) => {
          const data = params.data;
          return data.isActive ? `<i class="fa fa-check"></i>` :
            `<span></span>`;
        },
        width: 90
      },
      {
        field: 'isBuiltin',
        headerName: 'isBullatin',
        cellRenderer: (params) => {
          const data = params.data;
          return data.isBuiltin ? `<i class="fa fa-check"></i>` :
            `<span></span>`;
        },
        width: 80
      }
    ]
  }

  setColumnDefRes(resources) {
    let colDefs = [];
    let displayedColumns = [];

    resources.forEach(resource => {
      colDefs.push({
        field: resource.value,
        headerName: resource.viewValue
      });
      displayedColumns.push(resource.value);
    });

    // return colDefs;
    this.resourcesDisplayedColumns = displayedColumns;
    this.resourcesColDefs = colDefs;
  }

  // on Select the Tree list
  onSelect(value) {
    this.selectedCategory = null;
    this.selectValue = value;
    if (this.selectValue) {
      for (let i = 0; i < this.setupTreeStructures.length; i++) {
        if (this.setupTreeStructures[i].categories) {
          let categories = this.setupTreeStructures[i].categories;
          for (let j = 0; j < categories.length; j++) {
            if (this.selectValue.value == categories[j].id && this.selectValue.text === categories[j].name) {
              this.selectedCategory = categories[j];
            }
          }
        }
      }
      if (this.selectedCategory) {
        this.onSelectCategory(this.selectedCategory);
      } else {
        this.resetGrid(null);
      }
    }
    else {
      this.resetGrid(null);
    }
  }

  onSelectCategory(value) {
    if (!value) {
      this.selectedCategory = null;
      return;
    }
    this.selectedCategory = value;
    this.selectedCategoryValue = null;
    this.onClear();
    this._fgs.getByCategory(value.id).subscribe(response => {
      // populate category dropdown
      this.categoryValues = response;
      this.resetGrid(this.categoryValues);
    }, null);
  }

  griReadyEvent(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.params = params.data;
  }

  resetGrid(values) {
    this.gridApi.setRowData(values);
  }

  // while clearing the form
  onClear() {
    this.selectedCategoryValue = null;
    this.gridApi.deselectAll();
  }

  // Tostr message for various categories
  showToastMessage(toastMessage: any, isSuccess: Boolean) {
    if (isSuccess) {
      this.toastr.success(toastMessage, "Category", {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
      });
    } else {
      this.toastr.error(toastMessage, "Category", {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
      });
    }
  }

  // Build a tree structure
  private arrangeTree(results) {
    for (let i = 0; i < results.length; i++) {
      let treeheader = ({
        value: results[i].id,
        text: results[i].name,
        children: [],
        checked: false,
        collapsed: true
      });
      if (results[i].categories) {
        let categories = results[i].categories;
        for (let j = 0; j < categories.length; j++) {
          treeheader.children.push(new TreeviewItem({
            value: categories[j].id,
            text: categories[j].name,
            checked: false
          }))
        }
      }
      this.items.push(new TreeviewItem(treeheader));
    }
  }

  onTypeChange(event) {
    this.selectedControl = event.value;
    this.controlSelected = true;
  }

  /**
   * Resources on change event to fetch data from respective APIs
   * @param event
   */
  onResourceSelected(event) {
    this.onReset(true);
    this.selectedResource = event.value;
    this.objectProperties = [];
    switch (this.selectedResource) {
      case 'agegroups':
        this.objectProperties = RESOURCE.AGE_GROUPS;
        this.setColumnDefRes(RESOURCE.AGE_GROUPS);
        this.setResourceRowData(this.selectedResource);
        this.resourceApiEndpoint = `csi-pms-rms-masterdata/amd-masterdata/getAll?type=AgeGroups&lang=en`;
        break;
      case 'clinics':
        this.objectProperties = RESOURCE.CLINIC;
        this.setColumnDefRes(RESOURCE.CLINIC);
        this.setResourceRowData(this.selectedResource);
        this.resourceApiEndpoint = `csi-pms-rms-masterdata/amd-masterdata/getAll?type=Clinic&lang=en`;
        break;
      case 'procedures':
        this.objectProperties = RESOURCE.PROCEDURES;
        this.setColumnDefRes(RESOURCE.PROCEDURES);
        this.setResourceRowData(this.selectedResource);
        this.resourceApiEndpoint = `csi-pms-rms-masterdata/amd-masterdata/procedures/`;
        break;
      case 'diagnosis':
        this.objectProperties = RESOURCE.DIAGNOSIS;
        this.setColumnDefRes(RESOURCE.DIAGNOSIS);
        this.setResourceRowData(this.selectedResource);
        break;
      default:
        this.objectProperties = RESOURCE.DEFAULT;
        break;
    }
  }

  onEndpointSelection(endpointPath) {
    this.selectedEndpoint = this.endpointsList.find(i => i.path === endpointPath);
    this.selectedKeys = this.selectedEndpoint.produces.ref;
  }

  /**
   * applicable to radio/ checkbox/ select fields where this functionality controls
   * the behaviour of manually added options of the particular item lisy
   */
  addMoreOptions() {
    if (this.optionLabel == undefined || this.optionValue == undefined ||
      this.optionLabel.trim() == '' || this.optionValue.trim() == '') {
      this.displayToast('Label & Value is Mandatory', 'warning');
    } else {
      if (this.isEdit == true) {
        // this is an edit scenario
        if (this.checkForDuplicates(this.optionLabel, this.optionValue, true) == true) {
          this.displayToast('Duplicate Option Pair Available', 'Warning');
        } else {
          this.optionList.forEach(element => {
            if (element['label'] == this.previousLabel) {
              element['label'] = this.optionLabel;
              element['value'] = this.optionValue;

              // Adding textbox with options feature currenty limited to radio button controls
              if (this.selectedControl === 'radio') {
                element['enableOptionTextbox'] = this.enableOptionTextbox;
                element['optionTextboxLabel'] = this.optionTextboxLabel
              }

            }
          });
          this.previousLabel = undefined;
          this.previousValue = undefined;
          this.optionLabel = undefined;
          this.optionValue = undefined;
          this.enableOptionTextbox = false;
          this.optionTextboxLabel = undefined;
          this.isEdit = false;
        }
      } else {
        // add scenario
        if (this.checkForDuplicates(this.optionLabel, this.optionValue) == true) {
          this.displayToast('Duplicate Option Pair Available', 'Warning');
        } else {

          // Adding textbox with options feature currenty limited to radio button controls
          if (this.selectedControl === 'radio') {
            this.optionList.push({
              label: this.optionLabel,
              value: this.optionValue,
              enableOptionTextbox: this.enableOptionTextbox,
              optionTextboxLabel: this.optionTextboxLabel
            });
          } else {
            this.optionList.push({
              label: this.optionLabel,
              value: this.optionValue
            });
          }

          this.optionLabel = undefined;
          this.optionValue = undefined;
          this.enableOptionTextbox = false;
          this.optionTextboxLabel = undefined;
        }
      }
    }
  }

  /**
   * Edit options of select/ radio/ checkbox options list
   * @param value
   */
  editOption(value) {
    this.optionList.forEach(element => {
      if (value.label == element['label']) {
        this.isEdit = true;
        this.previousLabel = value.label;
        this.previousValue = value.value;
        this.optionLabel = element['label'];
        this.optionValue = element['value'];

        // Adding textbox with options feature currenty limited to radio button controls
        if (this.selectedControl === 'radio') {
          this.enableOptionTextbox = element['enableOptionTextbox'];
          this.optionTextboxLabel = element['optionTextboxLabel'];
        }
      }
    });
  }

  /**
   * Removal of options from select/ radio/ checkbox option list
   * @param value
   */
  removeOption(value) {
    this.optionList.forEach((element, index) => {
      if (value.label == element['label']) {
        this.optionList.splice(index, 1);
      }
    });

    this.optionLabel = undefined;
    this.optionValue = undefined;
    this.enableOptionTextbox = false;
    this.optionTextboxLabel = undefined;
  }

  /**
   * For manually entered option values, to avoid frm adding furthermore
   * duplicate values to the option list
   * @param value1
   * @param value2
   * @param param
   */
  checkForDuplicates(value1, value2, param?) {
    if (param) {
      let result = false;
      if (value1 == this.previousLabel && value2 == this.previousValue) {
        result = false;
      } else {
        this.optionList.forEach(element => {
          if (element['label'] == value1 || element['value'] == value2) {
            result = true;
          }
        });
      }
      return result;
    } else {
      let result = false;
      this.optionList.forEach(element => {
        if (element['label'] == value1 || element['value'] == value2) {
          result = true;
        }
      });
      return result;
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

  /**
   * Save selected field and data to master-field-data collection
   */
  onSave() {
    let fieldItem = this.returnFieldProperties(this.selectedControl);

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
      if (this.isUpdateStatus == false && this.fieldList.filter(element => element.label === fieldItem.label).length > 0) {
        return this.displayToast('Duplicate Field Name Available', 'Warning');
      }
      if ((this.selectedControl == 'nummber' || this.selectedControl == 'range') && ((this.minValue != 0 && this.maxValue != 0) && this.minValue > this.maxValue)) {
        return this.displayToast('Max Value Should Be Breater', 'Warning');
      }
      let formObject = {
        'hospitalGroupId': this.logUserService.getUserHospitalGroupId(),
        'hospitalId': this.logUserService.getUserHospitalId() + '',
        "createdBy": this.logUserService.getLogUserId() + '',
        "category": "GENERAL",
        "fieldName": this.labelName,
        "definition": encodeURI(JSON.stringify(fieldItem)),
        "applicableApplications": ["ADMIN"]
      };
      if (this.isUpdateStatus == true) {
        formObject['id'] = this.currentId;
      }

      this._fgs.postField(formObject).subscribe(res => {
        this.csiToast.success("Field Saved Successfully!", "Success");
        this.onReset();
        this._fgs.addNotifySetter(true);
      }, err => {
        this.csiToast.error("Error During Operation", "Failed");
      });
    } else {
      return this.displayToast('Label Name Empty', 'Warning');
    }
  }

  onReset(resetOnlyFormFields: boolean = false) {
    if (!resetOnlyFormFields) {
      this.selectedControl = undefined;
      this.selectedResource = undefined;
      this.resourceApiEndpoint = undefined;
      this.isUpdateStatus = false;
      this.controlSelected = false;
    }
    resetOnlyFormFields == false ? this.labelName = undefined : ''
    this.placeHolder = undefined;
    this.minValue = undefined;
    this.maxValue = undefined;
    this.isTimeWithDate = undefined;
    this.isDateRange = undefined;
    this.optionList = [];
    this.optionLabel = undefined;
    this.optionValue = undefined;
    this.currentId = undefined;
    this.characterLength = undefined;
    resetOnlyFormFields == false ? this.allowMultiSelect = undefined : ''
    this.asyncSelected = "";
    this.selectedBinding = "";
    this.formLogoUrl = undefined;
    this.imageHeight = undefined;
    this.imageWidth = undefined;
    this.selectedImage = undefined;
  }

  updateField(element) {
    let updatedField = this.returnFieldProperties(this.selectedControl);
    element = updatedField;
  }

  /**
   * Return object type of selected field control type
   * @param type
   */
  returnFieldProperties(type) {

    const imageBase64Encode = btoa(this.selectedImage);

    switch (type) {
      case 'textBox': {
        let fieldItem: TextInputBox = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          placeholder: this.placeHolder,
          characterLength: this.characterLength,
          type: 'text',
          theme: 'bootstrap',
          apiBinding: this.selectedApiBinding,
        };
        return fieldItem;
      }
      case 'textArea': {
        let fieldItem: TextArea = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          placeholder: this.placeHolder,
          characterLength: this.characterLength,
          theme: 'bootstrap',
          apiBinding: this.selectedApiBinding
        };
        return fieldItem;
      }
      case 'number': {
        let fieldItem: NumberInputBox = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          placeholder: this.placeHolder,
          type: 'number',
          minValue: this.minValue,
          maxValue: this.maxValue,
          theme: 'bootstrap',
          apiBinding: this.selectedApiBinding
        };
        return fieldItem;
      }
      case 'dropdown': {
        let fieldItem: FormDropDown = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          placeholder: this.placeHolder,
          theme: 'bootstrap',
          allowMultiSelect: this.allowMultiSelect,
          options: this.optionList,
          urlEndpoint: !this.tryManualOptions,
          apiSource: this.selectedResource,
          apiEndpoint: !this.tryManualOptions == false ? ''
            : this.selectedResource === "resources" ? `csi-pms-rms-masterdata/amd-masterdata/common/categoryValue/getByCategory/${this.selectedCategory.id}`
              : this.selectedResource === "diagnosis" ? `csi-net-ehr-opd-master/api/ProblemMaster/ProblemMaster` : this.resourceApiEndpoint,
          displayProperty: this.selectedDisplayProperty,
          valueProperty: this.selectedValueProperty
        };
        return fieldItem;
      }
      case 'radio': {
        let fieldItem: FormRadioButton = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          inlineField: this.enableInlineField,
          options: this.optionList,
          urlEndpoint: !this.tryManualOptions,
          apiEndpoint: !this.tryManualOptions == false ? ''
            : this.selectedResource === "resources" ? `csi-pms-rms-masterdata/amd-masterdata/common/categoryValue/getByCategory/${this.selectedCategory.id}`
              : this.selectedResource === "diagnosis" ? `csi-net-ehr-opd-master/api/ProblemMaster/ProblemMaster` : this.resourceApiEndpoint,
          displayProperty: this.selectedDisplayProperty,
          valueProperty: this.selectedValueProperty
        };
        return fieldItem;
      }
      case 'checkbox': {
        let fieldItem: FormCheckBox = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          options: this.optionList,
          urlEndpoint: !this.tryManualOptions,
          apiEndpoint: !this.tryManualOptions == false ? ''
            : this.selectedResource === "resources" ? `csi-pms-rms-masterdata/amd-masterdata/common/categoryValue/getByCategory/${this.selectedCategory.id}`
              : this.selectedResource === "diagnosis" ? `csi-net-ehr-opd-master/api/ProblemMaster/ProblemMaster` : this.resourceApiEndpoint,
          displayProperty: this.selectedDisplayProperty,
          valueProperty: this.selectedValueProperty
        };
        return fieldItem;
      }
      case 'date': {
        let fieldItem: FormDatePicker = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          currentDate:false,
          theme: 'bootstrap',
          placeholder: this.placeHolder,
          includeTime: this.isTimeWithDate,
          isDateRange: this.isDateRange
        };
        return fieldItem;
      }
      case 'time': {
        let fieldItem: FormTImePicker = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          currentTime:false,
          theme: 'bootstrap'
        };
        return fieldItem;
      }
      case 'customText': {
        let fieldItem: CustomText = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          customTextBody: this.customTextBody
        };
        return fieldItem;
      }
      case 'password': {
        let fieldItem: TextPassword = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          placeholder: this.placeHolder,
          characterLength: this.characterLength
        };
        return fieldItem;
      }
      case 'color': {
        let fieldItem: TextColor = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          placeholder: this.placeHolder,
        };
        return fieldItem;
      }
      case 'email': {
        let fieldItem: TextEmail = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [Validators.email],
          errors: [],
          errorMessage: '',
          theme: 'bootstrap',
          placeholder: this.placeHolder,
        };
        return fieldItem;
      }
      case 'url': {
        let fieldItem: TextUrl = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
          errors: [],
          errorMessage: '',
          theme: 'bootstrap',
          placeholder: this.placeHolder,
        };
        return fieldItem;
      }
      case 'textEditor': {
        let fieldItem: TextEditor = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          theme: 'bootstrap',
          placeholder: this.placeHolder,
        };
        return fieldItem;
      }
      case 'range': {
        let fieldItem: TextRangeBox = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          placeholder: this.placeHolder,
          type: 'number',
          minValue: this.minValue,
          maxValue: this.maxValue,
          theme: 'bootstrap',
          apiBinding: this.selectedApiBinding
        };
        return fieldItem;
      }
      case 'image': {
        let fieldItem: Image = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          image:"",
          imageUrl:"",
          imageHeight:100,
          imageWidth:100,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          placeholder: this.placeHolder,
          theme: 'bootstrap'
        };
        return fieldItem;
      }
      case 'imageUpload': {
        let fieldItem: ImageUpload = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          placeholder: this.placeHolder,
          imageWidth: this.imageWidth,
          imageHeight: this.imageHeight,
          theme: 'bootstrap'
        };
        return fieldItem;
      }
      case 'imageAnnotator': {
        let fieldItem: ImageAnnotator = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          image: imageBase64Encode,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          placeholder: this.placeHolder,
          imageWidth: this.imageWidth,
          imageHeight: this.imageHeight,
          theme: 'bootstrap'
        };
        return fieldItem;
      }
      case 'formLogo': {
        let fieldItem: FormLogo = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          formLogoUrl: this.formLogoUrl,
          imageWidth: this.imageWidth,
          imageHeight: this.imageHeight,
          image: imageBase64Encode,
          required: false,
          disabled: false,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          theme: 'bootstrap'
        };
        return fieldItem;
      };
      case 'tabularEntry': {
        let fieldItem: TabularEntry = {
          value: undefined,
          key: this.labelName,
          label: this.labelName,
          required: false,
          disabled: false,
          headerDefinitions: this.tabularHeaderDefinitions,
          controlType: this.selectedControl,
          validators: [],
          errors: [],
          theme: 'bootstrap'
        };
        return fieldItem;
      }
    }
  }

  onDisplayPropertyChange(event) {
    this.selectedDisplayProperty = event.value;
    this.controlSelected = true;
  }

  onValuePropertyChange(event) {
    this.selectedValueProperty = event.value;
    this.controlSelected = true;
  }

  onManualToggleChanged(event) {
    this.tryManualOptions = event.checked;
  }

  resourcesGridReadyEvent(params) {
    this.resourcesGridApi = params.api;
    this.resourcesGridColumnApi = params.columnApi;

    let allColumnIds = [];
    this.resourcesGridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.resourcesGridColumnApi.autoSizeColumns(allColumnIds);
    this.resourcesGridApi.sizeColumnsToFit();
  }

  /**
   * Fetch data from respective APIs for different scenarios
   * @param resource
   */
  setResourceRowData(resource) {
    switch (resource) {
      case "agegroups":
        this._fgs.getResourceByType('AgeGroups').subscribe(res => {
          this.resourceData = res;
        })
        break;
      case "clinics":
        this._fgs.getResourceByType('Clinic').subscribe(res => {
          this.resourceData = res;
        })
        break;
      case "procedures":
        this._fgs.getResourceAllProcedures().subscribe(res => {
          this.resourceData = res;
        })
        break;
      case "diagnosis":
        this._fgs.getAllProblemList().subscribe(res => {
          this.resourceData = res;
        })
        break;
    }
  }

  needTextBox(event) {
    this.enableOptionTextbox = event.checked;
  }

  isInlineField(event) {
    this.enableInlineField = event.checked;
  }

  validateInput(event) {
    if (event.keyCode == 69 || event.keyCode == 189 || event.keyCode == 187 || event.keyCode == 190) {
      event.preventDefault();
    }
  }

  validateKey(event) {
    if (event.keyCode == 69 || event.keyCode == 189 || event.keyCode == 187) {
      event.preventDefault();
    }
  }

  onResourceChange(event) {
    if (event.value === 'formField') {
      this.showApiDropdown = true;
    } else {
      this.showApiDropdown = false;
    }
  }

  getApplicableControls() {
    if (this.selectedControl === 'textBox' || this.selectedControl === 'textArea' || this.selectedControl === 'number') {
      return true;
    }
    return false;
  }
  // Add tabular entry header definitions
  addHeaderDefinition() {
    this.tabularHeaderDefinitions.push({
      headerName: this.tabularHeaderName,
      fieldName: this.tabularFieldName,
      fieldType: this.tabularFieldType.value,
    });

    this.tabularHeaderName = undefined;
  }

  removeDefinition(index) {
    this.tabularHeaderDefinitions.splice(index, 1);
  }


  onImageSelected(e) {
    // Convert image to Base64 
    this.convertToBase64(e);
  }

  onImageButtonClicked(e) {
    this.imageFileInput.nativeElement.click();
  }

  // Image base64 convertions
  convertToBase64(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // let encodeBase64String = btoa(reader.result.toString());
        this.selectedImage = reader.result.toString();
        // this.formGroup.get(this.formElement.label).setValue(reader.result.toString().trim());
      }
      reader.readAsDataURL(file);
    }
  }

  onImageUploadTypeChanged(e) {
    this.selectedImage = undefined;
    this.formLogoUrl = undefined;

    this.imageUploadType = e.value;
  }

  tabularFieldTypeChange(value) {
    console.log(value);
    this.tabularFieldType = value;
  }
}
