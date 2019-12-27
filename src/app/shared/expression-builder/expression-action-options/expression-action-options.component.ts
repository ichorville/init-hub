import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { CSIExpressionBuilderService } from '../expression-builder.service';

@Component({
  selector: 'app-expression-action-options',
  templateUrl: './expression-action-options.component.html',
  styleUrls: ['./expression-action-options.component.css']
})
export class ExpressionActionOptionsComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() expression: string;
  @Output() selectedAction = new EventEmitter<any>();
  currentlySelected: number = 0;
  eventActionType: string = 'Show';

  alertTypes: any[] = [
    { key: 'error', value: 'Error' },
    { key: 'warning', value: 'Warning' },
    { key: 'success', value: 'Success' }
  ];

  constructor(
    private _ebs: CSIExpressionBuilderService
  ) { }

  ngOnInit() {  
    if (this.type != 'Service Call' && this.type != 'In App') {
      this.eventActionType = this.type;
      this.currentlySelected = this.returnCurrentIndex(this.type)
    }
  }

  ngOnChanges(event) {
    this.type = event.type.currentValue;
    if (event.expression != undefined) {
      this.expression = event.expression.currentValue;
    }
  }

  onEventActionClick(type) {
    this.currentlySelected = type;
    this.expression['type'] = this._ebs.actionTypes[type].value;
  }

  returnCurrentIndex(type) {
    switch (type) {
      case 'Show': {
        return 0;
      }
      case 'Hide': {
        return 1;
      }
      case 'Alert': {
        return 2;
      }
      case 'Validation': {
        return 3;
      }
      case 'Show Form': {
        return 4;
      }
    }
  }
}
