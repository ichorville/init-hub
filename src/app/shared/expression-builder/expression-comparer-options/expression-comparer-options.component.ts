import { Component, OnInit, Input } from '@angular/core';

import { CSIExpressionBuilderService } from '../expression-builder.service';

@Component({
  selector: 'app-expression-comparer-options',
  templateUrl: './expression-comparer-options.component.html',
  styleUrls: ['./expression-comparer-options.component.css']
})
export class ExpressionComparerOptionsComponent implements OnInit {
  @Input() currentRule: any;
  inputType: any;
  inputValue: any;
  constructor(
    public _ebs: CSIExpressionBuilderService
  ) { }

  ngOnInit() {
    if (this.currentRule != undefined && this.currentRule.value != undefined) {
      this.inputType = this.returnInputType(this.currentRule.value.split('|')[0]);
      this.inputValue = this.currentRule.value.split('|')[1];
    }
  }

  onChange(event) {
    this.updateRuleValue();
  }

  onNumberChange(event) {
    this.updateRuleValue();
  }

  updateRuleValue() {
    this.currentRule.value = `${OTHER_TYPES[this.inputType]}|${this.inputValue}`;
  }

  onOtherFieldChange() {
    this.updateRuleValue();
  }

  returnInputType(type) {
    switch(type) {
      case 'number': {
        return 'ONE'
      }
      case 'string': {
        return 'TWO'
      }
      case 'field': {
        return 'THREE'
      }
      case 'FOUR': {
        return 'api'
      }
      case 'FIVE': {
        return 'masterdata'
      }
    }
  }
}
export enum OTHER_TYPES {
  ONE = 'number',
  TWO = 'string',
  THREE = 'field',
	FOUR = 'api',
	FIVE = 'masterdata'	
}