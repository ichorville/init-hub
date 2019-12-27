import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {

  @Input() widget:any;

  currentWidget:any;

  constructor() { }

  ngOnInit() {
    this.currentWidget = this.widget.controlContent;
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["widget"]) this.currentWidget = this.widget.controlContent;;
  }

  validateKey(event) {
    if (event.keyCode == 69 || event.keyCode == 189 || event.keyCode == 187) {
      event.preventDefault();
    }
  }

}
