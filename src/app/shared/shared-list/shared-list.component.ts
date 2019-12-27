import {
  Component, OnInit, OnChanges, Input,
  Output, EventEmitter, TemplateRef
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { SharedListService } from './shared.list.service';

@Component({
  selector: 'app-shared-list',
  templateUrl: './shared-list.component.html',
  styleUrls: ['./shared-list.component.css']
})
export class SharedListComponent implements OnInit, OnChanges {
  @Input() entityName: string;
  @Input() fileList: any[];
  @Input() readOnly?: boolean;
  @Input() markAsSelected?: boolean;

  @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeFromList: EventEmitter<any> = new EventEmitter<any>();

  placeholder: string;
  selectedPage: number;
  pages: any[];
  filteredRows: any[] = [];
  searchTerms: any[] = [];
  totalPaginatedRows: any[];
  isInit: boolean = false;
  noResults: boolean = false;
  toBeRemoved: any = {};

  constructor(
    public dialog: MatDialog,
    private _sls: SharedListService
  ) {
    // this.filteredRows = this.updateFileList(this.entityName, this.fileList.map(element => ({ ...element })));;
    this._sls.addNotifyGetter().subscribe(res => {
      this.updatePaginatedCountAndDataset(this.updateFileList(this.entityName, this.fileList.map(element => ({ ...element }))));
    });
  }

  ngOnInit() {
    console.log(this.entityName);
    this.placeholder = `Search ${this.entityName}`;
    this.searchTerms = this.updateFileList(this.entityName, this.fileList.map(element => ({ ...element })));
    this.updatePaginatedCountAndDataset(this.updateFileList(this.entityName, this.fileList.map(element => ({ ...element }))));
  }

  ngOnChanges(event) {
    this.searchTerms = this.updateFileList(this.entityName, event.fileList.currentValue.map(element => ({ ...element })));
    this.fileList = this.updateFileList(this.entityName, this.fileList.map(element => ({ ...element })));
    this.updatePaginatedCountAndDataset(this.updateFileList(this.entityName, event.fileList.currentValue.map(element => ({ ...element }))));
  }

  returnMetaText(element) {
    let metaString;
    element == 'textBox' ? metaString = 'Text Field' :
      element == 'textArea' ? metaString = 'Text Area' :
        element == 'number' ? metaString = 'Number Field' :
          element == 'dropdown' ? metaString = 'Drop Down' :
            element == 'radio' ? metaString = 'Radio Button' :
              element == 'checkbox' ? metaString = 'Checkbox' :
                element == 'customText' ? metaString = 'Custom Text' :
                  element == 'email' ? metaString = 'Email' :
                    element == 'range' ? metaString = 'Range' :
                      element == 'time' ? metaString = 'Time' :
                        element == 'password' ? metaString = 'Password' :
                          element == 'color' ? metaString = 'Color' :
                            element == 'image' ? metaString = 'Image' :
                              element == 'imageUpload' ? metaString = 'Image Upload' :
                                element == 'imageAnnotator' ? metaString = 'Image Annotations' :
                                  element == 'formLogo' ? metaString = 'Form Logo' :
                                    element == 'url' ? metaString = 'URL Field' :
                                      element == 'textEditor' ? metaString = 'Text Editor' :
                                        element == 'tabularEntry' ? metaString = 'Tabular Entry' :
                                          metaString = 'Date';
    return metaString;
  }

  searchResult(event) {
    if (event == 'NDF') {
      this.noResults = true;
    } else if (event.length == 0) {
      this.noResults = false;
      this.updatePaginatedCountAndDataset(this.fileList);
    } else {
      this.updatePaginatedCountAndDataset(event);
      this.noResults = false;
    }
  }

  emitItem(element, id) {
    element._id = id;
    this.selectedItem.emit(element);
    // add selected attr for selection purposes if available
    if (this.markAsSelected == true) {
      element.selected = true;
      this.filteredRows.forEach((element, index) => index != id ? element.selected = false : '');
    }
  }

  paginate(event: any) {
    if (event) {
      if (event > 0) {
        if (this.filteredRows) {
          // extract the relevant data set from the paginated data array
          this.filteredRows = this.totalPaginatedRows[event - 1].items;
        }
      }
    }
  }

  /**
   * To update pagination parameters when list data is updated
   * @param dataList
   */
  updatePaginatedCountAndDataset(dataList) {
    // calculate the no of pagination pages
    this._sls.getPageCount(dataList.length).then((pages) => {
      this.pages = pages;
    });
    // paginate the whole dataset according to the pagination pages
    this._sls.paginate(10, dataList).then((filteredRows) => {
      this.totalPaginatedRows = filteredRows;
      filteredRows.length == 0 ? this.filteredRows = [] : this.filteredRows = filteredRows[0].items;
      this.isInit = true;
    });
    // load the first data set hence first selected page
    this.selectedPage = 1;
  }

  /**
   * Open Mat dialog in-order to double check user preferrence to remove
   * a field from the existing field list
   * @param element
   */
  removeField(element, template: TemplateRef<any>) {
    this.toBeRemoved = element;
    this.dialog.open(template, {
      width: '250px'
    });
  }

  onNoClick(): void {
    this.toBeRemoved = {};
    this.dialog.closeAll();
  }

  setRecordToRemove() {
    this.removeFromList.emit(this.toBeRemoved);
    this.toBeRemoved = {};
    this.dialog.closeAll();
  }

  updateFileList(entityName, list) {
    switch (entityName) {
      case 'Field': {
        let definition: any;
        let fieldLists: any[] = [];

        list.forEach(field => {
          let fieldObject: any = {
            "required": false,
            "disabled": false,
            "type": "text",
            "theme": "bootstrap",
            "validators": [],
            "errors": [],
          };
          definition = JSON.parse(decodeURI(field.definition));
          // generic field data
          fieldObject.id = field.id;
          fieldObject.key = definition.labelName || definition.label;
          fieldObject.label = definition.labelName || definition.label;
          fieldObject.placeholder = definition.placeholder;
          fieldObject.controlType = definition.fieldType || definition.controlType;
          fieldObject.allowMultiSelect = definition.allowMultiSelect;
          fieldObject.characterLength = definition.characterLength;
          // console.log(definition);
          fieldObject.apiBinding = definition.apiBinding;
          fieldObject.errorMessage = definition.errorMessage || '';
          // for number
          if (fieldObject.controlType === "number" || fieldObject.controlType === "range") {
            fieldObject.minValue = definition.minValue;
            fieldObject.maxValue = definition.maxValue;
          }
          // for custom text
          if (fieldObject.controlType === "customText") {
            fieldObject.customTextBody = definition.customTextBody;
          }
          // for date
          if (fieldObject.controlType === 'date') {
            fieldObject.isTimeWithDate = definition.isTimeWithDate;
            fieldObject.isDateRange = definition.isDateRange;
          }

          // for image upload
          if (fieldObject.controlType === "imageUpload") {
            fieldObject.imageHeight = definition.imageHeight;
            fieldObject.imageWidth = definition.imageWidth;
          }

          // for image annotator
          if (fieldObject.controlType === "imageAnnotator") {
            fieldObject.imageHeight = definition.imageHeight;
            fieldObject.imageWidth = definition.imageWidth;
            fieldObject.image = definition.image;
          }

          // for formLogo
          if (fieldObject.controlType === "formLogo") {
            fieldObject.formLogoUrl = definition.formLogoUrl;
            fieldObject.imageHeight = definition.imageHeight;
            fieldObject.imageWidth = definition.imageWidth;
          }

          // for tabular entry
          if (fieldObject.controlType === "tabularEntry") {
            fieldObject.headerDefinitions = definition.headerDefinitions;
          }

          // for multi select options
          if (fieldObject.controlType === "dropdown"
            || fieldObject.controlType === "checkbox"
            || fieldObject.controlType === "radio") {

            if (fieldObject.controlType === "radio") {
              fieldObject.inlineField = definition.inlineField;
            }

            fieldObject.urlEndpoint = definition.urlEndpoint;
            if (definition.urlEndpoint == true) {
              fieldObject.apiSource = definition.apiSource;
              fieldObject.apiEndpoint = definition.apiEndpoint;
              fieldObject.displayProperty = definition.displayProperty;
              fieldObject.valueProperty = definition.valueProperty;
            } else {
              fieldObject.options = definition.optionList = definition.options;
            }
          }
          fieldLists.push(fieldObject);
        });
        return fieldLists;
      }
      case 'Form': {
        let fieldLists: any[] = [];
        list.forEach((element, index) => {
          element['count'] == undefined ? element['count'] = 0 : '';
          element['label'] == undefined ? element['label'] = 0 : '';
          try {
            element.label = element.fieldName;
            element['count'] = JSON.parse(decodeURI(element.definition)).data.length;
          } catch (e) { }
          fieldLists.push(element);
        });
        return fieldLists;
      }
      case 'Rule': {
        let fieldLists: any[] = [];
        list.forEach((element) => [element.label = element.componentName, fieldLists.push(element)]);
        return fieldLists;
      }
      case 'UI Elements': {
        
      }
      default: {
        return list;
      }
    }
  }
}
