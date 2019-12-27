import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueryBuilderClassNames } from 'angular2-query-builder';
import { TabsetComponent } from 'ngx-bootstrap';

import { CSIExpressionBuilderService } from './expression-builder.service';
import {LogUserService} from '@csi/csi-services-gateway';
import {FormGeneratorService} from "../../operations/form-generator/form-generator.service";

@Component({
  selector: 'csi-expression-builder',
  templateUrl: './expression-builder.component.html',
  styleUrls: ['./expression-builder.component.scss']
})
export class ExpressionBuilderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() components: any[];
  @Output() componentRules = new EventEmitter<any>();

  saveSubscription: any;
  exitSubscription: any;

  public queryCtrl: FormControl;
  markAsSelected: boolean = true;
  @ViewChild('staticExpressionActionTabs') staticExpressionActionTabs: TabsetComponent;
  currentFieldIndex: number = 0;
  currentEventIndex: number = 0;
  selectedControl;
  fieldExpressionOptions: any[] = [];
  expressionActionTypes: any[] = [
    { key: 'inapp', value: 'In App' },
    { key: 'service', value: 'Service Call' }
  ];

  queryBuilderLoaded: boolean = false;
  ruleFieldSelected: boolean = false;
  ruleActionsProvoked: boolean = false;
  fieldSetLoaded: boolean = false;
  uncheckableRadioModel: string;
  currentExpressionAction: string = 'Success';
  actionType: string = 'inapp';

  // query builder attr
  classNames: QueryBuilderClassNames = {
		removeIcon: 'fa fa-minus',
		addIcon: 'fa fa-plus',
		button: 'btn btn-sm',
		buttonGroup: 'btn-group',
		rightAlign: 'order-12 ml-auto',
		switchRow: 'd-flex px-2',
		switchGroup: 'd-flex align-items-center',
		switchRadio: 'custom-control-input',
		switchLabel: 'custom-control-label',
		switchControl: 'custom-control custom-radio custom-control-inline',
		row: 'row p-2 m-1',
		rule: 'border',
		ruleSet: 'border',
		invalidRuleSet: 'alert alert-danger',
		operatorControl: 'form-control form-control-sm',
		operatorControlSize: 'col-auto px-0',
		fieldControl: 'form-control form-control-sm',
		fieldControlSize: 'col-auto',
		inputControl: 'form-control form-control-sm',
		inputControlSize: 'col-auto'
	};

  constructor(
    private _ebs: CSIExpressionBuilderService, private logUserService: LogUserService,private fgs : FormGeneratorService
  ) {
    this.saveSubscription = this._ebs.expressioBuilderExitGetter().subscribe(() => {
      // create linear expression string for current set of rules
      this._ebs.fieldExpressions.forEach(element => {
        element.expressions.forEach(expression => {
          expression.exp = this._ebs.updateExpression(element,expression);
        });
      });
      // validation check before submititng rules back to relevant fields
      this._ebs.components.forEach(element => element.rules = []);
      this._ebs.fieldExpressions.forEach((element, index) => {
        element.expressions.forEach(expression => {
          this._ebs.components[index].rules.push(expression);
        });
      });
      this.ruleActionsProvoked = false;
      this.ruleFieldSelected = false;
      this.componentRules.emit(this._ebs.components.map(element => ({ ...element })));
      this._ebs.fieldExpressions = [];
    });

    // on simple modal close then revert changes back to default
    this.exitSubscription = this._ebs.expressionClearGetter().subscribe(() => {
      this.ruleActionsProvoked = false;
      this.ruleFieldSelected = false;
      this._ebs.fieldExpressions = [];
      this._ebs.components.forEach(element => element.rules = []);
    });
  }

  ngOnInit() {
    const configuration = {
      hospitalGroupId: Number(this.logUserService.getUserHospitalGroupId()),
      hospitalId: this.logUserService.getUserHospitalId() + '',
    };
    this._ebs.getFormList(configuration).subscribe(res => {
      this._ebs.masterFormData = res;
    });
    this._ebs.components = this.components.map(element => ({ ...element }));
    this.createExpressionOptionsList();
    this.fieldSetLoaded = true;
  }

  ngOnChanges(event) {
    if (event != undefined) {
      this._ebs.components = event.components.currentValue.map(element => ({ ...element }));
      this.createExpressionOptionsList();
      this.fieldSetLoaded = true;
    }
  }


  getOptions(component) {
    let optionsForDD = [];
    let contolForOptions = this.fgs.widgets.find(controls => controls.title === component.componentName);
    if (component.componentType === 'dropdown' || component.componentType === 'radio' || component.componentType === 'checkbox') {

      if (contolForOptions && contolForOptions.controlContent.options) {
        contolForOptions.controlContent.options.forEach(element => {
          if(component.componentType === 'checkbox'){
            optionsForDD.push(
              {name: element.label, value: "\'" + element.label + "\'"}
            );
          }else {
            optionsForDD.push(
              {name: element.label, value: "\'" + element.value + "\'"}
            );
          }

        });
      }

    }

    return optionsForDD;
  }
  /**
   * Similar to the query builder config, the configuration is implemented manually with specific
   * validations at field level, stating different operators for fields/ forms etc.
   * @param config
   */
  createConfig(config) {
    this._ebs.components.forEach(element => {
      config.fields[element.componentKey] = {
        name: element.componentName,
        type: this.returnType(element.componentType),
        operators: this.returnOperators(element.componentType),
        options: this.getOptions(element)
      }
    });
    this.queryBuilderLoaded = true;
  }



  returnType(type) {

      switch (type) {
        case 'textBox':case 'textArea': case 'email':case 'password':case 'time':case 'email':case 'color':{
            return 'string';
          }
        case 'number' : {
          return 'number';
        }
        case 'date': {
            return 'date';
          }
        case 'dropdown':case 'radio': case 'checkbox':{
            return 'category';
          }
      }
  }

  /**
   * Oprators to be displayed on each Field selection
   * @param type
   */
  returnOperators(type) {
    switch (type) {
      case 'color':case 'email':
      case 'image':case 'number':case 'password':case 'time':
    {
      return ['=', '!=', '>', '<'];
    }
      case 'textBox':case 'textArea': {
      return ['=', '!='];
    }
      case 'date': {
        return ['=','>', '<'];
      }
      case 'checkbox': {
        return ['=','in'];
      }
      case 'dropdown':case 'radio': {
      return ['='];
    }
    }
  }

  /**
   * A different set of attributes that holds the expression data which contains the expressions,
   * the query builder configuration, event selection options etc. against each displayed field
   * type on the left item menu
   */
  createExpressionOptionsList() {
    if (this._ebs.fieldExpressions.length == 0) {
      this._ebs.components.forEach((element, index) => {
        this._ebs.fieldExpressions.push({
          id: index,
          name: element.componentName,
          fieldExpressionOptions: [],
          expressions: element.rules.map(rule => ({ ...rule })),
          queryBuilderConfig: {
            fields: {}
          },
          control: FormControl
        });
        element.rules.length > 0 ? '' : element.rules = [];
      });
    }
  }

  /**
   * Once a major Event selection is made, Custom set of data is embedded againts each selected
   * field type with the major types of Event being CLICK, CHANGE etc.
   * @param field
   */
  generateExpressionMasterOptions(field) {
    this.currentEventIndex = 0;
    this.currentFieldIndex = field._id;
    this.selectedControl = this.fgs.widgets.find(controls => controls.title === field.componentName);
    this.createConfig(this._ebs.fieldExpressions[this.currentFieldIndex].queryBuilderConfig);
    switch (field.componentType) {
      case 'textBox':case 'textArea':case 'color':case 'date':case 'email':
      case 'image':case 'number':case 'password':case 'time':case 'checkbox':
      case 'dropdown':case 'radio': {
        this.uncheckableRadioModel = 'CLICK';
        this._ebs.fieldExpressions[this.currentFieldIndex].fieldExpressionOptions = ['CLICK', 'CHANGE'];
        // manually trigger a default option if the event list is empty
        if (this._ebs.fieldExpressions[this.currentFieldIndex].expressions.length == 0) {
          this.onExpressionOptionClick(this._ebs.fieldExpressions[this.currentFieldIndex], 0);
        }
      }
    }
    this.ruleFieldSelected = true;
    this.ruleActionsProvoked = false;
  }

  /**
   * Add the selected type of Event for the selected Field type with base template data
   * compatible with the expression builder
   * @param item
   */
  onExpressionOptionClick(item, index) {
    item.expressions.push({
      event: this._ebs.fieldExpressions[this.currentFieldIndex].fieldExpressionOptions[index],
      query: {
        condition: 'and',
        rules: []
      },
      successActions: [],
      failActions: []
    });
    this._ebs.components[this.currentFieldIndex].rules.push(0);
    this.queryBuilderLoaded = true;
  }

  /**
   * Enable all action events for current Field Event
   * @param event
   */
  onEventClick(item, id) {
    this.ruleActionsProvoked = true;
    this.currentEventIndex = id;
    if (item.expressions[this.currentEventIndex].successActions.length == 0) {
      item.expressions[this.currentEventIndex].successActions.unshift({
        type: 'In App',
        content: '',
        params: '',
        targetControl: '',
        targetFormId: ''
      });
    }
  }

  setToSuccess(event) {
    this.currentExpressionAction = 'Success';
  }

  setToFail(event) {
    this.currentExpressionAction = 'Fail';
  }

  /**
   * Add basic action templates being InApp/ ServerCall for each selected field event
   * @param item
   */
  onExpressionActionOptionClick(item, type) {
    if (this.currentExpressionAction === 'Success') {
      if (type === 'inapp') {
        item.expressions[this.currentEventIndex].successActions.unshift({
          type: 'In App',
          content: '',
          params: '',
          targetControl: '',
          targetFormId: ''
        });
      } else {
        item.expressions[this.currentEventIndex].successActions.push({
          type: 'Service Call',
          value: []
        });
      }
    } else {
      if (type === 'inapp') {
        item.expressions[this.currentEventIndex].failActions.unshift({
          type: 'In App',
          content: '',
          params: '',
          targetControl: '',
          targetFormId: ''
        });
      } else {
        item.expressions[this.currentEventIndex].failActions.push({
          type: 'Service Call',
          value: []
        });
      }
    }
  }

  /**
   * Remove an expression from the master field list
   * @param index
   */
  removeExpression(index) {
    this._ebs.fieldExpressions[this.currentFieldIndex].expressions = this._ebs.fieldExpressions[this.currentFieldIndex].expressions.filter((element, i) => i != index);
    this.ruleActionsProvoked = false;
    this._ebs.components[this.currentFieldIndex].rules.pop();
  }

  /**
   * Remove Action event aginst selected Field Event type
   * @param type
   * @param index
   */
  removeAction(type, index) {
    if (type == 'success') {
      this._ebs.fieldExpressions[this.currentFieldIndex].expressions[this.currentEventIndex].successActions =
        this._ebs.fieldExpressions[this.currentFieldIndex].expressions[this.currentEventIndex].successActions.filter((element, i) => i != index);
    } else {
      this._ebs.fieldExpressions[this.currentFieldIndex].expressions[this.currentEventIndex].failActions =
        this._ebs.fieldExpressions[this.currentFieldIndex].expressions[this.currentEventIndex].failActions.filter((element, i) => i != index);
    }
  }

  ngOnDestroy() {
   this.saveSubscription.unsubscribe();
   this.exitSubscription.unsubscribe();
  }
}
