import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as RESOURCE from '../../../../../shared/constants/resources';
import { FormGeneratorService } from 'src/app/operations/form-generator/form-generator.service';
import { FieldGeneratorService } from 'src/app/operations/field-generator/field-generator.service';
import { CsiAgGridOptions, CsiAgGridColumn } from '@csi/csi-ag-grid';
import { TreeviewItem } from 'ngx-treeview';

@Component({
  selector: 'app-option-resources',
  templateUrl: './option-resources.component.html',
  styleUrls: ['./option-resources.component.scss']
})
export class OptionResourcesComponent implements OnInit {

  @Input() payload:any;
  @Output() onDisplayChanged:EventEmitter<any> = new EventEmitter();
  @Output() onValueChanged:EventEmitter<any> = new EventEmitter();
  @Output() onResourceChanged:EventEmitter<any> = new EventEmitter();

  resourceTypes: any[] = [
    { value: 'clinics', viewValue: 'Clinics' },
    { value: 'procedures', viewValue: 'Procedures' },
    { value: 'agegroups', viewValue: 'AgeGroups' },
    { value: 'resources', viewValue: 'Resources' },
    { value: 'diagnosis', viewValue: 'Diagnosis' },
  ];

  selectedResource:any;

  defaultObjectProperties: any[] = [
    { value: 'code', viewValue: 'code' },
    { value: 'codeAlias', viewValue: 'codeAlias' },
    { value: 'description', viewValue: 'description' },
    { value: 'descriptionAlias', viewValue: 'descriptionAlias' },
    { value: 'name', viewValue: 'name' },
    { value: 'nameAlias', viewValue: 'nameAlias' }
  ];

  objectProperties:any[] = this.defaultObjectProperties;

  resourceApiEndpoint:string;

  resourcesDisplayedColumns:any;
  resourcesColDefs:any;
  resourceData:any;

  selectedDisplayProperty:string;
  selectedValueProperty:string;
  controlSelected:boolean;

  items: TreeviewItem[] = [];

  selectedCategory:any;
  selectValue:any;
  selectedCategoryValue:any;
  categoryValues:any;
  
  // grid variables
  public registerdEndpointsList: any = [];
  public setupTreeStructures;

  // AG Grid Configs
  public gridOptions: CsiAgGridOptions;
  public colDefs: any;
  public resourcesGridOptions:any;
  private gridApi:any;
  private gridColumnApi:any;
  private params:any;

  constructor(private _formgs:FormGeneratorService,
    private _fgs:FieldGeneratorService) { 
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
    }

  ngOnInit() {
    if(this.payload && Object.keys(this.payload).length>0){
      console.log(this.payload)
      this.selectedResource = this.payload.selectedResource;
      this.onResourceSelected({value:this.selectedResource})
      this.selectedValueProperty = this.payload.selectedValueProperty;
      this.selectedDisplayProperty = this.payload.selectedDisplayProperty;
    }

    this._fgs.getAll().subscribe(results => {
      this.setupTreeStructures = results;
      this.arrangeTree(this.setupTreeStructures);
    });
    this.colDefs = this.getColDefs();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.reset();
  }

  reset(){
    this.payload = undefined;
    this.selectedResource = undefined;
    this.selectedDisplayProperty = undefined;
    this.selectedValueProperty = undefined;
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

  /**
   * Resources on change event to fetch data from respective APIs
   * @param event
   */
  onResourceSelected(event) {
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

    this.onResourceChanged.emit({
      "resourceType":this.selectedResource,
      "apiEndpoint":this.resourceApiEndpoint
    });
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

  onDisplayPropertyChange(event) {
    this.selectedDisplayProperty = event.value;
    this.controlSelected = true;
    this.onDisplayChanged.emit(event);
  }

  onValuePropertyChange(event) {
    this.selectedValueProperty = event.value;
    this.controlSelected = true;
    this.onValueChanged.emit(event);
  }

  gridReadyEvent(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.params = params.data;
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
    this.onResourceChanged.emit(value);
    this.selectedCategoryValue = null;
    this.onClear();
    this._fgs.getByCategory(value.id).subscribe(response => {
      // populate category dropdown
      this.categoryValues = response;
      this.resetGrid(this.categoryValues);
    }, null);

    this.onResourceChanged.emit({
      "resourceType": "resources",
      "apiEndpoint": `csi-pms-rms-masterdata/amd-masterdata/common/categoryValue/getByCategory/${this.selectedCategory.id}`
    })
  }

  resetGrid(values) {
    this.gridApi.setRowData(values);
  }

  // while clearing the form
  onClear() {
    this.selectedCategoryValue = null;
    this.gridApi.deselectAll();
  }
}
