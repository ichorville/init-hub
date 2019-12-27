import {Injectable, EventEmitter} from '@angular/core';
import {Observable, Subject, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {IGridsterOptions, IGridsterDraggableOptions} from 'angular2gridster';

import {API_GATEWAY} from '../../../environments/environment';
import 'rxjs/add/operator/map';
import {Router, NavigationStart} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {
	formName: string;
	formModules:any[];
	formCategory:string;
	formSaveOption:string;

	formCreatedByModal:boolean;
	
	allFieldsMandatory: boolean;
	hideFormTitle: boolean;
	gridAvailability: boolean;
	formLoadedForEdit: boolean;
	ruleJSONData: any = {};
	widgets: Array<any> = [];
	ruleComponents: any[] = [];

	private fieldEditor:Subject<any>;
	private gridEditor:Subject<any>;
	private formEditor:Subject<any>;
	private formInlineEditor:Subject<any>;
	private widgetEditor:Subject<any>;
	private gridViewer:Subject<any>;
	// private previewViewer;
	private saveForm:Subject<any>;
	private fieldMetaDataUpdater:Subject<any>;
	private metaDataRefresher:Subject<any>;
	private resetFormMetaData:Subject<any>;
	private useFieldUsedInForm:Subject<any>;
	private gridLoader:Subject<any>;
	private addMasterDatatable:Subject<any>;

	public hideFieldMetaData:EventEmitter<boolean>;
	public previewViewer:EventEmitter<boolean>;
	public reloadMasterGrid:EventEmitter<boolean>;
	public onDropdownResourceSelected:EventEmitter<boolean>;
	public loadFieldAttributes:EventEmitter<any>;

	public onFieldRemoved:EventEmitter<any>;
	public onGridReset:EventEmitter<any>;
	private addnewUIComponent = new Subject<any>();

	gridsterOptions: IGridsterOptions = {
		// core configuration is default one - for smallest view. It has hidden minWidth: 0.
		lanes: 12, // amount of lanes (cells) in the grid
		direction: 'vertical', // floating top - vertical, left - horizontal
		floating: true,
		dragAndDrop: true, // enable/disable drag and drop for all items in grid
		resizable: true, // enable/disable resizing by drag and drop for all items in grid
		resizeHandles: {
			s: true,
			e: true,
			se: true
		},
		widthHeightRatio: 1, // proportion between item width and height
		lines: {
			visible: true,
			color: '#afafaf',
			width: 1,
			always: false
		},
		shrink: true,
		useCSSTransforms: true,
		responsiveView: true, // turn on adopting items sizes on window resize and enable responsiveOptions
		responsiveDebounce: 500, // window resize debounce time
		responsiveSizes: true,
		// List of different gridster configurations for different breakpoints.
		// Each breakpoint is defined by name stored in "breakpoint" property. There is fixed set of breakpoints
		// available to use with default minWidth assign to each.
		// - sm: 576 - Small devices
		// - md: 768 - Medium devices
		// - lg: 992 - Large devices
		// - xl: 1200 - Extra large
		// MinWidth for each breakpoint can be overwritten like it's visible below.
		// ResponsiveOptions can overwrite default configuration with any option available.
		responsiveOptions: [
			{
				breakpoint: 'sm',
				// minWidth: 480,
				lanes: 3
			},
			{
				breakpoint: 'md',
				minWidth: 768,
				lanes: 12
			},
			{
				breakpoint: 'lg',
				minWidth: 1250,
				lanes: 12
			}
		]
	};

	gridsterDraggableOptions: IGridsterDraggableOptions = {
		handlerClass: 'panel-heading'
	};

	// Form Applicable Modules
	applicableModules:any[] = [
		{ value:"EHR", name:"EHR" },
		{ value:"LAB", name:"LAB" },
		{ value:"BB", name:"Blood Bank" },
		{ value:"ADT", name:"ADT" },
		{ value:"ADMIN", name:"ADMIN" }
	];

	// Form Categories
	formCategories:any[] = [
		{ value:"GENERAL", name:"GENERAL" },
		{ value:"EHR", name:"EHR" },
	];

	constructor(private http: HttpClient, private router:Router) {
		this.initSubjectsEvents();

		this.router.events.subscribe(res=>{
			if(res instanceof NavigationStart){
				this.initSubjectsEvents()
			}
		})
	}

	initSubjectsEvents(){
		this.fieldEditor = new Subject<any>();
		this.gridEditor = new Subject<any>();
		this.formEditor = new Subject<any>();
		this.formInlineEditor = new Subject<any>();
		this.widgetEditor = new Subject<any>();
		this.gridViewer = new Subject<any>();
		// this.previewViewer = new Subject<any>();
		this.saveForm = new Subject<any>();
		this.fieldMetaDataUpdater = new Subject<any>();
		this.metaDataRefresher = new Subject<any>();
		this.resetFormMetaData = new Subject<any>();
		this.useFieldUsedInForm = new Subject<any>();
		this.gridLoader = new Subject<any>();
		this.addMasterDatatable = new Subject<any>();

		this.hideFieldMetaData = new EventEmitter();
		this.previewViewer = new EventEmitter();
		this.reloadMasterGrid = new EventEmitter();
		this.onDropdownResourceSelected = new EventEmitter();
		this.loadFieldAttributes = new EventEmitter();

		this.onFieldRemoved = new EventEmitter();
		this.onGridReset = new EventEmitter();
	}

  /**
   * Get master Fields List
   * @param configuration
   */
  getFieldList(configuration): Observable<any> {
    let url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-field/find`;
    return this.http.post<any>(url, configuration, httpOptions).pipe(tap((fieldList: any) => {
      }),
      catchError(this.handleError<any>('fieldList')));
  }

  /**
   * Get Master Forms List
   * @param configuration
   */
  getFormList(configuration: any) {
    let url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-form/find`;
    return this.http.post<any>(url, configuration, httpOptions).pipe(tap((formList: any) => {
      }),
      catchError(this.handleError<any>('forList')));
  }

  /**
   * Get Form by Id
   * @param id
   */
  getFormById(id: any) {
    let url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-form/find/${id}`;
    return this.http.get<any>(url).pipe(tap((form: any) => {
      }),
      catchError(this.handleError<any>('form')));
  }

  /**
   * Get Form by Id
   * @param id
   */
  getFieldUsage(formReq: any) {
    const url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-form/search-field-usage`;
    return this.http.post<any>(url, formReq, httpOptions).pipe(tap((form: any) => {
      }),
      catchError(this.handleError<any>('form')));
  }

  /**
   * Get Form by Id
   * @param id
   */
  getFieldForms(formReq: any) {
    const url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-form/search-field`;
    return this.http.post<any>(url, formReq, httpOptions).pipe(tap((form: any) => {
      }),
      catchError(this.handleError<any>('form')));
  }

  /**
   * Save new Form to Master Form List
   * @param form
   */
  postForm(form: any): Observable<any> {
    let url = `${API_GATEWAY.SERVER}/csi-personalization-service/personalisation/custom-form/publish`;
    return this.http.post<any>(url, form, httpOptions).pipe(tap((newForm: any) => {
      }),
      catchError(this.handleError<any>('newForm')));
  }

  /**
   * Save new Rule JSON in-ragard to New Form Controls
   * @param form
   */
  postRule(form: any): Observable<any> {
    let url = `${API_GATEWAY.SERVER}/csi-pms-rms-rules/amd-rules/form-rules/create`;
    return this.http.post<any>(url, form, httpOptions).pipe(tap((newRuleSet: any) => {
      }),
      catchError(this.handleError<any>('newRuleSet')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  getFieldOptions(endpoint) {
    let url = `${API_GATEWAY.SERVER}/${endpoint}`;
    return this.http.get(url);
  }

  /**
   * Retrieve rule JSON for currently selected form data
   * @param moduleKey
   * @param screenKey
   */
  getRulesByModuleScreen(moduleKey: string, screenKey: string): Observable<any> {
    return new Observable((observer) => {
      this.http.get<any>(`${API_GATEWAY.SERVER}/csi-pms-rms-rules/amd-rules/form-rules/getByModuleKeyAndScreenKey/${moduleKey}/${screenKey}`).subscribe((data) => {
          observer.next(data);
          observer.complete();
        },
        (error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  /**
   * Update new set of rules added to rule JSON
   * @param ruleModel
   */
  updateRules(ruleModel: any): Observable<any> {
    return new Observable((observer) => {
      this.http.put(`${API_GATEWAY.SERVER}/csi-pms-rms-rules/amd-rules/form-rules/edit`, ruleModel).subscribe((res) => {
          observer.next(true);
          observer.complete();
        },
        (error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  updateRuleJson(param) {
    this.getRulesByModuleScreen('CUSTOM_FORMS', param.path).subscribe(response => {
      this.ruleJSONData.id = response.id;
      this.ruleJSONData.isActive = response.isActive;
      this.ruleJSONData.moduleKey = response.moduleKey;
      this.ruleJSONData.moduleName = response.moduleName;
      this.ruleJSONData.rowVersion = response.rowVersion;
      this.ruleJSONData.screenKey = response.screenKey;
      this.ruleJSONData.screenName = response.screenName;
      this.ruleComponents = [];
      // add expression builder entries
      response.components.forEach(element => {
        this.ruleComponents.push({
          componentId: element.componentId,
          componentKey: element.componentKey,
          componentName: element.componentName,
          componentType: element.componentType,
          rules: element.rules
        });
      });
    });
  }

  getWidgets(): Observable<Array<any>[]> {
    return new Observable(obs => {
      obs.next(this.widgets);
    })
  }

  // fields getter setter
  addFieldSetter(res: any) {
    return this.fieldEditor.next(res)
  }

  addFieldGetter(): Observable<any> {
    return this.fieldEditor.asObservable()
  }

  // grids getter setter
  addGridSetter(res: any) {
    this.gridEditor.next(res);
    return this.gridEditor;
  }

  addGridGetter(): Observable<any> {
    return this.gridEditor.asObservable()
  }

  // forms getter setter
  addFormSetter(res: any) {
    return this.formEditor.next(res)
  }

  addFormGetter(): Observable<any> {
    return this.formEditor.asObservable()
  }

  // form inline editor getter setter
  addFormInlineSetter(res: any) {
    return this.formInlineEditor.next(res)
  }

  addFormInlineGetter(): Observable<any> {
    return this.formInlineEditor.asObservable()
  }

  // widget editor getter and setter
  addWidgetSetter(res: any) {
    return this.widgetEditor.next(res)
  }

  addWidgetGetter(): Observable<any> {
    return this.widgetEditor.asObservable()
  }

  // view/ hide grid getter and setter
  gridViewSetter(response: any) {
    this.gridViewer.next(response)
  }

  gridViewGetter(): Observable<any> {
    return this.gridViewer.asObservable()
  }

  // form preview getter and setter
  showPreviewSetter(response: any) {
    this.previewViewer.next(response)
  }

  showPreviewGetter(): Observable<any> {
    return this.previewViewer.asObservable()
  }

  // form save getter and setter
  saveFormSetter(response: any) {
    this.saveForm.next(response)
  }

  saveFormGetter(): Observable<any> {
    return this.saveForm.asObservable()
  }

  // field meta data getter and setter
  fieldMetaDateUpdateSetter(response: any) {
    this.fieldMetaDataUpdater.next(response)
  }

  fieldMetaDataUpdateGetter(): Observable<any> {
    return this.fieldMetaDataUpdater.asObservable()
  }

  // reset form meta-data getter and setter
  resetMetaDataUpdateSetter(response: any) {
    this.resetFormMetaData.next(response)
  }

  resetMetaDataUpdateGetter(): Observable<any> {
    return this.resetFormMetaData.asObservable()
  }

  // refresh form meta-data getter and setter
  refreshMetaDataUpdateSetter(response: any) {
    this.metaDataRefresher.next(response)
  }

  refreshMetaDataUpdateGetter(): Observable<any> {
    return this.metaDataRefresher.asObservable()
  }

  // field meta data getter and setter
  useFieldUsedInFormSetter(response: any) {
    this.useFieldUsedInForm.next(response)
  }

  useFieldUsedInFormGetter(): Observable<any> {
    return this.useFieldUsedInForm.asObservable()
  }

  // reload gridster config getter and setter
  reloadGridsterConfigSetter(response: any) {
    this.gridLoader.next(response)
  }

  reloadGridsterConfigGetter(): Observable<any> {
    return this.gridLoader.asObservable()
  }
	// add datatable getter and setter
	addMasterDatatableSetter(response: any) { this.addMasterDatatable.next(response) }
	addMasterDatatableGetter(): Observable<any> { return this.addMasterDatatable.asObservable() }

	// add new UI component getter and setter
	addUIComponentSetter(response: any) { this.addnewUIComponent.next(response) }
	addUIComponentGetter(): Observable<any> { return this.addnewUIComponent.asObservable() }
}
